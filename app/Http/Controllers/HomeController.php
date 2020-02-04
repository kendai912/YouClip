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
        $tagResults = Tag::where('tags.user_id', Auth::user()->id)->leftJoin('videos', 'videos.id', '=', 'tags.video_id')->select('video_id', 'youtubeId', 'videos.user_id', 'url', 'title', 'thumbnail', 'duration', 'tags', 'start', 'end', 'videos.created_at', 'videos.updated_at');
        
        //タイトルで検索ワードに一致するものを抽出し、完全外部結合
        $videoResults = Video::where('videos.user_id', Auth::user()->id)->leftJoin('tags', 'videos.id', '=', 'tags.video_id')->select('video_id', 'youtubeId', 'videos.user_id', 'url', 'title', 'thumbnail', 'duration', 'tags', 'start', 'end', 'videos.created_at', 'videos.updated_at')->union($tagResults)->orderBy('video_id', 'desc')->get();

        //タグを動画毎にまとめて非正規化
        $results = $this->denormalizeTable($videoResults);

        return view('home', compact('results'));
    }
    
    public function search($searchQuery)
    {
        //タグ名で検索ワードに一致するものを抽出
        $tagResults = Tag::where('tags', 'LIKE', "%$searchQuery%")->leftJoin('videos', 'videos.id', '=', 'tags.video_id')->select('video_id', 'youtubeId', 'videos.user_id', 'url', 'title', 'thumbnail', 'duration', 'tags', 'start', 'end', 'videos.created_at', 'videos.updated_at');
        
        //タイトルで検索ワードに一致するものを抽出し、完全外部結合
        $videoResults = Video::where('title', 'LIKE', "%$searchQuery%")->leftJoin('tags', 'videos.id', '=', 'tags.video_id')->select('video_id', 'youtubeId', 'videos.user_id', 'url', 'title', 'thumbnail', 'duration', 'tags', 'start', 'end', 'videos.created_at', 'videos.updated_at')->union($tagResults)->orderBy('video_id', 'desc')->get();

        //タグを動画毎にまとめて非正規化
        $results = $this->denormalizeTable($videoResults);

        return view('home', compact('results'));
    }

    //タグを動画毎にまとめて非正規化するメソッド
    public function denormalizeTable($videosResult)
    {
        $index = 0;
        $videoArray = array();
        foreach ($videosResult as $key => $value) {
            if ($key == 0) {
                $videoArray[$index++] = [
                    'video_id'=>$value->video_id,
                    'youtubeId'=>$value->youtubeId,
                    'user_id'=>$value->user_id,
                    'url'=>$value->url,
                    'title'=>$value->title,
                    'thumbnail'=>$value->thumbnail,
                    'duration'=>$value->duration,
                    'tags'=>[$value->tags],
                    'start'=>$value->start,
                    'end'=>$value->end,
                    'created_at'=>$value->created_at,
                    'updated_at'=>$value->updated_at,
                ];
            } elseif ($value->title != $videosResult[$key-1]->title) {
                $videoArray[$index++] = [
                    'video_id'=>$value->video_id,
                    'youtubeId'=>$value->youtubeId,
                    'user_id'=>$value->user_id,
                    'url'=>$value->url,
                    'title'=>$value->title,
                    'thumbnail'=>$value->thumbnail,
                    'duration'=>$value->duration,
                    'tags'=>[$value->tags],
                    'start'=>$value->start,
                    'end'=>$value->end,
                    'created_at'=>$value->created_at,
                    'updated_at'=>$value->updated_at,
                ];
            } else {
                $videoArray[$index-1]['tags'][] = $value->tags;
            }
        }
        return $videoArray;
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
