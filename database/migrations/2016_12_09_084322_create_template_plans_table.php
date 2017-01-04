<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTemplatePlansTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('template_plans', function (Blueprint $table) {
            $table->increments('id');
            $table->string('design');
            $table->integer('level');
            $table->string('img');
            $table->string('img_300x200');
            $table->string('client_file_name');
            $table->string('client_file_size');
            $table->integer('catalog_id');
            $table->integer('template_id');
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
        Schema::drop('template_plans');
    }
}
