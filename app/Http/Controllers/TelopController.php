<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use Auth;
use App\Video;
use App\Tag;
use App\Telop;
use App\User;
use Carbon\Carbon;

class TelopController extends Controller
{
    public function delete($telopId)
    {
        //削除するシーンタグを取得
        $telop = Telop::find($telopId);
        $telop->delete();

        return response(null, 204);
    }
}
