<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\User;

class LikesComment extends Model
{
    public $timestamps = false;
    public function user()
    {
        //Userモデルのデータを引っ張ってくる
        return $this->belongsTo('App\User');
    }
}
