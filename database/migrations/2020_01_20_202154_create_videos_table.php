<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateVideosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('videos', function (Blueprint $table) {
            $table->increments('id');
            $table->string('youtubeId')->unique()->nullable();
            $table->integer('user_id');
            // $table->string('url');
            $table->string('title')->nullable();
            $table->string('channel_title')->nullable();
            $table->string('thumbnail')->nullable();
            $table->time('duration')->nullable();
            $table->string('category')->nullable();
            $table->string('view_count')->nullable();
            $table->string('published_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('videos');
    }
}
