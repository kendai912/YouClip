<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Video;
use App\Tag;
use App\User;
use App\Playlist;

use Carbon\Carbon;

use DB;

class IndexController extends Controller
{
    // Twitter
    // Twitterbot/1.0
    private $twitterBot;
    // Facebook
    // facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)
    private $facebookBot;

    public function __construct()
    {
        $this->facebookBot = 'facebookexternalhit';
        $this->twitterBot = 'Twitterbot/1.0';
    }

    public function index()
    {
        if (isset($_SERVER["HTTP_USER_AGENT"])) {
            $user_agent = $_SERVER['HTTP_USER_AGENT'];
            preg_match('/Twitterbot/', $user_agent, $twitterMatch);
            preg_match('/facebookexternalhit/', $user_agent, $fbLineMatch);

            if ($twitterMatch || $fbLineMatch) {
                // 正規表現でurlを判定判定
                preg_match('/^\/watch\?playlist=(?<playlistId>\d+)/', $_SERVER["REQUEST_URI"], $match);
                if ($match) {
                    $playlistId = $match['playlistId'];
                    $tagId = DB::table('playlist_tag')->where('playlist_id', $playlistId)->select('tag_id')->orderBy('scene_order', 'ASC')->first()->tag_id;
                    
                    // get parameter contents by playlistId
                    $site_name = "YouClip";
                    $url = "https://youclip.jp" . $_SERVER["REQUEST_URI"];
                    $title = Playlist::find($playlistId)->playlistName;
                    $description = Playlist::find($playlistId)->description;
                    if ($description == "" || $description == null) {
                        $description = "YouTube動画をまとめてみました";
                    }
                    $image_url = "https://youclip-storage.s3-ap-northeast-1.amazonaws.com/thumbs/" . Tag::find($tagId)->preview;
                    
                    return view('ogp')->with('site_name', $site_name)->with('url', $url)->with('title', $title)->with('description', $description)->with('image_url', $image_url)->with('fb_app_id', env('FACEBOOK_ID'));
                }
            }
        }
        return view('index');
    }
}
