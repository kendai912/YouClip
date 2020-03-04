<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use App\Video;
use App\Tag;
use App\User;
use App\Playlist;

class TagController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }
    
    public function load()
    {
        //動画・タグの全データを外部結合し抽出
        $tagVideoData = Tag::leftJoin('videos', 'videos.id', '=', 'tags.video_id')->select('videos.id as video_id', 'youtubeId', 'videos.user_id', 'url', 'title', 'thumbnail', 'duration', 'videos.created_at as video_created_at', 'videos.updated_at as video_updated_at', 'tags.id as tag_id', 'tags', 'start', 'end', 'tags.created_at as tag_created_at', 'tags.updated_at as tag_updated_at')->orderBy('tag_created_at', 'desc')->get();

        return $tagVideoData;
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
        $tag->playlists()->attach($checkedPlaylistIds);
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
        //DBに保存
        $tag = new Tag;
        $tag->video_id = $request->video_id;
        $tag->user_id = $request->user_id;
        $tag->tags = $request->tags;
        $tag->start = "00:".$request->start;
        $tag->end = "00:".$request->end;
        $tag->save();

        //保存したタグデータをリターン
        return response()->json(
            [
                'data' => $tag
            ],
            200,
            [],
            JSON_UNESCAPED_UNICODE
        );
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
        $tag = Tag::find($request->id);
        $tag->tags = $request->tags;
        $tag->start = "00:".$request->start;
        $tag->end = "00:".$request->end;
        $tag->save();
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
