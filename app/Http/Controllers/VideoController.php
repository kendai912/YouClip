<?php

namespace App\Http\Controllers;

use App\Http\Requests\VideoStoreRequest;
use Illuminate\Http\Request;
use Auth;
use App\Video;
use App\Tag;
use App\User;
use App\Playlist;
use App\Http\Controllers\TagController;

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
    public function show($video_id, $tag_id, $playlist_id)
    {
        //該当動画のタグが存在するか判定
        if (Tag::where('video_id', intval($video_id))->exists()) {
            //存在する場合、動画とタグ一覧をテーブルから取得
            $result = Video::where('videos.id', intval($video_id))->join('tags', 'videos.id', '=', 'tags.video_id')->select('videos.id as video_id', 'videos.youtubeId', 'videos.user_id', 'videos.url', 'videos.title', 'videos.thumbnail', 'videos.duration', 'videos.created_at as video_created_at', 'videos.updated_at as video_updated_at', 'tags.id as tag_id', 'tags.user_id as tag_user_id', 'tags', 'start', 'end', 'tags.created_at as tag_created_at', 'tags.updated_at as tag_updated_at')->get();
        } else {
            //存在しない場合、動画をテーブルから取得
            $result = Video::where('videos.id', intval($video_id))->select('videos.id as video_id', 'videos.youtubeId', 'videos.user_id', 'videos.url', 'videos.title', 'videos.thumbnail', 'videos.duration', 'videos.created_at as video_created_at', 'videos.updated_at as video_updated_at')->get();
        }
        
        //動画毎にタグをまとめて非正規化
        $video = Video::denormalizeVideoTagTable($result);

        if ($tag_id == "null") {
            $startSec = "";
            $endSec = "";
        } else {
            //該当タグをテーブルから取得
            $tag = Tag::where('id', intval($tag_id))->get();
       
            //YTplayerで再生するために開始時間と終了時間を秒数に変換
            $startSec = TagController::convertToSec($tag[0]->start);
            $endSec = TagController::convertToSec($tag[0]->end);
        }

        //ログインユーザーIDを取得
        $loginUserId = Auth::user()->id;

        //次に再生するタグのIDをplaylist_idより取得
        $videoIdArray = array();
        $tagIdArray = array();
        if ($playlist_id == "null") {
            $nextVideoId = "";
            $nextTagId = "";
        } else {
            foreach (Playlist::find($playlist_id)->tags as $index => $tag) {
                $tagIdArray[] = $tag->pivot->tag_id;
            }
            //次のタグIDをセット
            $key = array_search($tag_id, $tagIdArray);
            if (array_key_exists(++$key, $tagIdArray)) {
                $nextTagId = $tagIdArray[$key];

                //次に再生する動画のIDを$nextTagIdより取得
                $nextVideoId = Tag::find($nextTagId)->user_id;
            } else {
                $nextTagId = "";
                $nextVideoId = "";
            }
        }

        return view('video_show', [
            'video' => $video,
            'startSec' => $startSec,
            'endSec' => $endSec,
            'loginUserId' => $loginUserId,
            'nextVideoId' => $nextVideoId,
            'nextTagId' => $nextTagId,
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
