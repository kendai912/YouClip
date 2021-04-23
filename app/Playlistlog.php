<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\User;
use App\Playlist;
use DateTimeInterface;

class Playlistlog extends Model
{
    public $timestamps = false;

    // public function user()
    // {
    //     return $this->belongsTo('App\User');
    // }

    public function playlist()
    {
        return $this->belongsTo('App\Playlist');
    }

    protected function serializeDate(DateTimeInterface $date)
    {
        return $date->format('Y-m-d H:i:s');
    }
}
