<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProjectCanvasDatasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('project_canvas_data', function (Blueprint $table) {
            $table->increments('id');
            $table->string('packs')->nullable();
            $table->string('bom_dict')->nullable();
            $table->string('bom_dict_std_inc')->nullable();
            $table->integer('project_id')->nullable();
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
        Schema::drop('project_canvas_data');
    }
}
