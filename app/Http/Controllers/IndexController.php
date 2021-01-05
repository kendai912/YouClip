<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

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
        $this->facebookBot = "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)";
        ;
        $this->twitterBot = 'Twitterbot/1.0';
    }

    public function index()
    {
        if (isset($_SERVER["HTTP_USER_AGENT"])) {
            $user_agent = $_SERVER['HTTP_USER_AGENT'];
            if ($user_agent == $this->twitterBot || $user_agent == $this->facebookBot) {
                // 正規表現でurlを判定判定
                preg_match('/(ja|en|cn|es)\/sample\/(.*?)\/(\d*)/', $_SERVER["REQUEST_URI"], $matches, PREG_OFFSET_CAPTURE);
                if ($matches) {
                    $site_name = "YouClip";
                    $image_url = "https://youclip-storage.s3-ap-northeast-1.amazonaws.com/thumbs/3lHThMaOW7I-3-697415540.webp";
                    $description = "OGPのテストです";
                    $url = "https://youclip.jp";
                    $title = "OGPテスト";

                    return view('ogp')->with('site_name', $site_name)
                                 ->with('image_url', $image_url)
                                 ->with('description', $description)
                                 ->with('url', $url)
                                 ->with('title', $title);
                }
            }
        }
        return view('index');
    }
}
