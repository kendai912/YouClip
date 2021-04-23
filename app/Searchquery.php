<?php

namespace App;

use App\User;
use App\Topsearchquery;
use DateTimeInterface;

use Illuminate\Database\Eloquent\Model;

class Searchquery extends Model
{
    public function users()
    {
        //Userモデルのデータを引っ張ってくる
        return $this->belongsToMany('App\User')->using('App\SearchqueryUser');
    }

    public function topsearchquery()
    {
        return $this->hasOne('App\Topsearchquery');
    }

    protected function serializeDate(DateTimeInterface $date)
    {
        return $date->format('Y-m-d H:i:s');
    }
}
