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
use DB;
use FFMpeg;
use FFMpeg\Format\ProgressListener\AbstractProgressListener;
use ProtoneMedia\LaravelFFMpeg\FFMpeg\ProgressListenerDecorator;
use YouTube\YouTubeDownloader;

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
        $tagAndVideoData = Tag::join('videos', 'videos.id', '=', 'tags.video_id')->select('videos.id as video_id', 'youtubeId', 'videos.user_id as video_user_id', 'title', 'thumbnail', 'duration', 'category', 'channel_title', 'published_at','view_count', 'videos.created_at as video_created_at', 'videos.updated_at as video_updated_at', 'tags.id as tag_id', 'tags.user_id as tag_user_id', 'tags', 'start', 'end', 'preview', 'previewgif', 'tags.created_at as tag_created_at', 'tags.updated_at as tag_updated_at')->where('tags.id', $tagId)->get();

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
            $myCreatedAndLikedTagVideo = Tag::whereIn('tags.id', $likesIds)->orWhere('tags.user_id', Auth::user()->id)->leftJoin('videos', 'videos.id', '=', 'tags.video_id')->select('videos.id as video_id', 'youtubeId', 'videos.user_id', 'title', 'thumbnail', 'duration', 'channel_title', 'published_at','view_count', 'videos.created_at as video_created_at', 'videos.updated_at as video_updated_at', 'tags.id as tag_id', 'tags', 'start', 'end', 'preview', 'previewgif', 'tags.created_at as tag_created_at', 'tags.updated_at as tag_updated_at')->orderBy('tag_created_at', 'desc')->get();

            // $myCreatedAndLikedTagVideo = Video::with(array('tags' => function($query) {
            //     $likes = Like::where('user_id', Auth::user()->id)->get();
            //     $likesIds = [];
            //     foreach ($likes as $like) {
            //         $likesIds[] = $like->tag_id;
            //     }
            //     $query->select('tags.id as tag_id', 'tags', 'start', 'end', 'preview', 'previewgif', 'tags.created_at as tag_created_at', 'tags.updated_at as tag_updated_at')->whereIn('tags.id', $likesIds)->orWhere('tags.user_id', Auth::user()->id)->orderBy('tag_created_at', 'desc')->get();
            // }))->select('videos.id as video_id', 'youtubeId', 'videos.user_id', 'title', 'thumbnail', 'duration', 'videos.created_at as video_created_at', 'videos.updated_at as video_updated_at')->orderBy('video_created_at', 'desc')->get();

            // $query = DB::getQueryLog();
            // print_r($query);
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
                $tag->playlists()->attach(
                    ['playlist_id' => $playlistId],
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
    public function store(Request $request)
    {
        //新規の場合、最初に動画をDBに保存
        if (Auth::user()) {
            if (Video::where('youtubeId', $request->youtubeId)->exists()) {
                //既存の場合、テーブルからVideoオブジェクトを取得
                $video = Video::where('youtubeId', $request->youtubeId)->first();
                $video->view_count = $request->newVideoData['view_count'];
                $video->save();
            } else {
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

            //タグの配列をスペース区切りの文字列に変換
            $tags = implode(" ", $request->tags);

            //プレビュー用のgifを取得しファイル名を変数に格納
            $previewGifFileName = $this->getPreviewFile($request);

            $start = $request->start;

            //タグをDBに保存
            $tag = new Tag;
            $tag->video_id = $video->id;
            $tag->user_id = Auth::user()->id;
            $tag->tags = $tags;
            $tag->start = "00:".$request->start;
            $tag->end = "00:".$request->end;
            $tag->preview = $video->thumbnail;
            $tag->previewgif = $previewGifFileName;
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
    // public function getVideoInfo($youtubeId){ 
    //     return file_get_contents("https://www.youtube.com/get_video_info?video_id=".$youtubeId."&cpn=CouQulsSRICzWn5E&eurl&el=adunit");
    // }
    // public function getVideoDownloadLink($youtubeId){ 
    //     //parse the string separated by '&' to array 
    //     parse_str($this->getVideoInfo($youtubeId), $data); 
    //     $videoData = json_decode($data['player_response'], true); 
    //     $videoDetails = $videoData['videoDetails']; 
    //     $streamingData = $videoData['streamingData']; 
    //     $streamingDataFormats = $streamingData['formats']; 
          
    //     //set video title 
    //     $this->video_title = $videoDetails["title"]; 
          
    //     //Get the youtube root link that contains video information 
    //     $final_stream_map_arr = array(); 
          
    //     //Create array containing the detail of video  
    //     foreach($streamingDataFormats as $stream){ 
    //         $stream_data = $stream; 
    //         $stream_data["title"] = $this->video_title; 
    //         $stream_data["mime"] = $stream_data["mimeType"]; 
    //         $mime_type = explode(";", $stream_data["mime"]); 
    //         $stream_data["mime"] = $mime_type[0]; 
    //         $start = stripos($mime_type[0], "/"); 
    //         $format = ltrim(substr($mime_type[0], $start), "/"); 
    //         $stream_data["format"] = $format; 
    //         unset($stream_data["mimeType"]); 
    //         $final_stream_map_arr [] = $stream_data;          
    //     } 
    //     return $final_stream_map_arr; 
    // } 
       
    function getYoutubeDirectLinkMp4($url){
        // $youtube = "https://maadhav-ytdl.herokuapp.com/video_info.php?url=".$url;

        // $curl = curl_init($youtube);
        // curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        // $return = curl_exec($curl);
        // curl_close($curl);
        // $links = json_decode($return, true);
        $yt = new YouTubeDownloader();
        $links = $yt->getDownloadLinks($url);

        // var_dump($links);
        $key = array_search('136', array_column($links['links'], 'itag'));
        $yturl = $links['links'][$key]['url'];
        return $yturl;
    }

    public function getPreviewFile($request)
    {
        $ytDirectUrl = $this->getYoutubeDirectLinkMp4("https://www.youtube.com/watch?v=" . $request->youtubeId);
        // $ytDirectUrl = "https://r3---sn-p5qs7nee.googlevideo.com/videoplayback?expire=1598750209&ei=oalKX96GDbO0hwa7uozABw&ip=54.85.38.58&id=o-AMmIxwxWPNeYEFFe8GJxBmHPiTGbaOVnP9Y_YrRc5RK6&itag=136&aitags=133%2C134%2C135%2C136%2C137%2C160%2C242%2C243%2C244%2C247%2C248%2C271%2C278%2C313&source=youtube&requiressl=yes&mh=R0&mm=31%2C26&mn=sn-p5qs7nee%2Csn-vgqsener&ms=au%2Conr&mv=u&mvi=3&pl=19&vprv=1&mime=video%2Fmp4&gir=yes&clen=19295743&dur=270.403&lmt=1577976841824023&mt=1598728020&fvip=3&keepalive=yes&c=WEB&txp=5532432&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cgir%2Cclen%2Cdur%2Clmt&sig=AOq0QJ8wRAIgc7wx0CQs_Rnr6cnF8q00ppk38pvODZBAcAHFcF4VCBUCIBsEHk-AdD0A_NvwQjK8VicnHFzfvLkFOe-vrt1berkY&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl&lsig=AG3C_xAwRQIhAK_iAxxuI7-dL5HsHXtwfg7g8meFTdkDFVi7eHaFBicVAiBBwoiC6DqTNrYwYDDvEXNrr5vEIyUE7AXxokoUDuLe2w%3D%3D";
        $startSec = $this->convertToSec("00:".$request->start);
        $duration = 3;
        $endSec = $startSec + $duration;
        $previewMp4Name = $request->youtubeId . "-" . $startSec . "-" . rand() . ".mp4";
        $dl_cmd = 'ffmpeg  -ss '.$startSec.' -to '.$endSec.' -i "'.$ytDirectUrl.'" -c copy '.storage_path()."/app/public/img/".$previewMp4Name.' 2>&1';
        // echo $dl_cmd; exit;
        // var_dump($output);
        return $previewMp4Name;
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
            unlink(storage_path(). "/app/public/img/" . $tag->previewgif);

            //更新したpreview用のgifを再取得
            $previewGifFileName = $this->getPreviewFile($request);
            $tag->previewgif = $previewGifFileName;
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
        //削除するシーンタグを取得
        $tag = Tag::find($request->tagId);
        //preview用gifを削除
        // unlink(storage_path(). "/app/public/img/" . $tag->preview);
        unlink(storage_path(). "/app/public/img/" . $tag->previewgif);
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
}
