<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\User;
use App\Video;
use App\Like;
use App\Playlist;
use App\Telop;
use App\Taglog;
use App\TagComment;
use DateTimeInterface;

class Tag extends Model
{
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

    public function playlists()
    {
        //Playlistモデルのデータを引っ張ってくる
        return $this->belongsToMany('App\Playlist')->withPivot('playlist_id', 'tag_id', 'scene_order')->orderBy('scene_order');
    }

    public function likes()
    {
        //Likeモデルのデータを引っ張ってくる
        return $this->hasMany('App\Like');
    }

    public function telops()
    {
        //Telopモデルのデータを引っ張ってくる
        return $this->hasMany('App\Telop');
    }

    public function taglogs()
    {
        //Taglogモデルのデータを引っ張ってくる
        return $this->hasMany('App\Taglog');
    }
    public function tag_comments()
    {
        return $this->hasMany('App\TagComment');
    }

    protected function serializeDate(DateTimeInterface $date)
    {
        return $date->format('Y-m-d H:i:s');
    }
}
