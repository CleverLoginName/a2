<?php



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

    Route::get('/profile', 'UsersController@profile');
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
});

