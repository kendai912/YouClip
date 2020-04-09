<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use App\Video;
use App\Tag;
use App\Like;
use App\User;
use App\Playlist;
use Carbon\Carbon;

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

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }
    
    //全ターグデータをロード
    public function loadAllTag()
    {
        //動画・タグの全データを外部結合し抽出
        $tagVideoData = Tag::leftJoin('videos', 'videos.id', '=', 'tags.video_id')->select('videos.id as video_id', 'youtubeId', 'videos.user_id', 'title', 'thumbnail', 'duration', 'videos.created_at as video_created_at', 'videos.updated_at as video_updated_at', 'tags.id as tag_id', 'tags', 'start', 'end', 'preview', 'tags.created_at as tag_created_at', 'tags.updated_at as tag_updated_at')->orderBy('tag_created_at', 'desc')->get();

        return $tagVideoData;
    }

    //Likeまたは作成したタグデータをロード
    public function loadMyTag()
    {
        //LikeしたタグIDを取得
        $likes = Like::where('user_id', Auth::user()->id)->get();
        $likesIds = [];
        foreach ($likes as $like) {
            $likesIds[] = $like->tag_id;
        }
        
        // Likeしたタグデータと作成したタグデータを取得
        $myTagVideoData = Tag::whereIn('tags.id', $likesIds)->orWhere('tags.user_id', Auth::user()->id)->leftJoin('videos', 'videos.id', '=', 'tags.video_id')->select('videos.id as video_id', 'youtubeId', 'videos.user_id', 'title', 'thumbnail', 'duration', 'videos.created_at as video_created_at', 'videos.updated_at as video_updated_at', 'tags.id as tag_id', 'tags', 'start', 'end', 'preview', 'tags.created_at as tag_created_at', 'tags.updated_at as tag_updated_at')->orderBy('tag_created_at', 'desc')->get();

        return response()->json(
            [
            'myTagVideoData' => $myTagVideoData
            ],
            200,
            [],
            JSON_UNESCAPED_UNICODE
        );
    }

    //タグが保存されているユーザーのプレイリストIDをリターン
    public function getPlaylists(Tag $tag)
    {
        //ログインユーザーを取得
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
    }

    //タグをチェックの入ったプレイリストに保存
    public function addToPlaylists(Request $request, Tag $tag)
    {
        //ログインユーザーを取得
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
            $tag->playlists()->attach(
                ['playlist_id' => $playlistId],
                ['created_at' => Carbon::now()],
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
    public function store(Request $request)
    {
        //新規の場合、最初に動画をDBに保存
        if ($request->isNew) {
            $video = new Video;
            $video->youtubeId = $request->youtubeId;
            $video->user_id = Auth::user()->id;
            $video->title = $request->newVideoData['title'];
            $video->thumbnail = $request->newVideoData['thumbnail'];
            $video->duration = "00:".$request->newVideoData['duration'];
            $video->category = $request->newVideoData['category'];
            $video->save();
        } else {
            //既存の場合、テーブルからVideoオブジェクトを取得
            $video = Video::where('youtubeId', $request->youtubeId)->first();
        }

        //タグの配列をスペース区切りの文字列に変換
        $tags = implode(" ", $request->tags);

        //プレビュー用のgifを取得しファイル名を変数に格納
        $previewFileName = $this->getPreviewFile($request);

        //タグをDBに保存
        $tag = new Tag;
        $tag->video_id = $video->id;
        $tag->user_id = Auth::user()->id;
        $tag->tags = $tags;
        $tag->start = "00:".$request->start;
        $tag->end = "00:".$request->end;
        $tag->preview = $previewFileName;
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

    public function getPreviewFile($request)
    {
        $grabzIt = resolve('grabzit');

        $options = new \GrabzIt\GrabzItAnimationOptions();
        $options->setDuration(3);
        $startSec = $this->convertToSec("00:".$request->start);
        $options->setStart($startSec);

        $previewFileName = $request->youtubeId . "-" . $startSec . "-" . rand() . ".gif";
        $grabzIt->URLToAnimation("https://www.youtube.com/watch?v=" . $request->youtubeId, $options);
        $grabzIt->SaveTo(storage_path(). "/app/public/img/" . $previewFileName);

        return $previewFileName;
    }

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
            //既存のpreview用gifを削除
            unlink(storage_path(). "/app/public/img/" . $tag->preview);

            //更新したpreview用のgifを再取得
            $previewFileName = $this->getPreviewFile($request);
            $tag->preview = $previewFileName;
        }
        $tag->tags = implode(" ", $request->tags);
        $start = $request->start;
        $tag->start = "00:".$request->start;
        $tag->end = "00:".$request->end;
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
        //DBから削除
        $tag = Tag::find($request->id);
        $tag->delete();
    }

    public static function convertToSec($time)
    {
        return 3600 * intval(date("H", strtotime($time))) + 60 * intval(date("i", strtotime($time))) + intval(date("s", strtotime($time)));
    }
}
