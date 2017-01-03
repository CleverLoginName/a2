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
        Route::resource('/', 'ProductsController');
        Route::resource('/all', 'ProductsController@allData');
        Route::resource('single-products', 'SingleProductsController');
        Route::resource('composite-products', 'CompositeProductsController');
        Route::resource('packs', 'PacksController');
    });
    /**********************************************************************************************/
});