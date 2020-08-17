<?php

namespace App;

use App\Searchquery;

use Illuminate\Database\Eloquent\Model;

class Topsearchquery extends Model
{
    public function searchquery()
    {
        return $this->belongsTo('App\Searchquery');
    }
}
