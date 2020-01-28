<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\User;
use App\Video;

class Tag extends Model
{
    //
    public function user()
    {
        //Userモデルのデータを引っ張ってくる
        return $this->belongsTo('App\User');
    }

    public function video()
    {
        //Videoモデルのデータを引っ張ってくる
        return $this->belongsTo('App\Video');
    }
}
