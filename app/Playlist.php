<?php

namespace App;

use App\User;
use App\Video;
use App\Tag;

use Illuminate\Database\Eloquent\Model;

class Playlist extends Model
{
    public function user()
    {
        //Userモデルのデータを引っ張ってくる
        return $this->belongsTo('App\User');
    }
    
    public function tags()
    {
        //Tagモデルのデータを引っ張ってくる
        return $this->belongsToMany('App\Tag')->withPivot('playlist_id', 'tag_id');
    }
}
