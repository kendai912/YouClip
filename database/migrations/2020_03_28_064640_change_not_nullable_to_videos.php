<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ChangeNotNullableToVideos extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('videos', function (Blueprint $table) {
            $table->string('title')->nullable(false)->change();
            $table->string('thumbnail')->nullable(false)->change();
            $table->time('duration')->nullable(false)->change();
            $table->string('category')->nullable(false)->change();
        });
    }
    
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('videos', function (Blueprint $table) {
            $table->string('title')->nullable()->change();
            $table->string('thumbnail')->nullable()->change();
            $table->time('duration')->nullable()->change();
            $table->string('category')->nullable()->change();
        });
    }
}
