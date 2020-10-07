<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Broadcast;

class GrabzitServiceProvider extends ServiceProvider
{
    /**
     * Indicates if loading of the provider is deferred.
     *
     * @var bool
     */
    protected $defer = true;

    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton('grabzit', function () {
            $grabzItApplicationKey = "ZTBiNDliYTMwMzMxNDZiOTkxZjIwNGZhMGI4ZjlkYzI=";
            $grabzItApplicationSecret = "P0IMPy99Pz9POCRLGyMzfD8/Pz8fPz8/Pz90Pz8PQmk=";

            return new \GrabzIt\GrabzItClient($grabzItApplicationKey, $grabzItApplicationSecret);
        });
    }

    /**
     * Get the services provided by the provider.
     *
     * @return array
     */
    public function provides()
    {
        return ['grabzit'];
    }
}
