<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTopsearchqueriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('topsearchqueries', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('searchquery_id')->unsigned();
            $table->integer('user_id_count')->unsigned();
            $table->timestamps();

            //外部キー制約
            $table->foreign('searchquery_id')->references('id')->on('searchqueries')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('topsearchqueries');
    }
}
