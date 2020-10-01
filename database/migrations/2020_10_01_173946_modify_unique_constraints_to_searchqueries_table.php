<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ModifyUniqueConstraintsToSearchqueriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('searchqueries', function (Blueprint $table) {
            $table->unique(['searchQuery', 'searchOption']);
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
            $table->dropUnique(['searchQuery', 'searchOption']);
        });
    }
}
