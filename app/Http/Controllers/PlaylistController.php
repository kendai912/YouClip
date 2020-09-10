<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use App\Video;
use App\Tag;
use App\User;
use App\Playlist;
use App\Playlistlog;
use App\LikesPlaylist;
use App\Like;
use Carbon\Carbon;

use DB;

class PlaylistController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    // public function index()
    // {
    //     //ログインユーザーを取得
    //     $user = Auth::user();

    //     //ユーザーが保存したプレイリストのリストを取得
    //     $playlists = $user->playlists;

    //     //保存したタグデータをリターン
    //     return response()->json(
    //         [
    //             'playlists' => $playlists
    //         ],
    //         200,
    //         [],
    //         JSON_UNESCAPED_UNICODE
    //     );
    // }

    //【レコメンド】プレイリスト一覧の取得
    public function indexPlaylistAndTagPaginationOfRecommend()
    {
        //プレイリストにタグのデータを結合し、直近30日のLike数が多い順・新しい順に並び替え
        $contentsPerPage = 5;

        // $playlistAndTagPaginationOfRecommend = Playlist::with('tags')->withCount(['likesPlaylist as likesPlaylist_count' => function ($query) {
        //     $query->where('likes_playlists.created_at', '>', Carbon::now()->subDays(30));
        // }, 'playlistlogs as play_count'
        // ])->orderBy('likesPlaylist_count', 'desc')->orderBy('created_at', 'desc')->paginate($contentsPerPage);

        // DB::enableQueryLog();
        $playlists = Playlist::with(array('tags'=> function($query) {
            $likes_tags = Like::groupBy('tag_id')->select('tag_id', DB::raw('count(*) as likes_tag_count'))->orderBy('likes_tag_count', 'DESC');
            $likes_tags_sql = $likes_tags->toSql();
            $query->leftJoinSub('(' . $likes_tags_sql. ')', 'likes_tags', function ($join) {
                $join->on('tags.id', '=', 'likes_tags.tag_id');
            })->select('*')->orderBy('likes_tags.likes_tag_count', 'desc')->get();
        }))
        ->withCount(['likesPlaylist as likesPlaylist_count' => function ($query) {
            $query->where('likes_playlists.created_at', '>', Carbon::now()->subDays(30));
        }, 'playlistlogs as play_count'])
        ->orderBy('likesPlaylist_count', 'desc')->orderBy('created_at', 'desc')
        ->paginate($contentsPerPage);
        $playlistAndTagPaginationOfRecommend = $playlists;
        $playlistAndTagPaginationOfRecommend->data = $playlists->map(function($playlist) {
            $playlist->setRelation('tags', $playlist->tags->take(5));
            return $playlist;
        });

        // $query = DB::getQueryLog();
        // $lastQuery = end($query);
        // print_r($lastQuery);
        // dd(DB::getQueryLog());
        return response()->json(
            [
            'playlistAndTagPaginationOfRecommend' => $playlistAndTagPaginationOfRecommend,
            ],
            200,
            [],
            JSON_UNESCAPED_UNICODE
        );
    }

    //【新着】プレイリスト一覧の取得
    public function indexPlaylistAndTagPaginationOfNew()
    {
        //プレイリストにタグのデータを結合し、新しい順に並び替え
        $contentsPerPage = 5;
        $playlists = Playlist::with(array('tags'=> function($query) {
            $likes_tags = Like::groupBy('tag_id')->select('tag_id', DB::raw('count(*) as likes_tag_count'))->orderBy('likes_tag_count', 'DESC');
            $likes_tags_sql = $likes_tags->toSql();
            $query->leftJoinSub('(' . $likes_tags_sql. ')', 'likes_tags', function ($join) {
                $join->on('tags.id', '=', 'likes_tags.tag_id');
            })->select('*')->orderBy('likes_tags.likes_tag_count', 'desc')->get();
        }))->withCount(['likesPlaylist as likesPlaylist_count' => function ($query) {
            $query->where('likes_playlists.created_at', '>', Carbon::now()->subDays(30));
        }, 'playlistlogs as play_count'
        ])->orderBy('created_at', 'desc')->paginate($contentsPerPage);
        $playlistAndTagPaginationOfNew = $playlists;
        $playlistAndTagPaginationOfNew->data = $playlists->map(function($playlist) {
            $playlist->setRelation('tags', $playlist->tags->take(5));
            return $playlist;
        });

        return response()->json(
            [
            'playlistAndTagPaginationOfNew' => $playlistAndTagPaginationOfNew
            ],
            200,
            [],
            JSON_UNESCAPED_UNICODE
        );
    }

    //【スポーツ】プレイリスト一覧の取得
    public function indexPlaylistAndTagPaginationOfSports()
    {
        //スポーツカテゴリの、直近30日のLike数が多い順・新しい順に並び替え
        $contentsPerPage = 5;
        $playlists = Playlist::with(array('tags'=> function($query) {
            $likes_tags = Like::groupBy('tag_id')->select('tag_id', DB::raw('count(*) as likes_tag_count'))->orderBy('likes_tag_count', 'DESC');
            $likes_tags_sql = $likes_tags->toSql();
            $query->leftJoinSub('(' . $likes_tags_sql. ')', 'likes_tags', function ($join) {
                $join->on('tags.id', '=', 'likes_tags.tag_id');
            })->select('*')->orderBy('likes_tags.likes_tag_count', 'desc')->get();
        }))->where('playlistCategory', 'Sports')->withCount(['likesPlaylist as likesPlaylist_count' => function ($query) {
            $query->where('likes_playlists.created_at', '>', Carbon::now()->subDays(30));
        }, 'playlistlogs as play_count'
        ])->orderBy('likesPlaylist_count', 'desc')->orderBy('created_at', 'desc')->paginate($contentsPerPage);
        $playlistAndTagPaginationOfSports = $playlists;
        $playlistAndTagPaginationOfSports->data = $playlists->map(function($playlist) {
            $playlist->setRelation('tags', $playlist->tags->take(5));
            return $playlist;
        });

        return response()->json(
            [
            'playlistAndTagPaginationOfSports' => $playlistAndTagPaginationOfSports
            ],
            200,
            [],
            JSON_UNESCAPED_UNICODE
        );
    }

    //【エンターテイメント】プレイリスト一覧の取得
    public function indexPlaylistAndTagPaginationOfEntertainment()
    {
        //エンターテイメントカテゴリの、直近30日のLike数が多い順・新しい順に並び替え
        $contentsPerPage = 5;
        $playlists = Playlist::with(array('tags'=> function($query) {
            $likes_tags = Like::groupBy('tag_id')->select('tag_id', DB::raw('count(*) as likes_tag_count'))->orderBy('likes_tag_count', 'DESC');
            $likes_tags_sql = $likes_tags->toSql();
            $query->leftJoinSub('(' . $likes_tags_sql. ')', 'likes_tags', function ($join) {
                $join->on('tags.id', '=', 'likes_tags.tag_id');
            })->select('*')->orderBy('likes_tags.likes_tag_count', 'desc')->get();
        }))->where('playlistCategory', 'Entertainment')->withCount(['likesPlaylist as likesPlaylist_count' => function ($query) {
            $query->where('likes_playlists.created_at', '>', Carbon::now()->subDays(30));
        }, 'playlistlogs as play_count'])->orderBy('likesPlaylist_count', 'desc')->orderBy('created_at', 'desc')->paginate($contentsPerPage);
        $playlistAndTagPaginationOfEntertainment = $playlists;
        $playlistAndTagPaginationOfEntertainment->data = $playlists->map(function($playlist) {
            $playlist->setRelation('tags', $playlist->tags->take(5));
            return $playlist;
        });

        return response()->json(
            [
            'playlistAndTagPaginationOfEntertainment' => $playlistAndTagPaginationOfEntertainment
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
        $playlistAndTagData = Playlist::with('tags')->where('id', $playlistId)->withCount(['playlistlogs as play_count'])->first();

        //タグから動画データを取得
        $tagVideoDatas = [];
        foreach ($playlistAndTagData->tags as $tag) {
            $tagVideoData = Tag::join('videos', 'videos.id', '=', 'tags.video_id')->select('videos.id as video_id', 'youtubeId', 'videos.user_id', 'title', 'thumbnail', 'duration', 'channel_title', 'published_at', 'view_count', 'category', 'videos.created_at as video_created_at', 'videos.updated_at as video_updated_at', 'tags.id as tag_id', 'tags', 'start', 'end', 'preview', 'previewgif', 'tags.created_at as tag_created_at', 'tags.updated_at as tag_updated_at')->where('tags.id', $tag->id)->first();
            $sceneOrder = DB::table('playlist_tag')->where('playlist_id', $playlistId)->where('tag_id', $tag->id)->select('scene_order')->first();
            $tagVideoData->scene_order = $sceneOrder->scene_order;
            $tagVideoDatas[] = $tagVideoData;
        }

        // usort($tagVideoDatas, fn($a, $b) => strcmp($a->scene_order, $b->scene_order));
        usort($tagVideoDatas, function($a, $b)
             {
                 if ($a["scene_order"] == $b["scene_order"])
                     return (0);
                 return (($a["scene_order"] < $b["scene_order"]) ? -1 : 1);
             });

        //プレイリスト・タグ・動画のデータを連結
        $playlistAndTagVideoData = [
            'playlist_id' => $playlistAndTagData->id,
            'playlistName' => $playlistAndTagData->playlistName,
            'privacySetting' => $playlistAndTagData->privacySetting,
            'play_count' => $playlistAndTagData->play_count,
            'user_id' => $playlistAndTagData->user_id,
            'playlist_created_at' => (new Carbon($playlistAndTagData->created_at))->toDateTimeString(),
            'playlist_updated_at' => (new Carbon($playlistAndTagData->updated_at))->toDateTimeString(),
            'tagVideoData' => $tagVideoDatas,
        ];

        return response()->json(
            [
            'playlistAndTagVideoData' => $playlistAndTagVideoData
            ],
            200,
            [],
            JSON_UNESCAPED_UNICODE
        );
    }

    //作成したプレイリスト一覧を取得
    public function getMyCreatedPlaylist()
    {
        //作成したプレイリスト一覧を取得
        $createdPlaylist = $this->createdPlaylist();
        
        return response()->json(
            [
            'myCreatedPlaylist' => $createdPlaylist
            ],
            200,
            [],
            JSON_UNESCAPED_UNICODE
        );
    }

    //Likeまたは作成したプレイリスト一覧をロード
    public function loadMyCreatedAndLikedPlaylist()
    {
        if (Auth::user()) {
            //Likeしたプレイリストを取得
            $LikedPlaylist = $this->likedPlaylist();

            //作成したプレイリストを取得
            $createdPlaylist = $this->createdPlaylist();

            //Likeしたプレイリストと作成したプレイリストをマージ
            $myCreatedAndLikedPlaylist = $LikedPlaylist->merge($createdPlaylist);
            
            return response()->json(
                [
                'myCreatedAndLikedPlaylist' => $myCreatedAndLikedPlaylist
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
    public function likedPlaylist()
    {
        if (Auth::user()) {
            $likesPlaylists = LikesPlaylist::where('user_id', Auth::user()->id)->get();
            $likesPlaylistIds = [];
            foreach ($likesPlaylists as $likesPlaylist) {
                $likesPlaylistIds[] = $likesPlaylist->playlist_id;
            }

            $myLikedPlaylists = Playlist::with('tags')->find($likesPlaylistIds);

            return $myLikedPlaylists;
        } else {
            return [];
        }
    }

    //作成したプレイリストを取得
    public function createdPlaylist()
    {
        if (Auth::user()) {
            $createdPlaylist = Playlist::with('tags')->where('user_id', Auth::user()->id)->get();

            return $createdPlaylist;
        } else {
            return [];
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
            $playlist->playlistName = $request->newPlaylistName;
            $playlist->privacySetting = $request->privacySetting;
            $playlist->user_id = Auth::user()->id;
            $playlist->playlistCategory = $request->currentCategory;
            $playlist->save();

            //playlist_tagテーブルに保存
            $playlist->tags()->attach(
                ['tag_id' => $request->currentTagId],
                ['scene_order' => 1],
                ['created_at' => Carbon::now()],
                ['updated_at' => Carbon::now()]
            );

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

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
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

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
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
    public function addVisitCount(Request $request, $playlist_id) {
        // $user = Auth::user();
        $playlist = Playlist::find($playlist_id);
        $playlistlog = new Playlistlog();
        $playlistlog->playlist_id = $playlist_id;
        // print_r($playlist); exit;
        // $playlistlog->user_id = $user->id;
        try {
            $playlist->playlistlogs()->save($playlistlog);
            return true;
        } catch (Exception $e) {
            return false;
        }
    }

    public function updateTitle(Request $request) {
        $playlist = Playlist::find($request->playlist_id);
        $playlist->playlistName = $request->playlistName;
        try {
            $playlist->save();
            return response()->json(
                [
                    'result' => 'updated',
                    'playlistAndTagVideoData' => $playlist,
                ],
                200,
                [],
                JSON_UNESCAPED_UNICODE
            );
        } catch (Exception $e) {
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
    public function updatePrivacy(Request $request) {
        $playlist = Playlist::find($request->playlist_id);
        $playlist->privacySetting = $request->privacySetting;
        try {
            $playlist->save();
            return response()->json(
                [
                    'result' => 'updated',
                    'playlistAndTagVideoData' => $playlist,
                ],
                200,
                [],
                JSON_UNESCAPED_UNICODE
            );
        } catch (Exception $e) {
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
    public function updateSceneOrder(Request $request) {
        $playlist = Playlist::find($request->playlist_id);
        // DB::table('playlist_tag')->where('playlist_id', $request->playlist_id)->delete();
        foreach ($request->tagVideoData as $key => $scene ) {
            $playlist->tags()->detach($scene['id']);
        }
        // print_r($playlist->tags()->count()); exit;
        $sceneOrder = 0;
        foreach ($request->tagVideoData as $key => $scene ) {
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
                'playlistAndTagVideoData' => $playlist,
            ],
            200,
            [],
            JSON_UNESCAPED_UNICODE
        );
    }
}
