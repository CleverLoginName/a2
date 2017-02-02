<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTemplatesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('templates', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('scale');
            $table->string('energy_rating');
            $table->integer('sqm_house');
            $table->integer('sqm_porch');
            $table->integer('sqm_garage');
            $table->integer('sqm_terrace');
            $table->integer('sqm_balcony');
            $table->integer('sqm_alfresco');
            $table->text('canvas_data');
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
        Schema::drop('templates');
    }
}
