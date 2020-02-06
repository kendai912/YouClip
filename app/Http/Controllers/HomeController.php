<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Video;
use App\Tag;
use Auth;
use Debugbar;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //タグ名で検索ワードに一致するものを抽出
        $tagResults = Tag::where('tags.user_id', Auth::user()->id)->leftJoin('videos', 'videos.id', '=', 'tags.video_id')->select('videos.id as video_id', 'youtubeId', 'videos.user_id', 'url', 'title', 'thumbnail', 'duration', 'tags.id as tag_id', 'tags', 'start', 'end', 'videos.created_at as video_created_at', 'videos.updated_at as video_updated_at');
        
        //タイトルで検索ワードに一致するものを抽出し、完全外部結合
        $videoResults = Video::where('videos.user_id', Auth::user()->id)->leftJoin('tags', 'videos.id', '=', 'tags.video_id')->select('videos.id as video_id', 'youtubeId', 'videos.user_id', 'url', 'title', 'thumbnail', 'duration', 'tags.id as tag_id', 'tags', 'start', 'end', 'videos.created_at as video_created_at', 'videos.updated_at as video_updated_at')->union($tagResults)->orderBy('video_id', 'desc')->get();

        //タグを動画毎にまとめて非正規化
        $results = Video::denormalizeVideoTagTable($videoResults);

        return view('home', compact('results'));
    }
    
    public function search($searchQuery)
    {
        //タグ名で検索ワードに一致するものを抽出
        $tagResults = Tag::where('tags', 'LIKE', "%$searchQuery%")->leftJoin('videos', 'videos.id', '=', 'tags.video_id')->select('video_id', 'youtubeId', 'videos.user_id', 'url', 'title', 'thumbnail', 'duration', 'tags.id as tag_id', 'tags', 'start', 'end', 'videos.created_at as video_created_at', 'videos.updated_at  as video_updated_at');
        
        //タイトルで検索ワードに一致するものを抽出し、完全外部結合
        $videoResults = Video::where('title', 'LIKE', "%$searchQuery%")->leftJoin('tags', 'videos.id', '=', 'tags.video_id')->select('video_id', 'youtubeId', 'videos.user_id', 'url', 'title', 'thumbnail', 'duration', 'tags.id as tag_id', 'tags', 'start', 'end', 'videos.created_at as video_created_at', 'videos.updated_at as video_updated_at')->union($tagResults)->orderBy('video_id', 'desc')->get();

        //タグを動画毎にまとめて非正規化
        $results = Video::denormalizeVideoTagTable($videoResults);

        return view('home', compact('results'));
    }

    public function searchCandidates(Request $request)
    {
        //searchQueryを含むタグ名一覧を抽出
        $tagCandidates = Tag::where('tags', 'LIKE', "%$request->searchQuery%")->select('tags')->get();
        
        //searchQueryを含むタイトル一覧を抽出
        $titleCandidates = Video::where('title', 'LIKE', "%$request->searchQuery%")->select('title')->get();

        //タグ名一覧とタイトル一覧をマージ
        $candidates = collect($tagCandidates)->merge($titleCandidates);
        
        return response()->json(
            [
                'data' => $candidates
            ],
            200,
            [],
            JSON_UNESCAPED_UNICODE
        );
    }
}
