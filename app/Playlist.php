<?php

namespace App;

use App\User;
use App\Video;
use App\Tag;
use App\Playlistlog;
use App\PlaylistComment;

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
        return $this->belongsToMany('App\Tag')->withPivot('playlist_id', 'tag_id', 'scene_order')->orderBy('scene_order');
    }
    public function playlistlogs()
    {
        //Playlistlogモデルのデータを引っ張ってくる
        return $this->hasMany('App\Playlistlog');
    }

    public function likesPlaylist()
    {
        //LikesPlaylistモデルのデータを引っ張ってくる
        return $this->hasMany('App\LikesPlaylist');
    }

    public function playlist_comments()
    {
        return $this->hasMany('App\PlaylistComment');
    }
}
