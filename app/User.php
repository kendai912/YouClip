<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use App\Video;
use App\Tag;
use App\Playlist;
use App\Searchquery;
use App\Playlistlog;
use App\Taglog;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    public function videos()
    {
        //Videoモデルのデータを引っ張ってくる
        return $this->hasMany('App\Video');
    }

    public function tags()
    {
        //Tagモデルのデータを引っ張ってくる
        return $this->hasMany('App\Tag');
    }

    public function playlists()
    {
        //Playlistモデルのデータを引っ張ってくる
        return $this->hasMany('App\Playlist');
    }

    public function searchqueries()
    {
        //Searchqueryモデルのデータを引っ張ってくる
        return $this->belongsToMany('App\Searchquery')->using('App\SearchqueryUser');
    }

    public function playlistlogs()
    {
        //Taglogモデルのデータを引っ張ってくる
        return $this->hasMany('App\Playlistlog');
    }

    public function taglogs()
    {
        //Taglogモデルのデータを引っ張ってくる
        return $this->hasMany('App\Taglog');
    }
}
