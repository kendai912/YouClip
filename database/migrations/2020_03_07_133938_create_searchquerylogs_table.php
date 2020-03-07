<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSearchquerylogsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('searchquerylogs', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('searchquery_user_id')->unsigned();
            $table->timestamp('created_at');

            //外部キー制約
            $table->foreign('searchquery_user_id')->references('id')->on('searchquery_user')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('searchquerylogs');
    }
}
