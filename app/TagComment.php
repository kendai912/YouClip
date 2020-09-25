<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Tag;
use App\User;

class TagComment extends Model
{
    public $timestamps = false;
    public function tag()
    {
        //Playlistモデルのデータを引っ張ってくる
        return $this->belongsTo('App\Tag');
    }

    public function user()
    {
        //Userモデルのデータを引っ張ってくる
        return $this->belongsTo('App\User');
    }
}
