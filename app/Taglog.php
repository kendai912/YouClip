<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\User;
use App\Tag;
use DateTimeInterface;

class Taglog extends Model
{
    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function tag()
    {
        return $this->belongsTo('App\Tag');
    }

    protected function serializeDate(DateTimeInterface $date)
    {
        return $date->format('Y-m-d H:i:s');
    }
}
