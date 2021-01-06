<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class DeleteSearchqueryUniqueConstraintsOfSearchqueriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('searchqueries', function (Blueprint $table) {
            $table->dropUnique(['searchQuery']);
            $table->dropUnique(['searchOption']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('searchqueries', function (Blueprint $table) {
            $table->unique(['searchQuery']);
            $table->unique(['searchOption']);
        });
    }
}
