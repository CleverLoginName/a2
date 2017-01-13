<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class ResetProducts extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'advanced:reset-products';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Remove all the Products from DB';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
       // DB::table('product_catalogs')->truncate();
       // DB::table('product_categories')->truncate();
        //DB::table('product_category_types')->truncate();
       // DB::table('product_sub_categories')->truncate();
        DB::table('products')->truncate();
        DB::table('product_sub_category_maps')->truncate();
        DB::table('product_composite_maps')->truncate();
        DB::table('product_custom_datas')->truncate();
    }
}
