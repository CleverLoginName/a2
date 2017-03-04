<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProjectFloorsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('project_floors', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('project_image_id');
            $table->integer('floor_id');
            $table->text('canvas_data')->nullable();
            $table->text('printable_image_path');
            $table->integer('project_id');
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
        Schema::drop('project_floors');
    }
}
