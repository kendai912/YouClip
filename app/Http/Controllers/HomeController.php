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
        $videos = Video::where('user_id', Auth::user()->id)->orderBy('created_at', 'desc')->paginate(10);
        return view('home', compact('results'));
    }
    
    public function search($searchQuery)
    {
        //タグ名で検索ワードに一致するものを抽出
        $tagResults = Tag::where('tags', 'LIKE', "%$searchQuery%")->leftJoin('videos', 'videos.id', '=', 'tags.video_id')->select('video_id', 'youtubeId', 'videos.user_id', 'url', 'title', 'thumbnail', 'duration', 'tags', 'start', 'end', 'videos.created_at', 'videos.updated_at');
        
        //タイトルで検索ワードに一致するものを抽出し、完全外部結合
        $videoResults = Video::where('title', 'LIKE', "%$searchQuery%")->leftJoin('tags', 'videos.id', '=', 'tags.video_id')->select('video_id', 'youtubeId', 'videos.user_id', 'url', 'title', 'thumbnail', 'duration', 'tags', 'start', 'end', 'videos.created_at', 'videos.updated_at')->union($tagResults)->orderBy('video_id', 'desc')->get();

        $results = $this->denormalizeTable($videoResults);
        return view('home', compact('results'));
    }

    public function denormalizeTable($videosResult)
    {
        $index = 0;
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
}
