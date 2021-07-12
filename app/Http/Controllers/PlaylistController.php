<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use Auth;
use FFMpeg;
use App\Video;
use App\Tag;
use App\Telop;
use App\User;
use App\Playlist;
use App\Playlistlog;
use App\LikesPlaylist;
use App\Like;
use App\PlaylistComment;
use App\LikesComment;
use App\Report;
use Carbon\Carbon;
use FFMpeg\Filters\Video\VideoFilters;
use FFMpeg\Media\Gif;
use FFMpeg\Format\ProgressListener\AbstractProgressListener;
use ProtoneMedia\LaravelFFMpeg\FFMpeg\ProgressListenerDecorator;
use YouTube\YouTubeDownloader;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\File;

class PlaylistController extends Controller
{
    private $contentsPerPage = 5;
    private $daysPerPeriod = 3; // 3 days
    private $endOfPeriod = 10;  // 3 days * 10 = 1 months
    
    //【レコメンド】プレイリスト一覧の取得
    // public function indexPlaylistAndTagPaginationOfRecommend()
    // {
    //     //プレイリストにタグのデータを結合し、直近30日のLike数が多い順・新しい順に並び替え
    //     $this->contentsPerPage = 5;

    //     $playlistAndTagPaginationOfRecommend = Playlist::whereHas('tags', function ($query) {
    //         //privacySettingがpublicのtagを最低1つ持つPlaylistを取得
    //         $query->where('privacySetting', 'public');
    //     })->with(array('tags'=> function ($query) {
    //         //tagおよびtagへのlike数を取得
    //         $likes_tags = Like::groupBy('tag_id')->select('tag_id', DB::raw('count(*) as likes_tag_count'))->orderBy('likes_tag_count', 'DESC');
    //         $likes_tags_sql = $likes_tags->toSql();
    //         //tagに紐づくvideoデータを取得
    //         $query->with('video')->leftJoinSub('(' . $likes_tags_sql. ')', 'likes_tags', function ($join) {
    //             $join->on('tags.id', '=', 'likes_tags.tag_id');
    //         })->select('*')->where('privacySetting', 'public')->orderBy('likes_tags.likes_tag_count', 'desc')->get();
    //     }))
    //     //直近30日のプレイリストへのlike数を取得
    //     ->withCount(['likesPlaylist as likesPlaylist_count' => function ($query) {
    //         $query->where('likes_playlists.created_at', '>', Carbon::now()->subDays(30));
    //     }, 'playlistlogs as play_count'])
    //     //プレイリストのプライバシー設定がpublicに限定し、like数の降順で取得
    //     ->where('privacySetting', 'public')->whereNotNull('playlistName')->orderBy('likesPlaylist_count', 'desc')->orderBy('created_at', 'desc')
    //     ->paginate($this->contentsPerPage);

    //     return response()->json(
    //         [
    //         'playlistAndTagPaginationOfRecommend' => $playlistAndTagPaginationOfRecommend,
    //         ],
    //         200,
    //         [],
    //         JSON_UNESCAPED_UNICODE
    //     );
    // }

    //【新着】プレイリスト一覧の取得
    public function indexPlaylistAndTagPaginationOfNew(Request $request)
    {
        $period = $request->input('period');
        $from = Carbon::now()->subDays($period * $this->daysPerPeriod);
        $to = Carbon::now()->subDays(($period - 1) * $this->daysPerPeriod);

        //プレイリストにタグのデータを結合し、新しい順に並び替え
        $playlistAndTagPaginationOfNew = Playlist::whereHas('tags', function ($query) {
            $query->where('privacySetting', 'public');
        })->with(array('tags'=> function ($query) {
            $likes_tags = Like::groupBy('tag_id')->select('tag_id', DB::raw('count(*) as likes_tag_count'))->orderBy('likes_tag_count', 'DESC');
            $likes_tags_sql = $likes_tags->toSql();
            $query->with('video')->leftJoinSub('(' . $likes_tags_sql. ')', 'likes_tags', function ($join) {
                $join->on('tags.id', '=', 'likes_tags.tag_id');
            })->select('*')->where('privacySetting', 'public')->orderBy('likes_tags.likes_tag_count', 'desc')->get();
        }))->with('user')->withCount(['likesPlaylist as likesPlaylist_count' => function ($query) {
            $query->where('likes_playlists.created_at', '>', Carbon::now()->subDays(30));
        }, 'playlistlogs as play_count'
        ])->where('privacySetting', 'public')->whereBetween('created_at', [$from, $to])->whereNotNull('playlistName')->orderBy('likesPlaylist_count', 'desc')->orderBy('created_at', 'desc')->paginate($this->contentsPerPage);

        $endOfPeriodFlg = false;
        if ($period >= $this->endOfPeriod) {
            $endOfPeriodFlg = true;
        }

        return response()->json(
            [
            'playlistAndTagPaginationOfNew' => $playlistAndTagPaginationOfNew,
            'endOfPeriodFlg' => $endOfPeriodFlg
            ],
            200,
            [],
            JSON_UNESCAPED_UNICODE
        );
    }

    //【VTuber】プレイリスト一覧の取得
    public function indexPlaylistAndTagPaginationOfVTuber(Request $request)
    {
        $period = $request->input('period');
        $from = Carbon::now()->subDays($period * $this->daysPerPeriod);
        $to = Carbon::now()->subDays(($period - 1) * $this->daysPerPeriod);

        //VTuberカテゴリの、直近30日のLike数が多い順・新しい順に並び替え
        $playlistAndTagPaginationOfVTuber = Playlist::whereHas('tags', function ($query) {
            $query->where('privacySetting', 'public');
        })->with(array('tags'=> function ($query) {
            $likes_tags = Like::groupBy('tag_id')->select('tag_id', DB::raw('count(*) as likes_tag_count'))->orderBy('likes_tag_count', 'DESC');
            $likes_tags_sql = $likes_tags->toSql();
            $query->with('video')->leftJoinSub('(' . $likes_tags_sql. ')', 'likes_tags', function ($join) {
                $join->on('tags.id', '=', 'likes_tags.tag_id');
            })->select('*')->where('privacySetting', 'public')->orderBy('likes_tags.likes_tag_count', 'desc')->get();
        }))->where('playlistCategory', 'VTuber')->with('user')->withCount(['likesPlaylist as likesPlaylist_count' => function ($query) {
            $query->where('likes_playlists.created_at', '>', Carbon::now()->subDays(30));
        }, 'playlistlogs as play_count'
        ])->where('privacySetting', 'public')->whereBetween('created_at', [$from, $to])->whereNotNull('playlistName')->orderBy('likesPlaylist_count', 'desc')->orderBy('created_at', 'desc')->paginate($this->contentsPerPage);

        $endOfPeriodFlg = false;
        if ($period >= $this->endOfPeriod) {
            $endOfPeriodFlg = true;
        }

        return response()->json(
            [
            'playlistAndTagPaginationOfVTuber' => $playlistAndTagPaginationOfVTuber,
            'endOfPeriodFlg' => $endOfPeriodFlg
            ],
            200,
            [],
            JSON_UNESCAPED_UNICODE
        );
    }

    //【Game】プレイリスト一覧の取得
    public function indexPlaylistAndTagPaginationOfGame(Request $request)
    {
        $period = $request->input('period');
        $from = Carbon::now()->subDays($period * $this->daysPerPeriod);
        $to = Carbon::now()->subDays(($period - 1) * $this->daysPerPeriod);

        //Gameカテゴリの、直近30日のLike数が多い順・新しい順に並び替え
        $playlistAndTagPaginationOfGame = Playlist::whereHas('tags', function ($query) {
            $query->where('privacySetting', 'public');
        })->with(array('tags'=> function ($query) {
            $likes_tags = Like::groupBy('tag_id')->select('tag_id', DB::raw('count(*) as likes_tag_count'))->orderBy('likes_tag_count', 'DESC');
            $likes_tags_sql = $likes_tags->toSql();
            $query->with('video')->leftJoinSub('(' . $likes_tags_sql. ')', 'likes_tags', function ($join) {
                $join->on('tags.id', '=', 'likes_tags.tag_id');
            })->select('*')->where('privacySetting', 'public')->orderBy('likes_tags.likes_tag_count', 'desc')->get();
        }))->where('playlistCategory', 'Game')->with('user')->withCount(['likesPlaylist as likesPlaylist_count' => function ($query) {
            $query->where('likes_playlists.created_at', '>', Carbon::now()->subDays(30));
        }, 'playlistlogs as play_count'])->where('privacySetting', 'public')->whereBetween('created_at', [$from, $to])->whereNotNull('playlistName')->whereNotNull('playlistName')->orderBy('likesPlaylist_count', 'desc')->orderBy('created_at', 'desc')->paginate($this->contentsPerPage);

        $endOfPeriodFlg = false;
        if ($period >= $this->endOfPeriod) {
            $endOfPeriodFlg = true;
        }

        return response()->json(
            [
            'playlistAndTagPaginationOfGame' => $playlistAndTagPaginationOfGame,
            'endOfPeriodFlg' => $endOfPeriodFlg
            ],
            200,
            [],
            JSON_UNESCAPED_UNICODE
        );
    }

    //【Other】プレイリスト一覧の取得
    public function indexPlaylistAndTagPaginationOfOther(Request $request)
    {
        $period = $request->input('period');
        $from = Carbon::now()->subDays($period * $this->daysPerPeriod);
        $to = Carbon::now()->subDays(($period - 1) * $this->daysPerPeriod);

        //Vtuber, Gameカテゴリ以外の、直近30日のLike数が多い順・新しい順に並び替え
        $playlistAndTagPaginationOfOther = Playlist::whereHas('tags', function ($query) {
            $query->where('privacySetting', 'public');
        })->with(array('tags'=> function ($query) {
            $likes_tags = Like::groupBy('tag_id')->select('tag_id', DB::raw('count(*) as likes_tag_count'))->orderBy('likes_tag_count', 'DESC');
            $likes_tags_sql = $likes_tags->toSql();
            $query->with('video')->leftJoinSub('(' . $likes_tags_sql. ')', 'likes_tags', function ($join) {
                $join->on('tags.id', '=', 'likes_tags.tag_id');
            })->select('*')->where('privacySetting', 'public')->orderBy('likes_tags.likes_tag_count', 'desc')->get();
        }))->whereNotIn('playlistCategory', ['VTuber', 'Game'])->with('user')->withCount(['likesPlaylist as likesPlaylist_count' => function ($query) {
            $query->where('likes_playlists.created_at', '>', Carbon::now()->subDays(30));
        }, 'playlistlogs as play_count'])->where('privacySetting', 'public')->whereBetween('created_at', [$from, $to])->whereNotNull('playlistName')->orderBy('likesPlaylist_count', 'desc')->orderBy('created_at', 'desc')->paginate($this->contentsPerPage);

        $endOfPeriodFlg = false;
        if ($period >= $this->endOfPeriod) {
            $endOfPeriodFlg = true;
        }

        return response()->json(
            [
            'playlistAndTagPaginationOfOther' => $playlistAndTagPaginationOfOther,
            'endOfPeriodFlg' => $endOfPeriodFlg
            ],
            200,
            [],
            JSON_UNESCAPED_UNICODE
        );
    }

    //【人気】プレイリスト一覧の取得
    public function indexPlaylistAndTagPaginationOfPopular($playlistId)
    {
        //過去2ヶ月
        $from = Carbon::now()->subDays(60);
        $to = Carbon::now();

        //再生中のプレイリストのカテゴリを取得
        $playlistCategory = Playlist::find($playlistId)->playlistCategory;

        //再生中のプレイリストと同じカテゴリで過去2ヶ月のいいね件数の上位6件を取得
        $playlistAndTagPaginationOfPopular = Playlist::whereHas('tags', function ($query) {
            $query->where('privacySetting', 'public');
        })->with(array('tags'=> function ($query) {
            $likes_tags = Like::groupBy('tag_id')->select('tag_id', DB::raw('count(*) as likes_tag_count'))->orderBy('likes_tag_count', 'DESC');
            $likes_tags_sql = $likes_tags->toSql();
            $query->with('video')->leftJoinSub('(' . $likes_tags_sql. ')', 'likes_tags', function ($join) {
                $join->on('tags.id', '=', 'likes_tags.tag_id');
            })->select('*')->where('privacySetting', 'public')->orderBy('likes_tags.likes_tag_count', 'desc')->get();
        }))->where('playlistCategory', $playlistCategory)->whereNotIn('id', [$playlistId])->with('user')->withCount(['likesPlaylist as likesPlaylist_count', 'playlistlogs as play_count'])->where('privacySetting', 'public')->whereBetween('created_at', [$from, $to])->whereNotNull('playlistName')->orderBy('likesPlaylist_count', 'desc')->orderBy('created_at', 'desc')->take(6)->get();
        ;

        return response()->json(
            [
            'playlistAndTagPaginationOfPopular' => $playlistAndTagPaginationOfPopular,
            ],
            200,
            [],
            JSON_UNESCAPED_UNICODE
        );
    }

    // ID指定でのプレイリストおよびタグ・動画データの取得
    public function getPlaylistAndTagVideoDataById(Request $request)
    {
        //プレイリストとタグのデータを取得
        $playlistId = $request->input('id');
        $playlistAndTagData = Playlist::with('tags')->with('user')->where('id', $playlistId)->withCount(['playlistlogs as play_count'])->first();
        //タグから動画データを取得
        $tagVideoDatas = [];
        $total_duration = 0;
        foreach ($playlistAndTagData->tags as $tag) {
            $tagVideoData = Tag::join('videos', 'videos.id', '=', 'tags.video_id')->select('videos.id as video_id', 'youtubeId', 'videos.user_id', 'title', 'thumbnail', 'duration', 'channel_title', 'published_at', 'view_count', 'category', 'videos.created_at as video_created_at', 'videos.updated_at as video_updated_at', 'tags.id', 'tags', 'start', 'end', 'preview', 'previewgif', 'tags.created_at as tag_created_at', 'tags.updated_at as tag_updated_at', 'privacySetting')->with('telops')->where('tags.id', $tag->id)->first();
            $sceneOrder = DB::table('playlist_tag')->where('playlist_id', $playlistId)->where('tag_id', $tag->id)->select('scene_order')->first();
            $tagVideoData->scene_order = $sceneOrder->scene_order;

            //sum up durations of original youtube videos
            if (!in_array($tagVideoData->video_id, array_column($tagVideoDatas, 'video_id'))) {
                sscanf($tagVideoData->duration, "%d:%d:%d", $hours, $minutes, $seconds);
                $time_seconds = isset($hours) ? $hours * 3600 + $minutes * 60 + $seconds : $minutes * 60 + $seconds;
                $total_duration += $time_seconds;
            }

            // シーンが公開設定、限定公開、もしくは非公開設定だがユーザーが作成したものの場合のみ追加
            if ($tagVideoData->privacySetting == 'public' || $tagVideoData->privacySetting == 'limited') {
                $tagVideoDatas[] = $tagVideoData;
            } elseif ($tagVideoData->privacySetting == 'private' && Auth::user()) {
                if ($tagVideoData->user_id == Auth::user()->id) {
                    $tagVideoDatas[] = $tagVideoData;
                }
            }
        }

        // Sort by scene order
        usort($tagVideoDatas, function ($a, $b) {
            if ($a["scene_order"] == $b["scene_order"]) {
                return (0);
            }
            return (($a["scene_order"] < $b["scene_order"]) ? -1 : 1);
        });

        $comments = PlaylistComment::leftJoin('users', 'users.id', '=', 'playlist_comments.user_id')->select('playlist_comments.id as comment_id', 'playlist_comments.created_at as comment_publishedAt', 'playlist_comments.*', 'users.*')->where('playlist_comments.playlist_id', $playlistId)->where('playlist_comments.parent_id', '0')->orderBy('comment_publishedAt', 'DESC')->get();
        $commentDatas = [];

        foreach ($comments as $comment) {
            $commentData = $comment;
            $child_comments = PlaylistComment::leftJoin('users', 'users.id', '=', 'playlist_comments.user_id')->select('playlist_comments.id as comment_id', 'playlist_comments.created_at as comment_publishedAt', 'playlist_comments.*', 'users.*')->where('parent_id', $comment->comment_id)->orderBy('comment_publishedAt', 'ASC')->get();
            $childCommentDatas = [];
            foreach ($child_comments as $child) {
                $childCommentData = $child;
                $likes_child = LikesComment::where('comment_id', $child->comment_id)->where('cmt_option', '1')->select(DB::raw('COUNT(*) as likes_count'))->groupBy('comment_id')->first();
                if ($likes_child) {
                    $childCommentData->likes_count = $likes_child->likes_count;
                } else {
                    $childCommentData->likes_count = 0;
                }
                if (Auth::user()) {
                    $isLiked = LikesComment::where('comment_id', $child->comment_id)->where('cmt_option', '1')->where('user_id', Auth::user()->id)->first();
                    if ($isLiked) {
                        $childCommentData->isLiked = true;
                    } else {
                        $childCommentData->isLiked = false;
                    }
                } else {
                    $childCommentData->isLiked = false;
                }
                $childCommentDatas[] = $childCommentData;
            }
            $commentData->replies = $childCommentDatas;

            if (Auth::user()) {
                $isLiked = LikesComment::where('comment_id', $comment->comment_id)->where('cmt_option', '1')->where('user_id', Auth::user()->id)->first();
                if ($isLiked) {
                    $commentData->isLiked = true;
                } else {
                    $commentData->isLiked = false;
                }
            } else {
                $commentData->isLiked = false;
            }
            $likes_comment = LikesComment::where('comment_id', $comment->comment_id)->where('cmt_option', '1')->select(DB::raw('COUNT(*) as likes_count'))->groupBy('comment_id')->first();
            if ($likes_comment) {
                $commentData->likes_count = $likes_comment->likes_count;
            } else {
                $commentData->likes_count = 0;
            }
            $commentDatas[] = $commentData;
        }

        //プレイリスト・タグ・動画のデータを連結
        $playlistAndTagVideoData = [
            'playlist_id' => $playlistAndTagData->id,
            'playlistName' => $playlistAndTagData->playlistName,
            'privacySetting' => $playlistAndTagData->privacySetting,
            'playlistCategory' => $playlistAndTagData->playlistCategory,
            'playlist_total_duration' => $total_duration,
            'play_count' => $playlistAndTagData->play_count,
            'user' => $playlistAndTagData->user,
            'user_id' => $playlistAndTagData->user_id,
            'playlist_created_at' => (new Carbon($playlistAndTagData->created_at))->toDateTimeString(),
            'playlist_updated_at' => (new Carbon($playlistAndTagData->updated_at))->toDateTimeString(),
            'tagVideoData' => $tagVideoDatas,
            'comments' =>$commentDatas
        ];

        // プレイリストが非公開かつログインユーザーのものでない場合はデータを返却しない
        if ($playlistAndTagVideoData['privacySetting'] == 'private') {
            if (!Auth::user()) {
                return response()->json(
                    [
                    'playlistAndTagVideoData' => 'private'
                    ],
                    403,
                    [],
                    JSON_UNESCAPED_UNICODE
                );
            } elseif ($playlistAndTagVideoData['user_id'] != Auth::user()->id) {
                return response()->json(
                    [
                    'playlistAndTagVideoData' => 'private'
                    ],
                    403,
                    [],
                    JSON_UNESCAPED_UNICODE
                );
            }
        }

        return response()->json(
            [
            'playlistAndTagVideoData' => $playlistAndTagVideoData
            ],
            200,
            [],
            JSON_UNESCAPED_UNICODE
        );
    }

    //プレイリストのカテゴリーを取得
    public function getCurrentCategory(Request $request)
    {
        $playlist = Playlist::find($request->playlistId);

        return response()->json(
            [
            'currentCategory' => $playlist->playlistCategory
            ],
            200,
            [],
            JSON_UNESCAPED_UNICODE
        );
    }

    //作成したプレイリストを取得
    public function loadMyCreatedPlaylist()
    {
        if (Auth::user()) {
            $myCreatedPlaylist = Playlist::with(array('tags' => function ($query) {
                $query->with('video')->select('*')->get();
            }))->with('user')->withCount(['playlistlogs as play_count'])->where('user_id', Auth::user()->id)->orderBy('id', 'DESC')->get();

            return response()->json(
                [
                'myCreatedPlaylist' => $myCreatedPlaylist
                ],
                200,
                [],
                JSON_UNESCAPED_UNICODE
            );
        } else {
            return response()->json(
                [
                'error' => 'セッションが切れているので、もう一度ログインして下さい'
                ],
                401,
                [],
                JSON_UNESCAPED_UNICODE
            );
        }
    }

    //Likeしたプレイリストを取得
    public function loadMyLikedPlaylist()
    {
        if (Auth::user()) {
            $likesPlaylists = LikesPlaylist::where('user_id', Auth::user()->id)->get();
            $likesPlaylistIds = [];
            foreach ($likesPlaylists as $likesPlaylist) {
                $likesPlaylistIds[] = $likesPlaylist->playlist_id;
            }

            $myLikedPlaylist = Playlist::with(array('tags' => function ($query) {
                $query->with('video')->select('*')->get();
            }))->with('user')->withCount(['playlistlogs as play_count'])->whereIn('id', $likesPlaylistIds)->orderBy('updated_at', 'DESC')->get();

            return response()->json(
                [
                'myLikedPlaylist' => $myLikedPlaylist
                ],
                200,
                [],
                JSON_UNESCAPED_UNICODE
            );
        } else {
            return response()->json(
                [
                'error' => 'セッションが切れているので、もう一度ログインして下さい'
                ],
                401,
                [],
                JSON_UNESCAPED_UNICODE
            );
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        //playlistテーブルに保存
        if (Auth::user()) {
            $playlist = new Playlist;
            $playlist->playlistName = $request->playlistName;
            $playlist->privacySetting = $request->privacySetting;
            $playlist->user_id = Auth::user()->id;
            $playlist->playlistCategory = $request->playlistCategory;
            $playlist->save();

            if (!empty($request->currentTagId)) {
                //playlist_tagテーブルに保存
                $playlist->tags()->attach(
                    ['tag_id' => $request->currentTagId],
                    ['scene_order' => 1],
                    ['created_at' => Carbon::now()],
                    ['updated_at' => Carbon::now()]
                );
            }

            return response()->json(
                [
                'newPlaylist' => $playlist
                ],
                201,
                [],
                JSON_UNESCAPED_UNICODE
            );
        } else {
            return response()->json(
                [
                'error' => 'セッションが切れているので、もう一度ログインして下さい'
                ],
                401,
                [],
                JSON_UNESCAPED_UNICODE
            );
        }
    }
    //Get newly created playlist
    public function getNewPlaylist()
    {
        //playlistテーブルに保存
        if (Auth::user()) {
            try {
                //ユーザーの最新のplaylist IDを取得
                $latestPlaylist = Playlist::where('user_id', Auth::user()->id)->orderBy('id', 'DESC')->first();
                $newPlaylist = Playlist::where('id', $latestPlaylist->id)->where('playlistName', null)->first();

                return response()->json(
                    [
                    'newPlaylist' => $newPlaylist
                    ],
                    200,
                    [],
                    JSON_UNESCAPED_UNICODE
                );
            } catch (\Exception $e) {
                echo $e->getMessage();   // insert query

                return response()->json(
                    [
                    'newPlaylist' => null
                    ],
                    200,
                    [],
                    JSON_UNESCAPED_UNICODE
                );
            }
        } else {
            return response()->json(
                [
                'error' => 'セッションが切れているので、もう一度ログインして下さい'
                ],
                401,
                [],
                JSON_UNESCAPED_UNICODE
            );
        }
    }

    public function show()
    {
        //ログインユーザーを取得
        if (Auth::user()) {
            $user = Auth::user();

            //ユーザーが保存したプレイリストのリストを取得
            $playlists = $user->playlists;

            return view('playlist_show', compact('playlists'));
        } else {
            return response()->json(
                [
                'error' => 'セッションが切れているので、もう一度ログインして下さい'
                ],
                401,
                [],
                JSON_UNESCAPED_UNICODE
            );
        }
    }


    public function delete(Request $request)
    {
        //削除するプレイリストを取得
        $playlist = Playlist::find($request->playlistId);

        //DBから削除
        $playlist->delete();

        return response(null, 204);
    }

    //プレイリストの最初のタグと動画のIDを取得(複数プレイリストをリターン)
    public function getFirstTagVideoIds(Request $request)
    {
        $playlists = [[]];
        foreach ($request->playlists as $key => $playlist) {
            $playlists[$key]['playlist_id'] = $playlist['playlist_id'];
            $playlists[$key]['playlist_name'] = $playlist['playlist_name'];
            $playlists[$key]['first_tag_id'] = Playlist::find($playlist['playlist_id'])->tags()->first()->id;
            $playlists[$key]['first_video_id'] = Tag::find($playlists[$key]['first_tag_id'])->video_id;
        }

        //取得したデータをリターン
        return response()->json(
            [
                'playlists' => $playlists
            ],
            200,
            [],
            JSON_UNESCAPED_UNICODE
        );
    }

    //プレイリストの最初のタグと動画のIDを取得
    public function getFirstTagVideoId(Request $request)
    {
        $first_tag_id = Playlist::find($request->playlistId)->tags()->first()->id;
        $first_video_id = Tag::find($first_tag_id)->video_id;

        //取得したデータをリターン
        return response()->json(
            [
                'first_tag_id' => $first_tag_id,
                'first_video_id' => $first_video_id,
            ],
            200,
            [],
            JSON_UNESCAPED_UNICODE
        );
    }

    //Add Playlist Visit Count
    public function addVisitCount(Request $request, $playlist_id)
    {
        $playlist = Playlist::find($playlist_id);
        $playlistlog = new Playlistlog();

        if (Auth::check()) {
            $playlistlog->playlist_id = $playlist_id;
            $playlistlog->user_id = Auth::user()->id;
        } else {
            $playlistlog->playlist_id = $playlist_id;
            $playlistlog->user_id = null;
        }

        try {
            $playlist->playlistlogs()->save($playlistlog);
            return true;
        } catch (\Exception $e) {
            echo $e->getMessage();   // insert query

            return false;
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $playlist = Playlist::find($request->newPlaylistId);
        $playlist->playlistName = $request->playlistName;
        $playlist->privacySetting = $request->privacySetting;
        $playlist->playlistCategory = $request->playlistCategory;
        $playlist->description = $request->description;

        try {
            $playlist->save();

            // save description to comment table
            if ($request->description != "" && $request->description) {
                $this->savePlaylistComment($request->newPlaylistId, $request->description, Auth::user()->id, 0);
            }

            return response()->json(
                [
                    'result' => 'updated',
                    'playlist' => $playlist,
                ],
                201,
                [],
                JSON_UNESCAPED_UNICODE
            );
        } catch (\Exception $e) {
            echo $e->getMessage();   // insert query

            return response()->json(
                [
                    'result' => 'failed',
                ],
                500,
                [],
                JSON_UNESCAPED_UNICODE
            );
        }
    }

    public function updateTitle(Request $request)
    {
        $playlist = Playlist::find($request->playlist_id);
        $playlist->playlistName = $request->playlistName;
        try {
            $playlist->save();
            return response()->json(
                [
                    'result' => 'updated',
                    'playlist' => $playlist,
                ],
                201,
                [],
                JSON_UNESCAPED_UNICODE
            );
        } catch (\Exception $e) {
            echo $e->getMessage();   // insert query

            return response()->json(
                [
                    'result' => 'failed',
                ],
                500,
                [],
                JSON_UNESCAPED_UNICODE
            );
        }
    }

    public function updatePrivacy(Request $request)
    {
        $playlist = Playlist::find($request->playlist_id);
        $playlist->privacySetting = $request->privacySetting;
        try {
            $playlist->save();
            return response()->json(
                [
                    'result' => 'updated',
                    'playlist' => $playlist,
                ],
                201,
                [],
                JSON_UNESCAPED_UNICODE
            );
        } catch (\Exception $e) {
            echo $e->getMessage();   // insert query

            return response()->json(
                [
                    'result'=>'failed',
                ],
                500,
                [],
                JSON_UNESCAPED_UNICODE
            );
        }
    }
    
    public function updateCategory(Request $request)
    {
        $playlist = Playlist::find($request->playlist_id);
        $playlist->playlistCategory = $request->playlistCategory;
        try {
            $playlist->save();
            return response()->json(
                [
                    'result' => 'updated',
                    'playlist' => $playlist,
                ],
                201,
                [],
                JSON_UNESCAPED_UNICODE
            );
        } catch (\Exception $e) {
            echo $e->getMessage();   // insert query

            return response()->json(
                [
                    'result'=>'failed',
                ],
                500,
                [],
                JSON_UNESCAPED_UNICODE
            );
        }
    }
    
    public function updateSceneOrder(Request $request)
    {
        $playlist = Playlist::find($request->playlist_id);
        foreach ($request->tagVideoData as $key => $scene) {
            $playlist->tags()->detach($scene['id']);
        }

        $sceneOrder = 0;
        foreach ($request->tagVideoData as $key => $scene) {
            $sceneOrder ++;
            $playlist->tags()->attach(
                ['tag_id' => $scene['id']],
                ['scene_order' => $sceneOrder],
                ['created_at' => Carbon::now()],
                ['updated_at' => Carbon::now()]
            );
        }
        return response()->json(
            [
                'playlist' => $playlist,
            ],
            201,
            [],
            JSON_UNESCAPED_UNICODE
        );
    }
    
    public function publicPlaylist()
    {
        if (Auth::user()) {
            $publicPlaylist = Playlist::with('tags')->withCount(['playlistlogs as play_count'])->where('privacySetting', 'public')->get();

            return $publicPlaylist;
        } else {
            return [];
        }
    }
    public function createdTagListByUser($user)
    {
        if (Auth::user()) {
            $createdTagList = Tag::Where('tags.user_id', $user)->where('privacySetting', 'public')->leftJoin('videos', 'videos.id', '=', 'tags.video_id')->select('videos.id as video_id', 'youtubeId', 'videos.user_id', 'title', 'thumbnail', 'duration', 'channel_title', 'published_at', 'view_count', 'videos.created_at as video_created_at', 'videos.updated_at as video_updated_at', 'tags.id as tag_id', 'tags', 'start', 'end', 'preview', 'previewgif', 'tags.created_at as tag_created_at', 'tags.updated_at as tag_updated_at')->orderBy('tag_created_at', 'desc')->get();
            return $createdTagList;
        } else {
            return [];
        }
    }
    public function loadPublicPlaylistAndScenelist(Request $request)
    {
        if (Auth::user()) {
            $createdUser = $request->created_user;
            //作成したプレイリストを取得
            $publicPlaylist = $this->publicPlaylist();
            $createdTagList = $this->createdTagListByUser($createdUser);
            
            return response()->json(
                [
                'publicPlaylist' => $publicPlaylist,
                'createdTagList' => $createdTagList
                ],
                200,
                [],
                JSON_UNESCAPED_UNICODE
            );
        } else {
            return response()->json(
                [
                'error' => 'セッションが切れているので、もう一度ログインして下さい'
                ],
                401,
                [],
                JSON_UNESCAPED_UNICODE
            );
        }
    }
    
    public function addPlaylistComment(Request $request)
    {
        if (Auth::user()) {
            $playlistComment = $this->savePlaylistComment($request->playlist_id, $request->content, $request->user_id, $request->parent_id);
            $newPlaylistComment = PlaylistComment::leftJoin('users', 'users.id', '=', 'playlist_comments.user_id')->select('playlist_comments.id as comment_id', 'playlist_comments.created_at as comment_publishedAt', 'playlist_comments.*', 'users.*')->where('playlist_comments.id', $playlistComment->id)->first();
            if (!$request->parent_id) {
                $newPlaylistComment->replies = [];
            }
            $newPlaylistComment->isLiked = false;
            $newPlaylistComment->likes_count = 0;

            return response()->json(
                [
                'newComment' => $newPlaylistComment
                ],
                201,
                [],
                JSON_UNESCAPED_UNICODE
            );
        } else {
            return response()->json(
                [
                'error' => 'セッションが切れているので、もう一度ログインして下さい'
                ],
                401,
                [],
                JSON_UNESCAPED_UNICODE
            );
        }
    }


    public function savePlaylistComment($playlist_id, $content, $user_id, $parent_id)
    {
        $playlistComment = new PlaylistComment;
        $playlistComment->playlist_id = $playlist_id;
        $playlistComment->content = $content;
        $playlistComment->user_id = $user_id;
        $playlistComment->parent_id = $parent_id;
        $playlistComment->save();

        return $playlistComment;
    }

    public function likeComment(Request $request)
    {
        if (Auth::user()) {
            $likeComment = LikesComment::where('comment_id', $request->comment_id)->where('cmt_option', $request->cmt_option)->where('user_id', $request->user_id)->first();
            if ($likeComment) {
                $likeComment->delete();
                return response()->json(
                    [
                    'isLiked' => false
                    ],
                    201,
                    [],
                    JSON_UNESCAPED_UNICODE
                );
            } else {
                $likeComment = new LikesComment;
                $likeComment->comment_id = $request->comment_id;
                $likeComment->user_id = $request->user_id;
                $likeComment->cmt_option = $request->cmt_option;
                $likeComment->save();
                return response()->json(
                    [
                    'isLiked' => true
                    ],
                    201,
                    [],
                    JSON_UNESCAPED_UNICODE
                );
            }
        } else {
            return response()->json(
                [
                'error' => 'セッションが切れているので、もう一度ログインして下さい'
                ],
                401,
                [],
                JSON_UNESCAPED_UNICODE
            );
        }
    }

    public function getThumbnail($playlistId)
    {
        $playlist = Playlist::find($playlistId);
        if ($playlist->custom_thumbnail) {
            $thumbnail = $playlist->custom_thumbnail;
        } else {
            $tagId = DB::table('playlist_tag')->where('playlist_id', $playlistId)->select('tag_id')->orderBy('scene_order', 'ASC')->first();
            $tag = Tag::find($tagId->tag_id);
            $thumbnail = $tag->preview;
        }

        return response()->json(
            [
                'thumbnail' => $thumbnail
            ],
            200,
            [],
            JSON_UNESCAPED_UNICODE
        );
    }

    public function clearCustomThumbnail(Request $request)
    {
        $playlist = Playlist::find($request->playlistId);
        
        //S3に保存されている既存のサムネイルを削除
        if ($playlist->custom_thumbnail) {
            try {
                Storage::disk('s3')->delete('thumbs/'.$playlist->custom_thumbnail);
            } catch (\Exception $e) {
                \Log::debug($e->getMessage());
                // insert query
            }
        }
        
        //plyalistsテーブルのcustom_thumbnailをクリア
        $playlist->custom_thumbnail = "";
        $playlist->save();

        return response()->json(
            [
                'customThumbnail' => ""
            ],
            201,
            [],
            JSON_UNESCAPED_UNICODE
        );
    }

    public function saveCustomThumbnail(Request $request)
    {
        $tagController = app()->make('App\Http\Controllers\TagController');
        
        //サムネイル用のファイル名を取得
        $startSec = $tagController->convertToSec($request->start);
        $customThumbnail = $tagController->getPreviewThumbFileName($request);

        //ダウンロードリンクの取得
        $ytDirectUrl = $tagController->getYoutubeDirectLinkMp4("https://www.youtube.com/watch?v=" . $request->youtubeId);

        if ($request->telops) {
            //サムネイル用の画像を取得
            $tempFile = 'temp'. "-" . rand() .'.webp';
            $cmd_webp = 'ffmpeg -ss '.$startSec.' -i "'.$ytDirectUrl.'" -vframes 1 -q:v 100 -vf scale=420:-1 '.storage_path()."/app/public/imgs/".$tempFile.' 2>&1';
            exec($cmd_webp);

            //テキストを画像に合成
            $cmd_filter_start = 'ffmpeg -i '.storage_path()."/app/public/imgs/".$tempFile.' -filter_complex "';
            $cmd_filter_end = '" '.storage_path()."/app/public/imgs/".$customThumbnail;
            $cmd_drawtext = '';
            foreach ($request->telops as $key => $telop) {
                $text_drawtext = $telop['text'];
                $position_drawtext = $this->convertToDrawtextPosition($telop['position']);
                $fontcolor_drawtext = $telop['color'];
                $fontsize_drawtext = $this->convertToDrawtextFontsize($telop['size']);
                $connection_drawtext = '';

                if ($key > 0) {
                    $connection_drawtext = ',';
                }
                $cmd_drawtext .=  $connection_drawtext.'drawtext=fontfile='.storage_path().'/app/public/fonts/meiryo.ttc:text='.$text_drawtext.$position_drawtext.':fontcolor='.$fontcolor_drawtext.':bordercolor=black:borderw=1:fontsize='.$fontsize_drawtext;
            }
            $cmd_filter_drawtext = $cmd_filter_start.$cmd_drawtext.$cmd_filter_end;
            exec($cmd_filter_drawtext);
        } else {
            //サムネイル用の画像を取得
            $cmd_webp = 'ffmpeg -ss '.$startSec.' -i "'.$ytDirectUrl.'" -vframes 1 -q:v 100 -vf scale=420:-1 '.storage_path()."/app/public/imgs/".$customThumbnail.' 2>&1';
            exec($cmd_webp);
        }

        //S3に保存
        Storage::disk('s3')->putFileAs('thumbs', new File(storage_path()."/app/public/imgs/".$customThumbnail), $customThumbnail, 'public');

        //一時的にローカルに保存したファイルを削除
        if ($request->telops) {
            unlink(storage_path(). "/app/public/imgs/" . $tempFile);
        }
        unlink(storage_path(). "/app/public/imgs/" . $customThumbnail);

        //S3に保存後にplyalistsテーブルのcustom_thumbnailにファイル名を保存(S3保存前だとTitleページで空のimageが読み込まれてしまうので注意)
        $playlist = Playlist::find($request->playlistId);
        $playlist->custom_thumbnail = $customThumbnail;
        $playlist->save();

        return response()->json(
            [
                'customThumbnail' => $customThumbnail
            ],
            201,
            [],
            JSON_UNESCAPED_UNICODE
        );
    }

    public function report(Request $request)
    {
        $report = new Report;
        $report->playlist_id = $request->playlistId;
        $report->reportCategory = $request->reportCategory;
        $report->detail = $request->detail;
        $report->save();

        return response()->json(
            [
                'report' => $report
            ],
            201,
            [],
            JSON_UNESCAPED_UNICODE
        );
    }

    private function convertToDrawtextPosition($telopPosition)
    {
        if ($telopPosition == 'bottomLeft') {
            return ':x=12:y=h-text_h-24';
        } elseif ($telopPosition == 'bottomCenter') {
            return ':x=(w-text_w)/2:y=h-text_h-24';
        } elseif ($telopPosition == 'bottomRight') {
            return ':x=w-text_w-12:y=h-text_h-24';
        } elseif ($telopPosition == 'middleLeft') {
            return ':x=12:y=(h-text_h)/2';
        } elseif ($telopPosition == 'middleCenter') {
            return ':x=(w-text_w)/2:y=(h-text_h)/2';
        } elseif ($telopPosition == 'middleRight') {
            return ':x=w-text_w-12:y=(h-text_h)/2';
        } elseif ($telopPosition == 'upperLeft') {
            return ':x=12:y=24';
        } elseif ($telopPosition == 'upperCenter') {
            return ':x=(w-text_w)/2:y=24';
        } elseif ($telopPosition == 'upperRight') {
            return ':x=w-text_w-12:y=24';
        } else {
            return '';
        }
    }

    private function convertToDrawtextFontsize($telopSize)
    {
        if ($telopSize == 'large') {
            return 36;
        } elseif ($telopSize == 'medium') {
            return 24;
        } elseif ($telopSize == 'small') {
            return 16;
        } else {
            return '';
        }
    }
}
