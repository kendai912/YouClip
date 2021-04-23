<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\User;
use DateTimeInterface;

class LikesComment extends Model
{
    public $timestamps = false;
    public function user()
    {
        //Userモデルのデータを引っ張ってくる
        return $this->belongsTo('App\User');
    }

    protected function serializeDate(DateTimeInterface $date)
    {
        return $date->format('Y-m-d H:i:s');
    }
}
