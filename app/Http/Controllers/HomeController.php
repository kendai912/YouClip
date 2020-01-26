<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Video;
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
        return view('home', compact('videos'));
    }
}
