<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Tag;
use App\User;

class Like extends Model
{
    /**
     * モデルと関連しているテーブル
     *
     * @var string
     */
    protected $table = 'likes_tags';

    public function tag()
    {
        //Tagモデルのデータを引っ張ってくる
        return $this->belongsTo('App\Tag');
    }

    public function user()
    {
        //Userモデルのデータを引っ張ってくる
        return $this->belongsTo('App\User');
    }
}
