<?php

namespace App\Http\Controllers;

use App\Http\Requests\VideoStoreRequest;
use Illuminate\Http\Request;
use App\Video;
use App\User;

class VideoController extends Controller
{
    //登録画面
    public function create()
    {
        $user = auth()->user(); //アクセスしているユーザ情報を取得

        if ($user->can('create', Video::class)) {
            $user_id = $user->id;
            return view('video_create', compact('user_id'));
        } else {
            $message = '動画登録にはログインが必要です';
            return view('video_create', compact('message'));
        }
    }

    //表示画面
    public function show(Video $video)
    {
        return view('video_show', [
            'video' => $video
        ]);
    }

    //登録処理
    public function store(VideoStoreRequest $request)
    {
        //URLからYoutubeIDを取得
        preg_match('/(\?v=|youtu.be\/)(?<youtubeId>[^&]+)/', $request->url, $match);
        $youtubeId = $match['youtubeId'];

        // YouTubeAPIでタイトル・サムネイル・再生時間を取得
        $apikey = 'AIzaSyDwBA7llTxUe3ZP4fMV8whf8Hug3ND4HRU';
        $googleApiUrl = 'https://www.googleapis.com/youtube/v3/videos?id=' . $youtubeId . '&key=' . $apikey . '&part=snippet,contentDetails';
        
        $ch = curl_init();
        
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_URL, $googleApiUrl);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
        curl_setopt($ch, CURLOPT_VERBOSE, 0);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        $response = curl_exec($ch);
        curl_close($ch);
            
        $data = json_decode($response);
        $value = json_decode(json_encode($data), true);
            
        $title = $value['items'][0]['snippet']['title'];
        $thumbnail = $value['items'][0]['snippet']['thumbnails']['default']['url'];
        preg_match('/PT(?<minutes>\d*)M(?<seconds>\d*)S/', $value['items'][0]['contentDetails']['duration'], $matches);
        $duration = date('H:i:s', strtotime("00:".$matches['minutes'].":".$matches['seconds']));

        //DBに保存
        $videos = new Video;
        $videos->youtubeId = $youtubeId;
        $videos->user_id = $request->user_id;
        $videos->url = $request->url;
        $videos->title = $title;
        $videos->thumbnail = $thumbnail;
        $videos->duration = $duration;
        $videos->save();
    }
}
