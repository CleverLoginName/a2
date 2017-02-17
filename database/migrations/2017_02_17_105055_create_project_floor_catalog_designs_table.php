<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProjectFloorCatalogDesignsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('project_floor_catalog_designs', function (Blueprint $table) {
            $table->increments('id');
            $table->text('canvas_data');
            $table->string('name');
            $table->integer('project_floor_catalog_id');
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
        Schema::drop('project_floor_catalog_designs');
    }
}
