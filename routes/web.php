<?php
// Route::get('/{any}', function(){
//     return view('welcome');
// })->where('any','.*');


Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
Route::resource('boards', 'BoardController')->middleware('auth');
Route::resource('boards.boardComments', 'BoardCommentController')->middleware('auth');
Route::resource('posts', 'PostController')->middleware('auth');
Route::resource('youtubes', 'YoutubeController')->middleware('auth');
