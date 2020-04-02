<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\User;
use App\Playlist;

class Playlistlog extends Model
{
    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function playlist()
    {
        return $this->belongsTo('App\Playlist');
    }
}
