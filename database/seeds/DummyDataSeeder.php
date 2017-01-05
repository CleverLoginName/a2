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
        $new_plans->name = "create-product_catalogs";
        $new_plans->display_name = "create-product_catalogs";
        $new_plans->description = "create-product_catalogs";
        $new_plans->save();

        $new_plans = new \App\Permission();
        $new_plans->name = "create-product_categories";
        $new_plans->display_name = "create-product_categories";
        $new_plans->description = "create-product_categories";
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
        $update_plans->name = "update-product_catalogs";
        $update_plans->display_name = "update-product_catalogs";
        $update_plans->description = "update-product_catalogs";
        $update_plans->save();

        $update_plans = new \App\Permission();
        $update_plans->name = "update-product_categories";
        $update_plans->display_name = "update-product_categories";
        $update_plans->description = "update-product_categories";
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
        $delete_plans->name = "delete-product_catalogs";
        $delete_plans->display_name = "delete-product_catalogs";
        $delete_plans->description = "delete-product_catalogs";
        $delete_plans->save();

        $delete_plans = new \App\Permission();
        $delete_plans->name = "delete-product_categories";
        $delete_plans->display_name = "delete-product_categories";
        $delete_plans->description = "delete-product_categories";
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
        $view_plans->name = "view-product_catalogs";
        $view_plans->display_name = "view-product_catalogs";
        $view_plans->description = "view-product_catalogs";
        $view_plans->save();

        $view_plans = new \App\Permission();
        $view_plans->name = "view-product_categories";
        $view_plans->display_name = "view-product_categories";
        $view_plans->description = "view-product_categories";
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

        DB::table('product_catalogs')->insert(['name' => 'Electrical','description' => 'Electrical description']);
        DB::table('product_catalogs')->insert(['name' => 'Home Automation','description' => 'Home Automation description']);
        DB::table('product_catalogs')->insert(['name' => 'Interior Design','description' => 'Interior Design description']);
        DB::table('product_catalogs')->insert(['name' => 'Fittings and Fixtures','description' => 'Fittings and Fixtures description']);


        DB::table('product_categories')->insert(['name' => 'Interior Light','description' => 'Electrical description','catalog_id' => 1,'colour' => '#FF9900','type' => 1]);
        DB::table('product_categories')->insert(['name' => 'Exterior Lights','description' => 'Electrical description','catalog_id' => 1,'colour' => '#ffc000','type' => 1]);
        DB::table('product_categories')->insert(['name' => 'Other Power','description' => 'Electrical description','catalog_id' => 1,'colour' => '#008080','type' => 1]);
        DB::table('product_categories')->insert(['name' => 'Light Switch','description' => 'Electrical description','catalog_id' => 1,'colour' => '#ff3300','type' => 2]);
        DB::table('product_categories')->insert(['name' => 'Dimmer Switch','description' => 'Electrical description','catalog_id' => 1,'colour' => '#ff99ff','type' => 2]);
        DB::table('product_categories')->insert(['name' => 'Meter Box','description' => 'Electrical description','catalog_id' => 1,'colour' => '#66ff99','type' => 3]);
        DB::table('product_categories')->insert(['name' => 'Junction Box','description' => 'Electrical description','catalog_id' => 1,'colour' => '#e3de00','type' => 3]);
        DB::table('product_categories')->insert(['name' => 'Timer Switch','description' => 'Electrical description','catalog_id' => 1,'colour' => '#1e219e','type' => 3]);
        DB::table('product_categories')->insert(['name' => 'Door Chime/Intercom','description' => 'Electrical description','catalog_id' => 1,'colour' => '#ff00ff','type' => 3]);
        DB::table('product_categories')->insert(['name' => 'Data (RJ45)','description' => 'Electrical description','catalog_id' => 1,'colour' => '#0066ff','type' => 3]);
        DB::table('product_categories')->insert(['name' => 'Telephone Point (RJ25)','description' => 'Electrical description','catalog_id' => 1,'colour' => '#ffff00','type' => 3]);
        DB::table('product_categories')->insert(['name' => 'Television Point (PAL/F)','description' => 'Electrical description','catalog_id' => 1,'colour' => '#9900cc','type' => 3]);
        DB::table('product_categories')->insert(['name' => 'Smoke Detector','description'  => 'Electrical description','catalog_id' => 1,'colour' => '#33ccff','type' => 3]);
        DB::table('product_categories')->insert(['name' => 'Ceiling Fan' ,'description' => 'Electrical description','catalog_id' => 1,'colour' => '#71c993','type' => 3]);
        DB::table('product_categories')->insert(['name' => 'Exhaust Fan','description'  => 'Electrical description','catalog_id' => 1,'colour' => '#dd5959','type' => 3]);
        DB::table('product_categories')->insert(['name' => 'Security Equipment','description'  => 'Electrical description','catalog_id' => 1,'colour' => '#646e66','type' => 3]);
        DB::table('product_categories')->insert(['name' => 'Heating' ,'description' => 'Electrical description','catalog_id' => 1,'colour' => '#000000','type' => 3]);
        DB::table('product_categories')->insert(['name' => 'Automation','description'  => 'Electrical description','catalog_id' => 1,'colour' => '#002060','type' => 3]);
        DB::table('product_categories')->insert(['name' => 'Audio/Visual','description'  => 'Electrical description','catalog_id' => 1,'colour' => '#00A59D','type' => 3]);
        DB::table('product_categories')->insert(['name' => 'Power Point','description'  => 'Electrical description','catalog_id' => 1,'colour' => '#960000','type' => 3]);

        DB::table('product_sub_categories')->insert(['name' => 'INCANDESCENT' ,'description' => 'INCANDESCENT description','category_id' => 1,'is_pack' => false]);
        DB::table('product_sub_categories')->insert(['name' => 'FLUORESCENT' ,'description' => 'FLUORESCENT description','category_id' => 1,'is_pack' => false]);
        DB::table('product_sub_categories')->insert(['name' => 'HIGH-INTENSITY DISCHARGE' ,'description' => 'HIGH-INTENSITY DISCHARGE description','category_id' => 1,'is_pack' => false]);
        DB::table('product_sub_categories')->insert(['name' => 'LED','description'  => 'LED description','category_id' => 1,'is_pack' => false]);
        DB::table('product_sub_categories')->insert(['name' => 'INDOOR-SWTCH','description' =>'Indoor Switch','category_id' => 4,'is_pack' => false]);



        for ($i=1;$i<=10;$i++){

        if($faker->boolean(50)){
            $category_id = 1;
        }else{
            $category_id = 4;
        }
            $id = DB::table('product_sub_categories')->insertGetId([
                'name' => 'Pack '.$i ,
                'description' => 'Pack description'.$i,
                'category_id' => $category_id,
                'is_pack' => true,
                'builder_price' => $faker->numberBetween(100,1000),
                'supplier_price' => $faker->numberBetween(100,1000),
                'contractor_price' => $faker->numberBetween(100,1000)
            ]);

            for ($j=1;$j<=10;$j++) {
                DB::table('product_sub_category_maps')
                    ->insert(['sub_category_id' => $id, 'product_id' => $j]);
            }
        }



        for ($i=1;$i<=250;$i++){
            $is_composite = $faker->boolean(50);
            DB::table('products')->insert([
                'name' => $faker->sentence(2),
                'description' =>$faker->sentence(6),
                'builder_code' => $faker->text(10),
                'pronto_code' => $faker->text(10),
                'manufacturing_product_code' => $faker->text(10),
                'image' => $faker->imageUrl(640,480,null,true,null),
                'builder_price' => $faker->numberBetween(0,10000),
                'contractor_price' => $faker->numberBetween(0,10000),
                'supplier_price' => $faker->numberBetween(0,10000),
                'discount' => $faker->numberBetween(0,100),
                'icon' => $faker->numberBetween(0,250),
                'is_composite' => $is_composite,
                'supplier_id'=>$faker->numberBetween(1,10)
            ]);


            if($is_composite){
                for ($j=1;$j<=5;$j++) {
                    DB::table('product_composite_maps')->insert([
                        'parent' => $i,
                        'child' => $faker->numberBetween(1, 20)
                    ]);
                }
            }
            if($faker->boolean(50)){
                DB::table('product_sub_category_maps')->insert(['sub_category_id' => 4 ,'product_id' => $i]);
            }else{
                DB::table('product_sub_category_maps')->insert(['sub_category_id' => 5 ,'product_id' => $i]);
            }


        }

        /***************************************************************************************************/

        /******************************Product Custom Fields ***********************************************/
        DB::table('custom_field_types')->insert([
            ['name' => 'text'],
            ['name' => 'textarea']
        ]);

        DB::table('product_custom_fields')->insert([
            ['name' => 'Energy Consumption (W)','custom_field_type_id' => 1,'is_mandatory' => true,'product_sub_category_id' => 4],
            ['name' => 'Width','custom_field_type_id' => 1,'is_mandatory' => true,'product_sub_category_id' => 4],
            ['name' => 'Height','custom_field_type_id' => 1,'is_mandatory' => true,'product_sub_category_id' => 4],
            ['name' => 'Depth','custom_field_type_id' => 1,'is_mandatory' => true,'product_sub_category_id' => 4],
        ]);

        /***************************************************************************************************/
        /**********************************Product Icons****************************************************/
        DB::table('product_icons')->insert(['path' =>'/img/icons/AMP.png', 'name' =>'AMP','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/AUT-001.png', 'name' =>'AUT-001','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/AUT-002.png', 'name' =>'AUT-002','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/AUT-003.png', 'name' =>'AUT-003','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/AUT-004.png', 'name' =>'AUT-004','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/AUT-005.png', 'name' =>'AUT-005','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/AUT-006.png', 'name' =>'AUT-006','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/AUT-007.png', 'name' =>'AUT-007','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/AUT-008.png', 'name' =>'AUT-008','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/AUT-009.png', 'name' =>'AUT-009','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/AUT-010.png', 'name' =>'AUT-010','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/AUT-011.png', 'name' =>'AUT-011','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/AUT-012.png', 'name' =>'AUT-012','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/AUT-031.png', 'name' =>'AUT-031','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/AUT-032.png', 'name' =>'AUT-032','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/AUT-033.png', 'name' =>'AUT-033','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/AUT-034.png', 'name' =>'AUT-034','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/AUT-036.png', 'name' =>'AUT-036','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/AUT-037.png', 'name' =>'AUT-037','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/AUT-038.png', 'name' =>'AUT-038','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/AUT-039.png', 'name' =>'AUT-039','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/AVC-001.png', 'name' =>'AVC-001','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/AVC-002.png', 'name' =>'AVC-002','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/AVC-005.png', 'name' =>'AVC-005','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/AVC-006.png', 'name' =>'AVC-006','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/AVC-010.png', 'name' =>'AVC-010','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/AVC-011.png', 'name' =>'AVC-011','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/AVC-012.png', 'name' =>'AVC-012','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/AVC-013.png', 'name' =>'AVC-013','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/AVC-014.png', 'name' =>'AVC-014','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/AVC-015.png', 'name' =>'AVC-015','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/AVC-016.png', 'name' =>'AVC-016','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/AVC-017.png', 'name' =>'AVC-017','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/AVC-018.png', 'name' =>'AVC-018','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/C-BUS---DIM.png', 'name' =>'C-BUS---DIM','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/CCTV-005.png', 'name' =>'CCTV-005','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/CCTV-006.png', 'name' =>'CCTV-006','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/CCTV-007.png', 'name' =>'CCTV-007','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/CCTV-008.png', 'name' =>'CCTV-008','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/CCTV-009.png', 'name' =>'CCTV-009','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/CCTV-010.png', 'name' =>'CCTV-010','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/CCTV-011.png', 'name' =>'CCTV-011','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/CCTV-012.png', 'name' =>'CCTV-012','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/CCTV-013.png', 'name' =>'CCTV-013','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/CCTV-014.png', 'name' =>'CCTV-014','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/CCTV-015.png', 'name' =>'CCTV-015','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/CCTV-017.png', 'name' =>'CCTV-017','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/CCTV-018.png', 'name' =>'CCTV-018','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/CCTV-019.png', 'name' =>'CCTV-019','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/CCTV-020.png', 'name' =>'CCTV-020','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/CCTV-021.png', 'name' =>'CCTV-021','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/COAX.png', 'name' =>'COAX','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/DATA.png', 'name' =>'DATA','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/DOOR_STATION.png', 'name' =>'DOOR_STATION','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/DOUBLE_PPA.png', 'name' =>'DOUBLE_PPA','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/DOUBLE_PP.png', 'name' =>'DOUBLE_PP','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/EXTERNAL_SIREN.png', 'name' =>'EXTERNAL_SIREN','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/FIB-001.png', 'name' =>'FIB-001','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/FIB-002.png', 'name' =>'FIB-002','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/FIB-003.png', 'name' =>'FIB-003','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/FIB-005.png', 'name' =>'FIB-005','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/FIB-006.png', 'name' =>'FIB-006','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/FIB-007.png', 'name' =>'FIB-007','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/FIB-008.png', 'name' =>'FIB-008','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/FIB-009.png', 'name' =>'FIB-009','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/FIB-010.png', 'name' =>'FIB-010','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/FIB-011.png', 'name' =>'FIB-011','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/FIB-012.png', 'name' =>'FIB-012','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/FIB-013.png', 'name' =>'FIB-013','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/GPIO.png', 'name' =>'GPIO','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/HDMI_EXTENDER.png', 'name' =>'HDMI_EXTENDER','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/HDMI-RX.png', 'name' =>'HDMI-RX','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/HN-001.png', 'name' =>'HN-001','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/HN-002.png', 'name' =>'HN-002','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/HN-003.png', 'name' =>'HN-003','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/HN-004.png', 'name' =>'HN-004','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/HN-005.png', 'name' =>'HN-005','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/HN-006.png', 'name' =>'HN-006','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/HN-007.png', 'name' =>'HN-007','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/HN-008.png', 'name' =>'HN-008','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/HN-009.png', 'name' =>'HN-009','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/HN-010.png', 'name' =>'HN-010','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/HN-012.png', 'name' =>'HN-012','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/HN-013.png', 'name' =>'HN-013','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/HN-014.png', 'name' =>'HN-014','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/HN-015.png', 'name' =>'HN-015','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/HN-016.png', 'name' =>'HN-016','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/HN-017.png', 'name' =>'HN-017','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/HN-018.png', 'name' =>'HN-018','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/HN-019.png', 'name' =>'HN-019','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/HN-020.png', 'name' =>'HN-020','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/HN-021.png', 'name' =>'HN-021','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/HN-022.png', 'name' =>'HN-022','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/HN-023.png', 'name' =>'HN-023','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/HN-024.png', 'name' =>'HN-024','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/HN-025-ZB.png', 'name' =>'HN-025-ZB','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/HN-025-ZW.png', 'name' =>'HN-025-ZW','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/HN-026-EB.png', 'name' =>'HN-026-EB','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/HN-026-OM.png', 'name' =>'HN-026-OM','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/HN-026-PW.png', 'name' =>'HN-026-PW','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/HN-027-HB.png', 'name' =>'HN-027-HB','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/HN-027-HS.png', 'name' =>'HN-027-HS','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/HN-028.png', 'name' =>'HN-028','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/HN-029.png', 'name' =>'HN-029','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/HN-030.png', 'name' =>'HN-030','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/HN-031.png', 'name' =>'HN-031','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/HTP-001.png', 'name' =>'HTP-001','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/HTP-002.png', 'name' =>'HTP-002','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/HTP-003.png', 'name' =>'HTP-003','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/HTP-004.png', 'name' =>'HTP-004','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/HTP-005.png', 'name' =>'HTP-005','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/HTP-006.png', 'name' =>'HTP-006','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/HTP-010.png', 'name' =>'HTP-010','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/INT-001.png', 'name' =>'INT-001','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/INT-002.png', 'name' =>'INT-002','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/INT-005-BK.png', 'name' =>'INT-005-BK','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/INT-005.png', 'name' =>'INT-005','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/INT-005-WH.png', 'name' =>'INT-005-WH','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/INT-006-BK.png', 'name' =>'INT-006-BK','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/INT-006.png', 'name' =>'INT-006','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/INT-006-WH.png', 'name' =>'INT-006-WH','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/INT-007.png', 'name' =>'INT-007','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/INT-008.png', 'name' =>'INT-008','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/INT-011.png', 'name' =>'INT-011','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/INTERCOM_PREWIRE.png', 'name' =>'INTERCOM_PREWIRE','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/INTERNAL_SIREN.png', 'name' =>'INTERNAL_SIREN','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/IR_EMITTER.png', 'name' =>'IR_EMITTER','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/KEY_PAD.png', 'name' =>'KEY_PAD','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/MRD-001.png', 'name' =>'MRD-001','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/MRD-002.png', 'name' =>'MRD-002','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/MRD-003.png', 'name' =>'MRD-003','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/MRD-004.png', 'name' =>'MRD-004','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/MRD-005.png', 'name' =>'MRD-005','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/MRD-006.png', 'name' =>'MRD-006','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/MRD-007.png', 'name' =>'MRD-007','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/MRD-008.png', 'name' =>'MRD-008','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/MRD-009.png', 'name' =>'MRD-009','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/MRD-010.png', 'name' =>'MRD-010','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/MRD-011.png', 'name' =>'MRD-011','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/MRD-012.png', 'name' =>'MRD-012','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/MRD-013.png', 'name' =>'MRD-013','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/MRD-014.png', 'name' =>'MRD-014','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/MRD-015.png', 'name' =>'MRD-015','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/MRD-016.png', 'name' =>'MRD-016','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/MRD-017.png', 'name' =>'MRD-017','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/MRD-018.png', 'name' =>'MRD-018','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/MRD-019.png', 'name' =>'MRD-019','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/MRD-020.png', 'name' =>'MRD-020','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/MRD-021.png', 'name' =>'MRD-021','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/MRD-022.png', 'name' =>'MRD-022','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/MRD-023.png', 'name' =>'MRD-023','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/MRD-024.png', 'name' =>'MRD-024','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/MRMS-001-BK.png', 'name' =>'MRMS-001-BK','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/MRMS-001.png', 'name' =>'MRMS-001','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/MRMS-001-WH.png', 'name' =>'MRMS-001-WH','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/MRMS-002-BK.png', 'name' =>'MRMS-002-BK','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/MRMS-002.png', 'name' =>'MRMS-002','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/MRMS-002-WH.png', 'name' =>'MRMS-002-WH','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/MRMS-003-BK.png', 'name' =>'MRMS-003-BK','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/MRMS-003.png', 'name' =>'MRMS-003','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/MRMS-003-WH.png', 'name' =>'MRMS-003-WH','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/MRMS-004.png', 'name' =>'MRMS-004','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/MRMS-005.png', 'name' =>'MRMS-005','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/MRMS-006.png', 'name' =>'MRMS-006','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/MRMS-007.png', 'name' =>'MRMS-007','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/MRMS-008.png', 'name' =>'MRMS-008','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/MRMS-009.png', 'name' =>'MRMS-009','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/MRMS-010.png', 'name' =>'MRMS-010','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/MRMS-011.png', 'name' =>'MRMS-011','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/MRMS-012.png', 'name' =>'MRMS-012','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/MRMS-013.png', 'name' =>'MRMS-013','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/MRMS-014.png', 'name' =>'MRMS-014','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/MRMS-015.png', 'name' =>'MRMS-015','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/MRMS-016.png', 'name' =>'MRMS-016','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/MRMS-017.png', 'name' =>'MRMS-017','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/MRMS-018.png', 'name' =>'MRMS-018','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/MRMS-019.png', 'name' =>'MRMS-019','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/MRMS-020.png', 'name' =>'MRMS-020','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/NBN_PP.png', 'name' =>'NBN_PP','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/PANIC_BUTTON.png', 'name' =>'PANIC_BUTTON','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/PAY_TV_POINT.png', 'name' =>'PAY_TV_POINT','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/PHONE.png', 'name' =>'PHONE','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/PRO-011.png', 'name' =>'PRO-011','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/PRO-012.png', 'name' =>'PRO-012','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/PRO-021.png', 'name' =>'PRO-013','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/PRO-022.png', 'name' =>'PRO-014','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/PRO-023.png', 'name' =>'PRO-015','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/PRO-024.png', 'name' =>'PRO-016','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/REED_SWITCH.png', 'name' =>'REED_SWITCH','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/RELAY.png', 'name' =>'RELAY','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/RS232.png', 'name' =>'RS232','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/SAE-001.png', 'name' =>'SAE-001','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/SAE-002.png', 'name' =>'SAE-002','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/SAE-003.png', 'name' =>'SAE-003','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/SAE-004.png', 'name' =>'SAE-004','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/SAE-005.png', 'name' =>'SAE-005','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/SAE-006.png', 'name' =>'SAE-006','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/SAE-007.png', 'name' =>'SAE-007','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/SAE-008.png', 'name' =>'SAE-008','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/SAE-009.png', 'name' =>'SAE-009','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/SAE-010.png', 'name' =>'SAE-010','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/SAE-011.png', 'name' =>'SAE-011','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/SAE-012.png', 'name' =>'SAE-012','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/SAE-013.png', 'name' =>'SAE-013','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/SAE-014.png', 'name' =>'SAE-014','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/SAE-020.png', 'name' =>'SAE-020','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/SAE-021.png', 'name' =>'SAE-021','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/SAE-022.png', 'name' =>'SAE-022','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/SAE-023.png', 'name' =>'SAE-023','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/SAE-024.png', 'name' =>'SAE-024','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/SAE-028.png', 'name' =>'SAE-028','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/SAE-032.png', 'name' =>'SAE-032','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/SAE-033.png', 'name' =>'SAE-033','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/SAE-041.png', 'name' =>'SAE-041','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/SAE-051.png', 'name' =>'SAE-051','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/SAE-052.png', 'name' =>'SAE-052','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/SAE-053.png', 'name' =>'SAE-053','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/SAE-054.png', 'name' =>'SAE-054','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/SAE-055.png', 'name' =>'SAE-055','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/SAE-071.png', 'name' =>'SAE-071','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/SAE-072.png', 'name' =>'SAE-072','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/SAE-073.png', 'name' =>'SAE-073','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/SAE-074.png', 'name' =>'SAE-074','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/SAE-075.png', 'name' =>'SAE-075','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/SAE-076.png', 'name' =>'SAE-076','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/SAE-077.png', 'name' =>'SAE-077','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/SAE-078.png', 'name' =>'SAE-078','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/SAE-079.png', 'name' =>'SAE-079','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/SAE-080.png', 'name' =>'SAE-080','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/SAE-081.png', 'name' =>'SAE-081','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/SAE-082.png', 'name' =>'SAE-082','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/SAE-083.png', 'name' =>'SAE-083','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/SAE-084.png', 'name' =>'SAE-084','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/SAE-085.png', 'name' =>'SAE-085','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/SAE-086.png', 'name' =>'SAE-086','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/SAE-087.png', 'name' =>'SAE-087','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/SAE-088.png', 'name' =>'SAE-088','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/SAE-089.png', 'name' =>'SAE-089','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/SAE-090.png', 'name' =>'SAE-090','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/SAE-091.png', 'name' =>'SAE-091','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/SAE-092.png', 'name' =>'SAE-092','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/SAE-093.png', 'name' =>'SAE-093','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/SAE-094.png', 'name' =>'SAE-094','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/SAE-095-ZB.png', 'name' =>'SAE-095-ZB','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/SAE-095-ZW.png', 'name' =>'SAE-095-ZW','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/SAE-096-EB.png', 'name' =>'SAE-096-EB','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/SAE-096-OM.png', 'name' =>'SAE-096-OM','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/SAE-096-PW.png', 'name' =>'SAE-096-PW','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/SAE-097-HB.png', 'name' =>'SAE-097-HB','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/SAE-097-HS.png', 'name' =>'SAE-097-HS','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/SAE-099.png', 'name' =>'SAE-099','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/SAE-100.png', 'name' =>'SAE-100','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/SENSOR.png', 'name' =>'SENSOR','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/SMART_WIRED.png', 'name' =>'SMART_WIRED','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/SMOKE_DETECTOR.png', 'name' =>'SMOKE_DETECTOR','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/SPEAKER.png', 'name' =>'SPEAKER','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/SPEAKER_PREWIRE.png', 'name' =>'SPEAKER_PREWIRE','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/STAR-001.png', 'name' =>'STAR-001','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/STAR-002.png', 'name' =>'STAR-002','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/STAR-003.png', 'name' =>'STAR-003','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/STAR-004.png', 'name' =>'STAR-004','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/STAR-005.png', 'name' =>'STAR-005','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/STAR-006.png', 'name' =>'STAR-006','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/STAR-007.png', 'name' =>'STAR-007','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/STAR-008.png', 'name' =>'STAR-008','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/STAR-009.png', 'name' =>'STAR-009','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/STAR-010.png', 'name' =>'STAR-010','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/SUBWOOFER.png', 'name' =>'SUBWOOFER','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/TRIM.png', 'name' =>'TRIM','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/TUX.png', 'name' =>'TUX','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/TV_POINT.png', 'name' =>'TV_POINT','category_id'=>1]);
        DB::table('product_icons')->insert(['path' =>'/img/icons/WSC_PP.png', 'name' =>'WSC_PP','category_id'=>1]);

        /***************************************************************************************************/



        DB::table('product_category_types')->insert(['name' =>'Lights']);
        DB::table('product_category_types')->insert(['name' =>'Switches']);
        DB::table('product_category_types')->insert(['name' =>'Power Points']);
        DB::table('product_category_types')->insert(['name' =>'Data Points']);
        DB::table('product_category_types')->insert(['name' =>'AV Points']);
        DB::table('product_category_types')->insert(['name' =>' Heating Panel']);

        for ($i=1;$i<=10;$i++){
            $id = DB::table('product_suppliers')->insertGetId(['name' => 'Supplier Name '.$i]);
        }

    }
}
