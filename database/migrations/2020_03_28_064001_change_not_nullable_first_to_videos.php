<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ChangeNotNullableFirstToVideos extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('videos', function (Blueprint $table) {
            $table->string('title')->change();
            $table->string('thumbnail')->change();
            $table->time('duration')->change();
            // $table->string('category');
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
            $table->string('title')->nullable()>change();
            $table->string('thumbnail')->nullable()>change();
            $table->time('duration')->nullable()>change();
            $table->string('category')->nullable()>change();
        });
    }
}
