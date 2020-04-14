<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use App\Video;
use App\Tag;
use App\User;
use App\Playlist;
use App\LikesPlaylist;
use Carbon\Carbon;

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

    //プレイリスト一覧の取得
    public function indexPlaylistAndTagPagination()
    {
        //プレイリストにタグのデータを結合
        $contentsPerPage = 5;
        $playlistAndTagPagination = Playlist::with('tags')->latest()->paginate($contentsPerPage);

        return response()->json(
            [
            'playlistAndTagPagination' => $playlistAndTagPagination
            ],
            200,
            [],
            JSON_UNESCAPED_UNICODE
        );
    }

    // ID指定でのプレイリストおよびタグ・動画データの取得
    public function getPlaylistAndTagVideoDataById(Request $request) {
        //プレイリストとタグのデータを取得
        $playlistId = $request->input('id');
        $playlistAndTagData = Playlist::with('tags')->where('id', $playlistId)->first();

        //タグから動画データを取得
        $tagVideoData = [];
        foreach($playlistAndTagData->tags as $tag) {
            $tagVideoData[] = Tag::join('videos', 'videos.id', '=', 'tags.video_id')->select('videos.id as video_id', 'youtubeId', 'videos.user_id', 'title', 'thumbnail', 'duration', 'videos.created_at as video_created_at', 'videos.updated_at as video_updated_at', 'tags.id as tag_id', 'tags', 'start', 'end', 'preview', 'tags.created_at as tag_created_at', 'tags.updated_at as tag_updated_at')->where('tags.id', $tag->id)->first();
        }

        //プレイリスト・タグ・動画のデータを連結
        $playlistAndTagVideoData = [
            'playlist_id' => $playlistAndTagData->id,
            'playlistName' => $playlistAndTagData->playlistName,
            'privacySetting' => $playlistAndTagData->privacySetting,
            'user_id' => $playlistAndTagData->user_id,
            'playlist_created_at' => (new Carbon($playlistAndTagData->created_at))->toDateTimeString(),
            'playlist_updated_at' => (new Carbon($playlistAndTagData->updated_at))->toDateTimeString(),
            'tagVideoData' => $tagVideoData,
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
    }

    //Likeしたプレイリストを取得
    public function likedPlaylist()
    {
        $likesPlaylists = LikesPlaylist::where('user_id', Auth::user()->id)->get();
        $likesPlaylistIds = [];
        foreach ($likesPlaylists as $likesPlaylist) {
            $likesPlaylistIds[] = $likesPlaylist->playlist_id;
        }

        $myLikedPlaylists = Playlist::with('tags')->find($likesPlaylistIds);

        return $myLikedPlaylists;
    }

    //作成したプレイリストを取得
    public function createdPlaylist()
    {
        $createdPlaylist = Playlist::with('tags')->where('user_id', Auth::user()->id)->get();

        return $createdPlaylist;
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
        $playlist = new Playlist;
        $playlist->playlistName = $request->newPlaylistName;
        $playlist->privacySetting = $request->privacySetting;
        $playlist->user_id = Auth::user()->id;
        $playlist->save();

        //playlist_tagテーブルに保存
        $playlist->tags()->attach(
            ['tag_id' => $request->currentTagId],
            ['created_at' => Carbon::now()],
            ['updated_at' => Carbon::now()],
        );

        return response()->json(
            [
            'newPlaylist' => $playlist
            ],
            201,
            [],
            JSON_UNESCAPED_UNICODE
        );
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
        $user = Auth::user();

        //ユーザーが保存したプレイリストのリストを取得
        $playlists = $user->playlists;

        return view('playlist_show', compact('playlists'));
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
}
