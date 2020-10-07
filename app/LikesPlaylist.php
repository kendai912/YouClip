<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Playlist;
use App\User;

class LikesPlaylist extends Model
{
    public function playlist()
    {
        //Playlistモデルのデータを引っ張ってくる
        return $this->belongsTo('App\Playlist');
    }

    public function user()
    {
        //Userモデルのデータを引っ張ってくる
        return $this->belongsTo('App\User');
    }
}
