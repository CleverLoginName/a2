<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateImportRawProductDatasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('import_raw_product_datas', function (Blueprint $table) {
            $table->increments('id');
            $table->string('catalog')->nullable();
            $table->string('category')->nullable();
            $table->string('sub_category')->nullable();
            $table->string('name')->nullable();
            $table->string('description')->nullable();
            $table->string('type')->nullable();/***/
            $table->string('builder_code')->nullable();
            $table->string('supplier_code')->nullable();
            $table->string('contractor_code')->nullable();
            $table->string('supplier_name')->nullable();/*****/
            $table->string('contractor_name')->nullable();/*****/
            $table->string('builder_price')->nullable();
            $table->string('supplier_price')->nullable();
            $table->string('contractor_price')->nullable();
            $table->string('image')->nullable();
            $table->string('icon')->nullable();
            $table->string('watts')->nullable();
            $table->string('lumen')->nullable();
            $table->string('style')->nullable();
            $table->string('colour')->nullable();
            $table->string('discount')->nullable();
            $table->string('width')->nullable();
            $table->string('height')->nullable();
            $table->string('depth')->nullable();
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
        Schema::drop('import_raw_product_datas');
    }
}
