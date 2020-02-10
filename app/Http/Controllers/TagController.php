<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Tag;

class TagController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
        //DBに保存
        $tag = new Tag;
        $tag->video_id = $request->video_id;
        $tag->user_id = $request->user_id;
        $tag->tags = $request->tags;
        $tag->start = "00:".$request->start;
        $tag->end = "00:".$request->end;
        $tag->save();

        //保存したタグデータをリターン
        return response()->json(
            [
                'data' => $tag
            ],
            200,
            [],
            JSON_UNESCAPED_UNICODE
        );
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
        $tag = Tag::find($request->id);
        $tag->tags = $request->tags;
        $tag->start = "00:".$request->start;
        $tag->end = "00:".$request->end;
        $tag->save();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @return \Illuminate\Http\Response
     */
    public function delete(Request $request)
    {
        //DBから削除
        $tag = Tag::find($request->id);
        $tag->delete();
    }

    public static function convertToSec($time)
    {
        return 3600 * intval(date("H", strtotime($time))) + 60 * intval(date("i", strtotime($time))) + intval(date("s", strtotime($time)));
    }
}
