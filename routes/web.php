<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::prefix('adminca')->group(function () {
    //path for vuejs
    Route::get('{path}', 'AdminController@index')->where( 'path', '([A-z]+)?' );
    Route::get('/', 'AdminController@index')->name('index');

    // Route::get('users', function () {
    //     // Matches The "/admin/users" URL
    // });
});


Route::get('/home', 'HomeController@index')->name('home');
 

//lấy toàn bộ các URL khác URL trên đưa về trang welcome
// Route::view('/{any}', 'welcome')
//     ->where('any', '.*');