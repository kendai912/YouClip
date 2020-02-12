<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\User;
use App\Video;
use App\Playlist;

class Tag extends Model
{
    public function users()
    {
        //Userモデルのデータを引っ張ってくる
        return $this->belongsTo('App\User');
    }

    public function videos()
    {
        //Videoモデルのデータを引っ張ってくる
        return $this->belongsTo('App\Video');
    }

    public function playlists()
    {
        //Videoモデルのデータを引っ張ってくる
        return $this->belongsToMany('App\Playlist')->withPivot('playlist_id', 'tag_id');
    }
}
