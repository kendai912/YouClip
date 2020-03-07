<?php

namespace App;

use App\Searchquerylog;

use Illuminate\Database\Eloquent\Model;

class SearchqueryUser extends Model
{
    public function searchquerylogs()
    {
        //Searchquerylogモデルのデータを引っ張ってくる
        return $this->hasMany('App\searchquerylog');
    }
}
