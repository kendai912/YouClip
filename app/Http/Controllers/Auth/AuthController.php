<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Auth;
use Socialite;
use App\User;
use Illuminate\Support\Facades\Storage;

class AuthController extends Controller
{
    public function redirectToProvider($provider)
    {
        return Socialite::driver($provider)->redirect();
    }

    //ソーシャル認証後の処理(セッションにデータを預けたり)
    public function handleProviderCallback($provider)
    {
        $user = Socialite::driver($provider)->user();
        $authUser = $this->findOrCreateUser($user, $provider);
        Auth::login($authUser, true);   //Auth にソーシャル情報を預けてログイン
        return redirect()->intended('/home');   //認証後に表示したいページを指定
    }

    //ユーザー追加&ユーザーデータ取得
    public function findOrCreateUser($user, $provider)
    {
        $authUser = User::where('provider_id', $user->id)->first();
        if ($authUser) {
            return $authUser;
        }

        $avatarFileName = $user->id . "-avatar" . "-" . rand() . ".jpg";
        try {
            Storage::disk('s3')->putFileAs('avatars', $user->getAvatar(), $avatarFileName, 'public');
        } catch (\Exception $e) {
            \Log::debug($e->getMessage());
            $avatarFileName = "";
        }
        
        return User::create([
            'name' => $user->name,
            'email' => $user->email,
            'provider' => $provider,
            'provider_id' => $user->id,
            'avatar' => $avatarFileName
        ]);
    }
}
