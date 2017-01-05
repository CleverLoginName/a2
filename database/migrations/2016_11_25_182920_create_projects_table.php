<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProjectsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->increments('id');
            $table->string('job');
            $table->integer('status_id');
            $table->integer('consultant_id');
            $table->integer('template_id');
            $table->integer('user_id_1');
            $table->integer('user_id_2');
            $table->integer('address_id');
            $table->float('energy_consumption');
            $table->float('budget')->nullable();
            $table->softDeletes();
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
        Schema::drop('projects');
    }
}
