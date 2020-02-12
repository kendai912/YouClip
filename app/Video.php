<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\User;
use App\Tag;

class Video extends Model
{
    //
    public function users()
    {
        //Userモデルのデータを引っ張ってくる
        return $this->belongsTo('App\User');
    }
    
    public function tags()
    {
        //Tagモデルのデータを引っ張ってくる
        return $this->hasMany('App\Tag');
    }

    //タグを動画毎にまとめて非正規化するメソッド
    public static function denormalizeVideoTagTable($videosResult)
    {
        $index = 0;
        $videoArray = array();
        foreach ($videosResult as $key => $value) {
            //タグの指定がある場合
            if ($key == 0) {
                $videoArray[$index++] = [
                        'video_id'=>$value->video_id,
                        'youtubeId'=>$value->youtubeId,
                        'user_id'=>$value->user_id,
                        'url'=>$value->url,
                        'title'=>$value->title,
                        'thumbnail'=>$value->thumbnail,
                        'duration'=>$value->duration,
                        'tags'=>[
                                [
                                'tag_id'=> $value->tag_id,
                                'video_id'=> $value->video_id,
                                'user_id'=> $value->tag_user_id,
                                'tagName' => $value->tags,
                                'start' => $value->start,
                                'end' => $value->end,
                                'created_at' => $value->tag_created_at,
                                'updated_at' => $value->tag_updated_at,
                                ],
                            ],
                        'created_at'=>$value->video_created_at,
                        'updated_at'=>$value->video_updated_at,
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
                        'tags'=>[
                                [
                                'tag_id'=> $value->tag_id,
                                'video_id'=> $value->video_id,
                                'user_id'=> $value->tag_user_id,
                                'tagName' => $value->tags,
                                'start' => $value->start,
                                'end' => $value->end,
                                'created_at' => $value->tag_created_at,
                                'updated_at' => $value->tag_updated_at,
                                ],
                            ],
                        'created_at'=>$value->video_created_at,
                        'updated_at'=>$value->video_updated_at,
                    ];
            } else {
                $videoArray[$index-1]['tags'][] = [
                            'tag_id'=> $value->tag_id,
                            'video_id'=> $value->video_id,
                            'user_id'=> $value->tag_user_id,
                            'tagName' => $value->tags,
                            'start' => $value->start,
                            'end' => $value->end,
                            'created_at' => $value->tag_created_at,
                            'updated_at' => $value->tag_updated_at,
                    ];
            }
        }
        return $videoArray;
    }
}
