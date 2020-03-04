<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Video;
use App\Tag;
use App\Playlist;
use Auth;
use Debugbar;

class SearchController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        // $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
    }
    
    public function search($searchQuery)
    {
        //タグ名で検索ワードに一致するものを抽出
        $tagResults = Tag::where('tags', 'LIKE', "%$searchQuery%")->leftJoin('videos', 'videos.id', '=', 'tags.video_id')->select('video_id', 'youtubeId', 'videos.user_id', 'url', 'title', 'thumbnail', 'duration', 'tags.id as tag_id', 'tags', 'start', 'end', 'videos.created_at as video_created_at', 'videos.updated_at  as video_updated_at');
        
        //タイトルで検索ワードに一致するものを抽出し、完全外部結合
        $videoResults = Video::where('title', 'LIKE', "%$searchQuery%")->leftJoin('tags', 'videos.id', '=', 'tags.video_id')->select('video_id', 'youtubeId', 'videos.user_id', 'url', 'title', 'thumbnail', 'duration', 'tags.id as tag_id', 'tags', 'start', 'end', 'videos.created_at as video_created_at', 'videos.updated_at as video_updated_at')->union($tagResults)->orderBy('video_id', 'desc')->get();

        //タグを動画毎にまとめて非正規化
        $results = Video::denormalizeVideoTagTable($videoResults);

        //プレイリスト名で検索ワードに一致するものを抽出
        $playlistsMatchingKeyword = Playlist::where('playlistName', 'LIKE', "%$searchQuery%")->get();

        //プレイリストと最初のタグのサムネイルを結合
        $playlistsAndTagThumbs = array();
        foreach ($playlistsMatchingKeyword as $key => $playlist) {
            $playlistsAndTagThumbs[$key]["thumbnail"] = Video::find($playlist->tags()->first()->video_id)->thumbnail;
            $playlistsAndTagThumbs[$key]["playlistId"] = $playlist->id;
            $playlistsAndTagThumbs[$key]["playlistName"] = $playlist->playlistName;
            $playlistsAndTagThumbs[$key]["privacySetting"] = $playlist->privacySetting;
            $playlistsAndTagThumbs[$key]["user_id"] = $playlist->user_id;
        }

        //検索ワードに一致するタグを含むプレイリストを抽出
        $tagsMatchingKeyword = Tag::where('tags', 'LIKE', "%$searchQuery%")->get();
        foreach ($tagsMatchingKeyword as $tag) {
            foreach ($tag->playlists()->get() as $playlist) {
                $playlistsAndTagThumbs[] = [
                    'thumbnail' => Video::find($playlist->tags()->first()->video_id)->thumbnail,
                    'playlistId' => $playlist->id,
                    'playlistName' => $playlist->playlistName,
                    'privacySetting' => $playlist->privacySetting,
                    'user_id' => $playlist->user_id
                ];
            }
        }

        //プレイリストの重複を削除
        $playlistsAndTagThumbs = array_unique($playlistsAndTagThumbs, SORT_REGULAR);

        //Json形式へ変換
        $jsonPlaylistsAndTagThumbs = json_encode($playlistsAndTagThumbs);

        return view('home', compact('results', 'jsonPlaylistsAndTagThumbs'));
    }

    public function searchCandidates(Request $request)
    {
        //searchQueryを含むタグ名一覧を抽出
        $tagCandidates = Tag::where('tags', 'LIKE', "%$request->searchQuery%")->select('tags')->get();
        
        //searchQueryを含むタイトル一覧を抽出
        $titleCandidates = Video::where('title', 'LIKE', "%$request->searchQuery%")->select('title')->get();

        //searchQueryをプレイリスト名に含むプレイリスト一覧を抽出
        $playlistCandidates = Playlist::where('playlistName', 'LIKE', "%$request->searchQuery%")->select('playlistName')->get();

        //タグ名一覧とタイトル一覧とプレイリスト名をマージ
        $candidates = collect($tagCandidates)->merge($titleCandidates)->merge($playlistCandidates);
        
        return response()->json(
            [
                'candidates' => $candidates
            ],
            200,
            [],
            JSON_UNESCAPED_UNICODE
        );
    }
}
