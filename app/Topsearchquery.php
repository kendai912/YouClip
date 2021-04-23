<?php

namespace App;

use App\Searchquery;
use Illuminate\Database\Eloquent\Model;
use DateTimeInterface;

class Topsearchquery extends Model
{
    public function searchquery()
    {
        return $this->belongsTo('App\Searchquery');
    }

    protected function serializeDate(DateTimeInterface $date)
    {
        return $date->format('Y-m-d H:i:s');
    }
}
