<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTemplateFloorCatalogDesignsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('template_floor_catalog_designs', function (Blueprint $table) {
            $table->increments('id');
            $table->text('canvas_data')->nullable();
            $table->string('name');
            $table->integer('template_floor_catalog_id');
            $table->boolean('is_active');
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
        Schema::drop('template_floor_catalog_designs');
    }
}
