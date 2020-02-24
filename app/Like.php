<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Tag;

class Like extends Model
{
    public function tag()
    {
        //Tagモデルのデータを引っ張ってくる
        return $this->belongsTo('App\Tag');
    }
}