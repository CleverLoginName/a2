<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProjectPlansTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('project_plans', function (Blueprint $table) {
            $table->increments('id');
            $table->string('design');
            $table->integer('level');
            $table->string('img');
            $table->string('img_300x200');
            $table->integer('catalog_id');
            $table->integer('project_id');
            $table->text('template_data');
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
        Schema::drop('project_plans');
    }
}
