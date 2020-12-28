<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use App\Video;
use App\Tag;
use App\Like;
use App\User;
use App\Playlist;
use App\TagComment;
use App\LikesComment;
use Carbon\Carbon;
use DB;
use FFMpeg;
use FFMpeg\Filters\Video\VideoFilters;
use FFMpeg\Media\Gif;
use FFMpeg\Format\ProgressListener\AbstractProgressListener;
use ProtoneMedia\LaravelFFMpeg\FFMpeg\ProgressListenerDecorator;
use YouTube\YouTubeDownloader;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\File;

class TagController extends Controller
{
    //動画IDから既存のタグデータを取得
    public function getTagByVideoId(Request $request)
    {
        $videoId = $request->videoId;
        $tag = Tag::where('video_id', $videoId)->get();

        return response()->json(
            [
                'tag' => $tag
            ],
            200,
            [],
            JSON_UNESCAPED_UNICODE
        );
    }

    //ID指定でのタグ・動画データの取得
    public function getTagAndVideoDataById(Request $request)
    {
        $tagId = $request->input('id');
        $tagAndVideoData = Tag::join('videos', 'videos.id', '=', 'tags.video_id')->select('videos.id as video_id', 'youtubeId', 'videos.user_id as video_user_id', 'title', 'thumbnail', 'duration', 'category', 'channel_title', 'published_at', 'view_count', 'videos.created_at as video_created_at', 'videos.updated_at as video_updated_at', 'tags.id as tag_id', 'tags.user_id as tag_user_id', 'tags', 'start', 'end', 'preview', 'previewgif', 'tags.created_at as tag_created_at', 'tags.updated_at as tag_updated_at', 'privacySetting')->where('tags.id', $tagId)->get();

        $comments = TagComment::leftJoin('users', 'users.id', '=', 'tag_comments.user_id')->select('tag_comments.id as comment_id', 'tag_comments.created_at as comment_publishedAt', 'tag_comments.*', 'users.*')->where('tag_comments.tag_id', $tagId)->where('tag_comments.parent_id', '0')->orderBy('comment_publishedAt', 'desc')->get();
        $commentDatas = [];

        foreach ($comments as $comment) {
            $commentData = $comment;
            $child_comments = TagComment::leftJoin('users', 'users.id', '=', 'tag_comments.user_id')->select('tag_comments.id as comment_id', 'tag_comments.created_at as comment_publishedAt', 'tag_comments.*', 'users.*')->where('parent_id', $comment->comment_id)->orderBy('comment_publishedAt', 'desc')->get();

            $childCommentDatas = [];
            foreach ($child_comments as $child) {
                $childCommentData = $child;
                $likes_child = LikesComment::where('comment_id', $child->comment_id)->where('cmt_option', '0')->select(DB::raw('COUNT(*) as likes_count'))->groupBy('comment_id')->first();
                if ($likes_child) {
                    $childCommentData->likes_count = $likes_child->likes_count;
                } else {
                    $childCommentData->likes_count = 0;
                }
                if (Auth::user()) {
                    $isLiked = LikesComment::where('comment_id', $child->comment_id)->where('cmt_option', '0')->where('user_id', Auth::user()->id)->first();
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
                $isLiked = LikesComment::where('comment_id', $comment->comment_id)->where('cmt_option', '0')->where('user_id', Auth::user()->id)->first();
                if ($isLiked) {
                    $commentData->isLiked = true;
                } else {
                    $commentData->isLiked = false;
                }
            } else {
                $commentData->isLiked = false;
            }

            $likes_comment = LikesComment::where('comment_id', $comment->comment_id)->where('cmt_option', '0')->select(DB::raw('COUNT(*) as likes_count'))->groupBy('comment_id')->first();
            if ($likes_comment) {
                $commentData->likes_count = $likes_comment->likes_count;
            } else {
                $commentData->likes_count = 0;
            }
            $commentDatas[] = $commentData;
        }

        $tagAndVideoData[0]['comments'] = $commentDatas;

        // シーンが非公開かつログインユーザーのものでない場合はデータを返却しない
        if ($tagAndVideoData[0]->privacySetting == 'private') {
            if (!Auth::user()) {
                return response()->json(
                    [
                    'tagAndVideoData' => 'private'
                    ],
                    403,
                    [],
                    JSON_UNESCAPED_UNICODE
                );
            } elseif ($tagAndVideoData[0]->tag_user_id != Auth::user()->id) {
                return response()->json(
                    [
                    'tagAndVideoData' => 'private'
                    ],
                    403,
                    [],
                    JSON_UNESCAPED_UNICODE
                );
            }
        }

        return response()->json(
            [
            'tagAndVideoData' => $tagAndVideoData
            ],
            200,
            [],
            JSON_UNESCAPED_UNICODE
        );
    }

    //Likeまたは作成したタグデータをロード
    public function loadMyCreatedAndLikedTagVideo()
    {
        //LikeしたタグIDを取得
        if (Auth::user()) {
            $likes = Like::where('user_id', Auth::user()->id)->get();
            $likesIds = [];
            foreach ($likes as $like) {
                $likesIds[] = $like->tag_id;
            }
            // DB::enableQueryLog();
            // Likeしたタグデータと作成したタグデータを取得
            $myCreatedAndLikedTagVideo = Tag::whereIn('tags.id', $likesIds)->orWhere('tags.user_id', Auth::user()->id)->leftJoin('videos', 'videos.id', '=', 'tags.video_id')->select('videos.id as video_id', 'youtubeId', 'videos.user_id', 'title', 'thumbnail', 'duration', 'channel_title', 'published_at', 'view_count', 'videos.created_at as video_created_at', 'videos.updated_at as video_updated_at', 'tags.id as tag_id', 'tags', 'start', 'end', 'preview', 'previewgif', 'tags.created_at as tag_created_at', 'tags.updated_at as tag_updated_at')->orderBy('tag_created_at', 'desc')->get();

            return response()->json(
                [
                'myCreatedAndLikedTagVideo' => $myCreatedAndLikedTagVideo
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

    //タグが保存されているユーザーのプレイリストIDをリターン
    public function getPlaylists(Tag $tag)
    {
        //ログインユーザーを取得
        if (Auth::user()) {
            $user = Auth::user();

            $playlistIdArray = array();
            foreach ($tag->playlists as $playlist) {
                //タグが保存されているプレイリストのIDを取得
                $playlistId = $playlist->pivot->playlist_id;
                //該当プレイリストがログインユーザーのものか判定
                if ($user->id == Playlist::find($playlistId)->user_id) {
                    $playlistIdArray[] = $playlistId;
                }
            };

            return response()->json(
                [
                    'playlistIds' => $playlistIdArray
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

    //タグをチェックの入ったプレイリストに保存
    public function addToPlaylists(Request $request, Tag $tag)
    {
        //ログインユーザーを取得
        if (Auth::user()) {
            $user = Auth::user();

            //配列として操作出来るように別の変数に格納
            $checkedPlaylistIds = $request->checkedPlaylistIds;

            foreach ($tag->playlists as $playlist) {
                //タグが保存されているプレイリストのIDを取得
                $playlistId = $playlist->pivot->playlist_id;
                //該当プレイリストがログインユーザーのものか判定
                if ($user->id == Playlist::find($playlistId)->user_id) {
                    //checkedPlaylistIdsに含まれているか判定
                    $key = array_search($playlistId, $checkedPlaylistIds);
                    if ($key !== false) {
                        //ある場合は既存なので配列から削除
                        array_splice($checkedPlaylistIds, $key, 1);
                    } else {
                        //ない場合はdetach
                        $tag->playlists()->detach($playlistId);
                    }
                }
            };

            foreach ($checkedPlaylistIds as $playlistId) {
                //シーン番号の一番最後を確認
                $currentLastSceneOrder = DB::table('playlist_tag')->where('playlist_id', $playlistId)->max('scene_order');
                empty($currentLastSceneOrder) ? $currentLastSceneOrder = 0 : "";

                $tag->playlists()->attach(
                    ['playlist_id' => $playlistId],
                    ['scene_order' => $currentLastSceneOrder + 1], //シーン番号の一番後ろに追加
                    ['created_at' => Carbon::now()]
                );
            }

            //保存したプレイリストデータをリターン
            return response()->json(
                [
                    'playlists' => $tag->playlists
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
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function storeSceneTags(Request $request)
    {
        if (Auth::user()) {
            if (Video::where('youtubeId', $request->youtubeId)->exists()) {
                //既存YouTube動画の場合、テーブルからVideoオブジェクトを取得
                $video = Video::where('youtubeId', $request->youtubeId)->first();
                $video->view_count = $request->newVideoData['view_count'];
                $video->save();
            } else {
                //新規YouTube動画の場合、最初に動画をDBに保存
                $video = new Video;
                $video->youtubeId = $request->youtubeId;
                $video->user_id = Auth::user()->id;
                $video->title = $request->newVideoData['title'];
                $video->thumbnail = $request->newVideoData['thumbnail'];
                $video->duration = $request->newVideoData['duration'];
                $video->category = $request->newVideoData['category'];
                $video->channel_title = $request->newVideoData['channel_title'];
                $video->published_at = $request->newVideoData['published_at'];
                $video->view_count = $request->newVideoData['view_count'];
                $video->save();
            }

            //タグの配列を「::」で区切った文字列に変換
            $tags = implode("::", $request->tags);

            //サムネイル・プレビュー動画・OGP用のファイル名を取得
            $previewFileNames = $this->getPreviewFileNames($request);
            $previewThumbName = $previewFileNames['previewThumbName'];
            $previewGifName = $previewFileNames['previewGifName'];
            $previewOgpName = $previewFileNames['previewOgpName'];

            $start = $request->start;

            //タグをDBに保存
            $tag = new Tag;
            $tag->video_id = $video->id;
            $tag->user_id = Auth::user()->id;
            $tag->tags = $tags;
            $tag->start = "00:".$request->start;
            $tag->end = "00:".$request->end;
            $tag->privacySetting = $request->privacySetting;
            $tag->preview = $previewThumbName;
            $tag->previewgif = $previewGifName;
            $tag->previewogp = $previewOgpName;
            $tag->save();

            //保存先プレイリストが指定されている場合
            if ($request->myPlaylistToSave != "none") {
                //シーン番号の一番最後を確認
                $currentLastSceneOrder = DB::table('playlist_tag')->where('playlist_id', $request->myPlaylistToSave)->max('scene_order');
                empty($currentLastSceneOrder) ? $currentLastSceneOrder = 0 : "";

                $tag->playlists()->attach(
                    ['playlist_id' => $request->myPlaylistToSave],
                    ['scene_order' => $currentLastSceneOrder + 1],
                    ['created_at' => Carbon::now()]
                );
            }

            //保存したタグデータをリターン
            return response()->json(
                [
                    'tag' => $tag
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
       
    public function getYoutubeDirectLinkMp4($url)
    {
        $yt = new YouTubeDownloader();
        $links = $yt->getDownloadLinks($url);

        $key = array_search('22', array_column($links, 'itag'));
        $yturl = $links[$key]['url'];
        return $yturl;
    }

    public function getPreviewFileNames($request)
    {
        $startSec = $this->convertToSec("00:".$request->start);
        $duration = 3;
        $endSec = $startSec + $duration;

        $previewThumbName = $request->youtubeId . "-" . $startSec . "-" . rand() . ".webp";
        $previewGifName = $request->youtubeId . "-" . $startSec . "-" . rand() . ".mp4";
        $previewOgpName = $request->youtubeId . "-" . $startSec . "-" . rand() . ".webp";

        $previewFileNames = [];
        $previewFileNames['previewThumbName'] = $previewThumbName;
        $previewFileNames['previewGifName'] = $previewGifName;
        $previewFileNames['previewOgpName'] = $previewOgpName;

        return $previewFileNames;
    }
    
    //サムネイル画像を取得しS3に保存
    public function storeTagThumbnail(Request $request)
    {
        $ytDirectUrl = $this->getYoutubeDirectLinkMp4("https://www.youtube.com/watch?v=" . $request->youtubeId);
        $startSec = $this->convertToSec("00:".$request->start);

        $previewThumbName = $request->previewThumbName;
        // FFMpeg::openUrl($ytDirectUrl)->getFrameFromSeconds($startSec)->export()->toDisk('s3')->save('thumbs/'.$previewThumbName);
        $cmd_webp = 'ffmpeg -ss '.$startSec.' -i "'.$ytDirectUrl.'" -vframes 1 -qscale 100 -vf scale=420:-1 '.storage_path()."/app/public/imgs/".$previewThumbName.' 2>&1';
        system($cmd_webp);
        Storage::disk('s3')->putFileAs('thumbs', new File(storage_path()."/app/public/imgs/".$previewThumbName), $previewThumbName, 'public');

        //一時的にローカルに保存したファイルを削除
        unlink(storage_path(). "/app/public/imgs/" . $previewThumbName);

        //保存したタグデータをリターン
        return response()->json(
            [],
            201,
            [],
            JSON_UNESCAPED_UNICODE
        );
    }
    
    //プレビュー動画を取得しS3に保存
    public function storeTagPreview(Request $request)
    {
        $ytDirectUrl = $this->getYoutubeDirectLinkMp4("https://www.youtube.com/watch?v=" . $request->youtubeId);
        $startSec = $this->convertToSec("00:".$request->start);
        $duration = 3;
        $endSec = $startSec + $duration;

        //mp4のプレビュー動画を取得しS3に保存
        $previewGifName = $request->previewGifName;
        $cmd_gif = 'ffmpeg -ss '.$startSec.' -t '.$duration.' -i "'.$ytDirectUrl.'" -vcodec libx264 -qscale 100 -an -vf "fps=19,scale=420:-1:flags=lanczos" -loop 0 '.storage_path()."/app/public/gifs/".$previewGifName.' 2>&1';
        system($cmd_gif);
        Storage::disk('s3')->putFileAs('gifs', new File(storage_path()."/app/public/gifs/".$previewGifName), $previewGifName, 'public');

        //OGP用のwebpアニメーションを取得しS3に保存
        $previewOgpName = $request->previewOgpName;
        $cmd_ogp = 'ffmpeg -ss '.$startSec.' -t '.$duration.' -i "'.$ytDirectUrl.'" -vcodec libx264 -qscale 80 -an -vf "fps=19,scale=420:-1:flags=lanczos" -loop 0 '.storage_path()."/app/public/ogps/".$previewOgpName.' 2>&1';
        system($cmd_ogp);
        Storage::disk('s3')->putFileAs('ogps', new File(storage_path()."/app/public/ogps/".$previewOgpName), $previewOgpName, 'public');

        //一時的にローカルに保存したファイルを削除
        unlink(storage_path(). "/app/public/gifs/" . $previewGifName);
        unlink(storage_path(). "/app/public/ogps/" . $previewOgpName);

        //保存したタグデータをリターン
        return response()->json(
            [],
            201,
            [],
            JSON_UNESCAPED_UNICODE
        );
    }

    // public function getPreviewFile($request)
    // {
    //     $ytDirectUrl = $this->getYoutubeDirectLinkMp4("https://www.youtube.com/watch?v=" . $request->youtubeId);
    //     $startSec = $this->convertToSec("00:".$request->start);
    //     $duration = 3;
    //     $endSec = $startSec + $duration;

    //     //サムネイル画像を取得しS3に保存
    //     $previewThumbName = $request->youtubeId . "-" . $startSec . "-" . rand() . ".webp";
    //     // FFMpeg::openUrl($ytDirectUrl)->getFrameFromSeconds($startSec)->export()->toDisk('s3')->save('thumbs/'.$previewThumbName);
    //     $cmd_png = 'ffmpeg -ss '.$startSec.' -i "'.$ytDirectUrl.'" -vframes 1 -qscale 100 -vf scale=420:-1 '.storage_path()."/app/public/imgs/".$previewThumbName.' 2>&1';
    //     system($cmd_png);
    //     Storage::disk('s3')->putFileAs('thumbs', new File(storage_path()."/app/public/imgs/".$previewThumbName), $previewThumbName, 'public');
        
    //     //mp4のプレビュー動画を取得しS3に保存
    //     $previewGifName = $request->youtubeId . "-" . $startSec . "-" . rand() . ".mp4";
    //     $cmd_gif = 'ffmpeg -ss '.$startSec.' -t '.$duration.' -i "'.$ytDirectUrl.'" -qscale 100 -vf "fps=24,scale=420:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" -loop 0 '.storage_path()."/app/public/gifs/".$previewGifName.' 2>&1';
    //     system($cmd_gif);
    //     Storage::disk('s3')->putFileAs('gifs', new File(storage_path()."/app/public/gifs/".$previewGifName), $previewGifName, 'public');

    //     //OGP用のwebpアニメーションを取得しS3に保存
    //     $previewOgpName = $request->youtubeId . "-" . $startSec . "-" . rand() . ".webp";
    //     $cmd_ogp = 'ffmpeg -ss '.$startSec.' -t '.$duration.' -i "'.$ytDirectUrl.'" -qscale 80 -vf "fps=10,scale=420:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" -loop 0 '.storage_path()."/app/public/ogps/".$previewOgpName.' 2>&1';
    //     system($cmd_ogp);
    //     Storage::disk('s3')->putFileAs('ogps', new File(storage_path()."/app/public/ogps/".$previewOgpName), $previewOgpName, 'public');


    //     //一時的にローカルに保存したファイルを削除
    //     unlink(storage_path(). "/app/public/imgs/" . $previewThumbName);
    //     unlink(storage_path(). "/app/public/gifs/" . $previewGifName);
    //     unlink(storage_path(). "/app/public/ogps/" . $previewOgpName);

    //     // プレビュー動画をWebm形式でS3に保存する場合
    //     // $startTimeCode = \FFMpeg\Coordinate\TimeCode::fromSeconds($startSec);
    //     // $durationTimeCode = \FFMpeg\Coordinate\TimeCode::fromSeconds($duration);
    //     // $clipFilter = new \FFMpeg\Filters\Video\ClipFilter($startTimeCode, $durationTimeCode);
    //     // FFMpeg::openUrl($ytDirectUrl)->addFilter($clipFilter)->export()->toDisk('s3')->inFormat(new \FFMpeg\Format\Video\WebM)->save('test.webm');

    //     $previews = [];
    //     $previews['previewThumbName'] = $previewThumbName;
    //     $previews['previewGifName'] = $previewGifName;
    //     $previews['previewOgpName'] = $previewOgpName;

    //     return $previews;
    // }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        //DBを更新
        $tag = Tag::find($request->tagId);
        // 開始or終了時間が更新された場合はpreview用のgifを再取得
        if ($this->convertToSec($tag->start) != $this->convertToSec("00:".$request->start) || $this->convertToSec($tag->end) != $this->convertToSec("00:".$request->end)) {
            //既存のS3に保存されているサムネイルとプレビューgifを削除
            Storage::disk('s3')->delete('thumbs/'.$tag->preview);
            Storage::disk('s3')->delete('gifs/'.$tag->previewgif);
            Storage::disk('s3')->delete('ogps/'.$tag->previewogp);

            //更新したpreview用のgifを再取得
            $previews = $this->getPreviewFile($request);
            $previewThumbName = $previews['previewThumbName'];
            $previewGifName = $previews['previewGifName'];
            $previewOgpName = $previews['previewOgpName'];

            $tag->preview = $previewThumbName;
            $tag->previewgif = $previewGifName;
            $tag->previewogp = $previewOgpName;
        }
        $tag->tags = implode("::", $request->tags); //タグの配列を「::」で区切った文字列に変換
        $start = $request->start;
        $tag->start = "00:".$request->start;
        $tag->end = "00:".$request->end;
        $tag->privacySetting = $request->privacySetting;
        $tag->save();

        //保存したタグデータをリターン
        return response()->json(
            [
                'tag' => $tag
            ],
            201,
            [],
            JSON_UNESCAPED_UNICODE
        );
    }
    
    /**
     * Remove the specified resource from storage.
     *
     * @return \Illuminate\Http\Response
     */
    public function delete(Request $request)
    {
        //削除するシーンタグを取得
        $tag = Tag::find($request->tagId);

        //S3に保存されているサムネイルとプレビューgifを削除
        Storage::disk('s3')->delete('thumbs/'.$tag->preview);
        Storage::disk('s3')->delete('gifs/'.$tag->previewgif);

        //DBから削除
        $tag->delete();

        return response(null, 204);
    }

    public function getTagHistories()
    {
        //ユーザーが登録した直近10件のシーンタグを取得
        if (Auth::user()) {
            $tags = Tag::where('user_id', Auth::user()->id)->orderBy('created_at', 'desc')->take(10)->get();

            $tagHistories = [];
            foreach ($tags as $tag) {
                $tagHistories[] = $tag->tags;
            }

            //取得したタグデータをリターン
            return response()->json(
                [
                    'tagHistories' => $tagHistories
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

    public static function convertToSec($time)
    {
        return 3600 * intval(date("H", strtotime($time))) + 60 * intval(date("i", strtotime($time))) + intval(date("s", strtotime($time)));
    }

    public function addTagComment(Request $request)
    {
        if (Auth::user()) {
            $tagComment = new TagComment;
            $tagComment->tag_id = $request->tag_id;
            $tagComment->content = $request->content;
            $tagComment->user_id = $request->user_id;
            $tagComment->parent_id = $request->parent_id;
            $tagComment->save();
            $newTagComment = TagComment::leftJoin('users', 'users.id', '=', 'tag_comments.user_id')->select('tag_comments.id as comment_id', 'tag_comments.created_at as comment_publishedAt', 'tag_comments.*', 'users.*')->where('tag_comments.id', $tagComment->id)->first();
            if (!$request->parent_id) {
                $newTagComment->replies = [];
            }
            $newTagComment->isLiked = false;
            $newTagComment->likes_count = 0;
            return response()->json(
                [
                'newComment' => $newTagComment
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
}
