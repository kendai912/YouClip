<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\User;
use App\Tag;

class Video extends Model
{
    //
    public function user()
    {
        //Userモデルのデータを引っ張ってくる
        return $this->belongsTo('App\User');
    }
    
    public function tag()
    {
        //Tagモデルのデータを引っ張ってくる
        return $this->hasMany('App\Tag');
    }
}
