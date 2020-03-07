<?php

namespace App;

use App\SearchqueryUser;

use Illuminate\Database\Eloquent\Model;

class Searchquerylog extends Model
{
    public function searchqueryuser()
    {
        //SearchqueryUserモデルのデータを引っ張ってくる
        return $this->belongsTo('App\SearchqueryUser');
    }
}
