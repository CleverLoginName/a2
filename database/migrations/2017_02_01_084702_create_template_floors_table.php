<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTemplateFloorsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('template_floors', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('template_image_id');
            $table->integer('floor_id');
            $table->text('canvas_data');
            $table->integer('template_id');
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
        Schema::drop('template_floors');
    }
}
