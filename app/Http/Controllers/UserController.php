<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use Auth;
use App\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\File;

class UserController extends Controller
{
    public function updateUserProfile(Request $request)
    {
        if (isset($request->file) && $request->file != "null") {
            // get avatar file and its name
            $newAvatar = $request->file;
            $ext = pathinfo($newAvatar->getClientOriginalName(), PATHINFO_EXTENSION);
            $avatarFileName = "avatar" . "-" . rand() . "." . $ext;

            // resize and temporarily save in local
            $newAvatar = \Image::make($newAvatar);
            $newAvatar->widen(100, function ($constraint) {
                $constraint->upsize();
            })->save(storage_path()."/app/public/imgs/".$avatarFileName);

            // save in s3
            Storage::disk('s3')->putFileAs('avatars', new File(storage_path()."/app/public/imgs/".$avatarFileName), $avatarFileName, 'public');

            // delete local temp file
            unlink(storage_path(). "/app/public/imgs/" . $avatarFileName);
        }

        // update user table
        $user = User::find(Auth::user()->id);
        $user->name = $request->newUserName;
        if (isset($avatarFileName)) {
            $user->avatar = $avatarFileName;
        }
        $user->save();

        

        return response()->json(
            [],
            200,
            [],
            JSON_UNESCAPED_UNICODE
        );
    }
}
