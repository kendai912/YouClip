<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePlaylistCommentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('playlist_comments', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('playlist_id')->unsigned();
            $table->string('content')->nullable();
            $table->integer('user_id')->unsigned();
            $table->integer('parent_id')->unsigned();
            $table->timestamp('created_at');

            $table->foreign('playlist_id')->references('id')->on('playlists')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('playlist_comments');
    }
}
