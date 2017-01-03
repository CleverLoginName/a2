<?php

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use \App\User;
use Illuminate\Support\Facades\Hash;

class DummyDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $faker = Faker::create();
        if(\Illuminate\Support\Facades\App::environment('local'))
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        DB::table('permission_role')->truncate();
        DB::table('role_user')->truncate();
        DB::table('permissions')->truncate();
        DB::table('roles')->truncate();
        DB::table('users')->truncate();

        // Creating User Roles
        $sa = new \App\Role();
        $sa->name = "sa";
        $sa->display_name = "System Administrator";
        $sa->description = "System Administrator";
        $sa->save();

        $consultant = new \App\Role();
        $consultant->name = "consultant";
        $consultant->display_name = "Consultant";
        $consultant->description = "Consultant";
        $consultant->save();

        $consultant = new \App\Role();
        $consultant->name = "client";
        $consultant->display_name = "Client";
        $consultant->description = "Client";
        $consultant->save();
/*
        $msl = new \App\Role();
        $msl->name = "msl";
        $msl->display_name = "Master Software Licensee ( MSL )";
        $msl->description = "Master Software Licensee ( MSL )";
        $msl->save();

        $lm = new \App\Role();
        $lm->name = "lm";
        $lm->display_name = "Licensee's Merchant";
        $lm->description = "Licensee's Merchant";
        $lm->save();

        $ec = new \App\Role();
        $ec->name = "ec";
        $ec->display_name = "Licensee's End Customer";
        $ec->description = "Licensee's End Customer";
        $ec->save();
*/
        // Creating Application Permissions
        $new_projects = new \App\Permission();
        $new_projects->name = "create-projects";
        $new_projects->display_name = "create-projects";
        $new_projects->description = "create-projects";
        $new_projects->save();

        $new_products = new \App\Permission();
        $new_products->name = "create-products";
        $new_products->display_name = "create-products";
        $new_products->description = "create-products";
        $new_products->save();

        $new_plans = new \App\Permission();
        $new_plans->name = "create-plans";
        $new_plans->display_name = "create-plans";
        $new_plans->description = "create-plans";
        $new_plans->save();

        $new_plans = new \App\Permission();
        $new_plans->name = "create-catalogs";
        $new_plans->display_name = "create-catalogs";
        $new_plans->description = "create-catalogs";
        $new_plans->save();

        $new_plans = new \App\Permission();
        $new_plans->name = "create-categories";
        $new_plans->display_name = "create-categories";
        $new_plans->description = "create-categories";
        $new_plans->save();

        $new_plans = new \App\Permission();
        $new_plans->name = "create-schedules";
        $new_plans->display_name = "create-schedules";
        $new_plans->description = "create-schedules";
        $new_plans->save();


        // update permissions

        $update_projects = new \App\Permission();
        $update_projects->name = "update-projects";
        $update_projects->display_name = "update-projects";
        $update_projects->description = "update-projects";
        $update_projects->save();

        $update_products = new \App\Permission();
        $update_products->name = "update-products";
        $update_products->display_name = "update-products";
        $update_products->description = "update-products";
        $update_products->save();

        $update_plans = new \App\Permission();
        $update_plans->name = "update-plans";
        $update_plans->display_name = "update-plans";
        $update_plans->description = "update-plans";
        $update_plans->save();

        $update_plans = new \App\Permission();
        $update_plans->name = "update-catalogs";
        $update_plans->display_name = "update-catalogs";
        $update_plans->description = "update-catalogs";
        $update_plans->save();

        $update_plans = new \App\Permission();
        $update_plans->name = "update-categories";
        $update_plans->display_name = "update-categories";
        $update_plans->description = "update-categories";
        $update_plans->save();

        $update_plans = new \App\Permission();
        $update_plans->name = "update-schedules";
        $update_plans->display_name = "update-schedules";
        $update_plans->description = "update-schedules";
        $update_plans->save();

        // Delete permissions

        $delete_projects = new \App\Permission();
        $delete_projects->name = "delete-projects";
        $delete_projects->display_name = "delete-projects";
        $delete_projects->description = "delete-projects";
        $delete_projects->save();

        $delete_products = new \App\Permission();
        $delete_products->name = "delete-products";
        $delete_products->display_name = "delete-products";
        $delete_products->description = "delete-products";
        $delete_products->save();

        $delete_plans = new \App\Permission();
        $delete_plans->name = "delete-plans";
        $delete_plans->display_name = "delete-plans";
        $delete_plans->description = "delete-plans";
        $delete_plans->save();

        $delete_plans = new \App\Permission();
        $delete_plans->name = "delete-catalogs";
        $delete_plans->display_name = "delete-catalogs";
        $delete_plans->description = "delete-catalogs";
        $delete_plans->save();

        $delete_plans = new \App\Permission();
        $delete_plans->name = "delete-categories";
        $delete_plans->display_name = "delete-categories";
        $delete_plans->description = "delete-categories";
        $delete_plans->save();

        $delete_plans = new \App\Permission();
        $delete_plans->name = "delete-schedules";
        $delete_plans->display_name = "delete-schedules";
        $delete_plans->description = "delete-schedules";
        $delete_plans->save();

        // View permissions

        $view_projects = new \App\Permission();
        $view_projects->name = "view-projects";
        $view_projects->display_name = "view-projects";
        $view_projects->description = "view-projects";
        $view_projects->save();

        $view_products = new \App\Permission();
        $view_products->name = "view-products";
        $view_products->display_name = "view-products";
        $view_products->description = "view-products";
        $view_products->save();

        $view_plans = new \App\Permission();
        $view_plans->name = "view-plans";
        $view_plans->display_name = "view-plans";
        $view_plans->description = "view-plans";
        $view_plans->save();

        $view_plans = new \App\Permission();
        $view_plans->name = "view-catalogs";
        $view_plans->display_name = "view-catalogs";
        $view_plans->description = "view-catalogs";
        $view_plans->save();

        $view_plans = new \App\Permission();
        $view_plans->name = "view-categories";
        $view_plans->display_name = "view-categories";
        $view_plans->description = "view-categories";
        $view_plans->save();

        $view_plans = new \App\Permission();
        $view_plans->name = "view-schedules";
        $view_plans->display_name = "view-schedules";
        $view_plans->description = "view-schedules";
        $view_plans->save();


        DB::table('permission_role')->insert(
            [['permission_id' => 1,'role_id' => 1],
            ['permission_id' => 2,'role_id' => 1],
            ['permission_id' => 3,'role_id' => 1],
            ['permission_id' => 4,'role_id' => 1],
            ['permission_id' => 5,'role_id' => 1],
            ['permission_id' => 6,'role_id' => 1],
            ['permission_id' => 7,'role_id' => 1],
            ['permission_id' => 8,'role_id' => 1],
            ['permission_id' => 9,'role_id' => 1],
            ['permission_id' => 10,'role_id' => 1],
            ['permission_id' => 11,'role_id' => 1],
            ['permission_id' => 12,'role_id' => 1],
            ['permission_id' => 13,'role_id' => 1],
            ['permission_id' => 14,'role_id' => 1],
            ['permission_id' => 15,'role_id' => 1],
            ['permission_id' => 16,'role_id' => 1],
            ['permission_id' => 17,'role_id' => 1],
            ['permission_id' => 18,'role_id' => 1],
            ['permission_id' => 19,'role_id' => 1],
            ['permission_id' => 20,'role_id' => 1],
            ['permission_id' => 21,'role_id' => 1],
            ['permission_id' => 22,'role_id' => 1],
            ['permission_id' => 23,'role_id' => 1],
            ['permission_id' => 24,'role_id' => 1],
            ['permission_id' => 25,'role_id' => 1],
            ['permission_id' => 26,'role_id' => 1]]
        );

        $user = new User();
        $user->first_name = "Seebo" ;
        $user->last_name = "Administrator";
        $user->email = "admin@seebo.com.au";
        $user->mobile = "1231231231";
        $user->password = Hash::make('123');
        $user->is_enabled = true;
        $user->created_by = 1;
        $user->profile_pic = '/resources/images/default.png';
        $user->save();

        $user = new User();
        $user->first_name = "Seebo" ;
        $user->last_name = "Consultant";
        $user->email = "con@seebo.com.au";
        $user->mobile = "1231231231";
        $user->password = Hash::make('123');
        $user->is_enabled = true;
        $user->created_by = 1;
        $user->profile_pic = '/resources/images/default.png';
        $user->save();



        DB::table('role_user')->insert([
            'user_id' => 1,
            'role_id' => 1
        ]);
        DB::table('role_user')->insert([
            'user_id' => 2,
            'role_id' => 2
        ]);

        if(\Illuminate\Support\Facades\App::environment('local'))
            DB::statement('SET FOREIGN_KEY_CHECKS=1;');


        /*********************************Products**********************************************************/

        DB::table('catalogs')->insert(['name' => 'Electrical','description' => 'Electrical description']);
        DB::table('catalogs')->insert(['name' => 'Home Automation','description' => 'Home Automation description']);
        DB::table('catalogs')->insert(['name' => 'Interior Design','description' => 'Interior Design description']);
        DB::table('catalogs')->insert(['name' => 'Fittings and Fixtures','description' => 'Fittings and Fixtures description']);


        DB::table('categories')->insert(['name' => 'Interior Light','description' => 'Electrical description','catalog_id' => 1,'colour' => '#FF9900','type' => 1]);
        DB::table('categories')->insert(['name' => 'Exterior Lights','description' => 'Electrical description','catalog_id' => 1,'colour' => '#ffc000','type' => 1]);
        DB::table('categories')->insert(['name' => 'Other Power','description' => 'Electrical description','catalog_id' => 1,'colour' => '#008080','type' => 1]);
        DB::table('categories')->insert(['name' => 'Light Switch','description' => 'Electrical description','catalog_id' => 1,'colour' => '#ff3300','type' => 2]);
        DB::table('categories')->insert(['name' => 'Dimmer Switch','description' => 'Electrical description','catalog_id' => 1,'colour' => '#ff99ff','type' => 2]);
        DB::table('categories')->insert(['name' => 'Meter Box','description' => 'Electrical description','catalog_id' => 1,'colour' => '#66ff99','type' => 3]);
        DB::table('categories')->insert(['name' => 'Junction Box','description' => 'Electrical description','catalog_id' => 1,'colour' => '#e3de00','type' => 3]);
        DB::table('categories')->insert(['name' => 'Timer Switch','description' => 'Electrical description','catalog_id' => 1,'colour' => '#1e219e','type' => 3]);
        DB::table('categories')->insert(['name' => 'Door Chime/Intercom','description' => 'Electrical description','catalog_id' => 1,'colour' => '#ff00ff','type' => 3]);
        DB::table('categories')->insert(['name' => 'Data (RJ45)','description' => 'Electrical description','catalog_id' => 1,'colour' => '#0066ff','type' => 3]);
        DB::table('categories')->insert(['name' => 'Telephone Point (RJ25)','description' => 'Electrical description','catalog_id' => 1,'colour' => '#ffff00','type' => 3]);
        DB::table('categories')->insert(['name' => 'Television Point (PAL/F)','description' => 'Electrical description','catalog_id' => 1,'colour' => '#9900cc','type' => 3]);
        DB::table('categories')->insert(['name' => 'Smoke Detector','description'  => 'Electrical description','catalog_id' => 1,'colour' => '#33ccff','type' => 3]);
        DB::table('categories')->insert(['name' => 'Ceiling Fan' ,'description' => 'Electrical description','catalog_id' => 1,'colour' => '#71c993','type' => 3]);
        DB::table('categories')->insert(['name' => 'Exhaust Fan','description'  => 'Electrical description','catalog_id' => 1,'colour' => '#dd5959','type' => 3]);
        DB::table('categories')->insert(['name' => 'Security Equipment','description'  => 'Electrical description','catalog_id' => 1,'colour' => '#646e66','type' => 3]);
        DB::table('categories')->insert(['name' => 'Heating' ,'description' => 'Electrical description','catalog_id' => 1,'colour' => '#000000','type' => 3]);
        DB::table('categories')->insert(['name' => 'Automation','description'  => 'Electrical description','catalog_id' => 1,'colour' => '#002060','type' => 3]);
        DB::table('categories')->insert(['name' => 'Audio/Visual','description'  => 'Electrical description','catalog_id' => 1,'colour' => '#00A59D','type' => 3]);
        DB::table('categories')->insert(['name' => 'Power Point','description'  => 'Electrical description','catalog_id' => 1,'colour' => '#960000','type' => 3]);

        DB::table('sub_categories')->insert(['name' => 'INCANDESCENT' ,'description' => 'INCANDESCENT description','category_id' => 1]);
        DB::table('sub_categories')->insert(['name' => 'FLUORESCENT' ,'description' => 'FLUORESCENT description','category_id' => 1]);
        DB::table('sub_categories')->insert(['name' => 'HIGH-INTENSITY DISCHARGE' ,'description' => 'HIGH-INTENSITY DISCHARGE description','category_id' => 1]);
        DB::table('sub_categories')->insert(['name' => 'LED','description'  => 'LED description','category_id' => 1]);



        for ($i=1;$i<=100;$i++){
            $is_composite = $faker->boolean(50);
            DB::table('products')->insert([
                'name' => $faker->sentence(2),
                'description' =>$faker->sentence(6),
                'builder_code' => $faker->text(10),
                'pronto_code' => $faker->text(10),
                'manufacturing_product_code' => $faker->text(10),
                'image' => $faker->imageUrl(640,480,null,true,null),
                'builders_price' => $faker->numberBetween(0,10000),
                'discount' => $faker->numberBetween(0,100),
                'symbol' => $faker->numberBetween(0,250),
                'sales_price' => $faker->numberBetween(0,10000),
                'is_composite' => $is_composite,
                'supplier_id'=>$faker->numberBetween(1,10)
            ]);


            if($is_composite){
                for ($j=1;$j<=5;$j++) {
                    DB::table('composite_product_maps')->insert([
                        'parent' => $i,
                        'child' => $faker->numberBetween(1, 20)
                    ]);
                }
            }

            DB::table('sub_category_products')->insert(['sub_category_id' => 4 ,'product_id' => $i]);
        }

        /***************************************************************************************************/


    }
}
