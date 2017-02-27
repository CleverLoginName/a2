<?php


Route::get('rest/api/products', 'TempController@products');
Route::get('rest/api/canvas/{id}', 'TempController@loadOne');
Route::post('rest/api/canvas', 'TempController@save');
Route::get('mailsend', 'MailTestController@mailsend');
Route::get('logs', '\Rap2hpoutre\LaravelLogViewer\LogViewerController@index');

Route::auth();

Route::group(['middleware' => ['auth']], function () {
    Route::get('/', function () {
        return view('dashboards.index');
    });

    /******************* Auth *********************************************************************/

    Route::get('/users/permissions', 'UsersController@rolesNPermissions');
    Route::post('/users/permissions', 'UsersController@updateRolesNPermissions');
    Route::get('/users/roles', 'UsersController@rolesNUsers');
    Route::post('/users/roles', 'UsersController@updateRolesNUsers');
    Route::resource('users', 'UsersController');
    Route::get('users/{id}/delete', 'UsersController@destroy');

    Route::get('/profile', 'UsersController@viewProfile');
    Route::get('/profile/edit', 'UsersController@editProfile');

    /**********************************************************************************************/

    Route::get('/dashboard', 'DashboardsController@index');


    /******************* Products  ****************************************************************/

    Route::group(['prefix' => 'products'], function () {

        Route::post('composite-products/selected', 'CompositeProductsController@updateDragndrop');
        Route::post('composite-products/remove', 'CompositeProductsController@removeDragndrop');
        Route::post('packs/selected', 'PacksController@updateDragndrop');
        Route::post('packs/remove', 'PacksController@removeDragndrop');
        Route::post('single-products/edit', 'SingleProductsController@update');
        Route::post('composite-products/edit', 'CompositeProductsController@update');
        Route::post('packs/edit', 'PacksController@update');

        Route::get('composite-products/done', 'CompositeProductsController@done');
        Route::get('packs/done', 'PacksController@done');
        Route::get('packs/edit/done', 'PacksController@editDone');
        Route::get('composite-products/edit/done', 'CompositeProductsController@editDone');
        Route::get('packs/edit/done', 'PacksController@editDone');
        Route::resource('/', 'ProductsController');
        Route::resource('/all', 'ProductsController@allData');
        Route::get('single-products/{id}/delete', 'SingleProductsController@destroy');
        Route::resource('single-products', 'SingleProductsController');
        Route::get('composite-products/{id}/delete', 'CompositeProductsController@destroy');
        Route::resource('composite-products', 'CompositeProductsController');
        Route::get('packs/{id}/delete', 'PacksController@destroy');
        Route::resource('packs', 'PacksController');
    });

    Route::post('ajax/catalogs', 'ProductCatalogsController@ajaxStore');
    Route::post('/ajax/categories', 'ProductCategoriesController@ajaxStore');
    Route::post('/ajax/sub-categories', 'ProductSubCategoriesController@ajaxStore');

    Route::get('categories-by-catalog', 'ProductCategoriesController@categoriesByCatalogId');
    Route::get('/subcategories-by-category', 'ProductSubCategoriesController@subCategoriesByCategoryId');
    Route::get('/fields-by-subcategory', 'ProductCustomFieldsController@fieldsBySubCategoryId');
    

    /**********************************************************************************************/


    Route::resource('templates', 'TemplatesController');
    Route::get('templates/{id}/delete', 'TemplatesController@destroy');
    Route::post('templates/create/{template}/plan-image', 'TemplatesController@addTemplatePlansImage');
    Route::post('templates/create/{template}/plan-data', 'TemplatesController@addTemplatePlansData');
    Route::get('templates/create/{template}/add-plans', 'TemplatesController@addPlan');
    Route::get('templates/create/{template}/add-plans/{id}/canvas', 'TemplatesController@editPlanInCanvas');
    Route::get('templates/create/{template}/add-plans/{id}/delete', 'TemplatesController@deletePlanInCanvas');
    Route::post('templates/create/{template}/add-plans/{id}/canvas/templates/updates', 'TemplatesController@updatePlanDataInCanvas');
    Route::get('templates/create/{template}/add-plans/{id}/canvas/templates/load-latest', 'TemplatesController@loadPlanDataInCanvas');

    Route::post('templates/create/{template}/add-plans/{id}/crop', 'TemplatesController@cropPlanImage');
    Route::post('projects/create/{project}/add-plans/{id}/crop', 'ProjectsController@cropPlanImage');


    Route::resource('projects', 'ProjectsController');
    Route::get('projects/{id}/delete', 'ProjectsController@destroy');
    Route::get('projects/create/{project}/add-plans/{id}/delete', 'ProjectsController@deletePlanInCanvas');
    Route::post('projects/create/{project}/plan-image', 'ProjectsController@addProjectPlansImage');
    Route::post('projects/create/{project}/plan-data', 'ProjectsController@addProjectPlansData');
    Route::get('projects/create/{project}/add-plans', 'ProjectsController@addplan');
    Route::post('projects/{id}/edit', 'ProjectsController@update');

    Route::get('canvas/templates/load-latest', 'ProjectsController@showPlanInCanvas');
    Route::get('projects/{project}/plans/{id}/canvas', 'ProjectsController@editPlanInCanvas');
    Route::post('projects/{id}/plans/{plan_id}/canvas/projects/updates', 'ProjectsController@updatePlanDataInCanvas');
    Route::get('projects/{id}/plans/{plan_id}/canvas/projects/load-latest', 'ProjectsController@loadPlanDataInCanvas');
});

Route::get('export/excel-format/products','ExcelFormatExportsController@productsExport');


Route::post('advanced/data-import/raw','ImportRawProductDataController@productImport');
Route::get('advanced/data-import/merge-data','ImportRawProductDataController@mergeData');

Route::group(['prefix' => 'advanced'], function () {
    Route::group(['prefix' => 'custom-fields'], function () {

        Route::get('/','CustomFieldsController@index');
        Route::get('/products','CustomFieldsController@productsCustomFields');

    });

    Route::group(['prefix' => 'data-import'], function () {

        Route::get('/','ImportController@index');
        Route::get('/products','ImportProductsController@index');
        Route::get('/products/export','ImportProductsController@productExport');
        Route::post('/products','ImportProductsController@productImport');



    });
    Route::group(['prefix' => 'manage'], function () {

//        Route::get('/','ImportController@index');
//        Route::get('/products','ImportProductsController@index');
//        Route::get('/products/export','ImportProductsController@productExport');
//        Route::post('/products','ImportProductsController@productImport');

    });
    Route::group(['prefix' => 'reset'], function () {

//        Route::get('/','ImportController@index');
//        Route::get('/products','ImportProductsController@index');
//        Route::get('/products/export','ImportProductsController@productExport');
//        Route::post('/products','ImportProductsController@productImport');

    });

    Route::get('/reset-products', function () {
        Artisan::call('advanced:reset-products');
        return Redirect::to('/advanced/data-import/products');
    });


});

Route::get('/print0', 'PrintController@test');
Route::get('/a3', 'PrintController@a3');
Route::get('/print1', 'PrintController@test1');
Route::get('/print2', 'PrintController@test2');
Route::get('/print-a3/{project_id}', 'PrintController@downloadA3');
Route::get('/print-a4/{project_id}', 'PrintController@downloadA4');
Route::group(['prefix' => 'print'], function () {
    Route::group(['prefix' => 'headers'], function () {
        Route::get('/a3', 'PrintController@a3header');
    });
    Route::group(['prefix' => 'footers'], function () {
        Route::get('/a3', 'PrintController@a3footer');
    });
});

Route::group(['prefix' => 'rest/api'], function () {
    Route::group(['prefix' => 'projects'], function () {
//APICanvasControllerro
        Route::get('/{id}/packs','APICanvasController@project_pack_list');
        Route::get('/{id}/bom-dictionary','APICanvasController@project_bom_dict');
        Route::get('/{id}/bom-dictionary-std','APICanvasController@project_bom_dict_std_inc');
        Route::post('/{id}/packs','APICanvasController@set_project_pack_list');
        Route::post('/{id}/bom-dictionary','APICanvasController@set_project_bom_dict');
        Route::post('/{id}/bom-dictionary-std','APICanvasController@set_project_bom_dict_std_inc');
    });
});

