<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->text('description')->nullable();
            $table->string('builder_code')->nullable();
            $table->string('pronto_code')->nullable();
            $table->string('image')->nullable();
            $table->string('manufacturing_product_code')->nullable();
            $table->integer('builders_price')->nullable();
            $table->integer('sales_price')->nullable();
            $table->integer('discount')->nullable();
            $table->integer('symbol')->nullable();
            $table->integer('supplier_id')->nullable();
            $table->boolean('is_composite')->nullable();
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
        Schema::drop('products');
    }
}
