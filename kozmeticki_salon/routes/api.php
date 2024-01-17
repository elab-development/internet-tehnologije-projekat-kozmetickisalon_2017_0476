<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ZaposleniController;
use App\Http\Controllers\UslugaController;
use App\Http\Controllers\TerminController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/register',[AuthController::class,'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::resource('zaposleni', ZaposleniController::class, ['only' => ['index', 'show']]);

Route::get('usluge', [UslugaController::class, 'index']);
Route::get('usluge/{id}', [UslugaController::class, 'show']); 

Route::group(['middleware' => ['auth:sanctum']], function () {

    Route::post('/termini', [TerminController::class,'store']);
    Route::put('/termini/{id}', [TerminController::class,'update']);
    Route::patch('/termini/{id}', [TerminController::class,'updateVreme']);
    Route::delete('/termini/{id}', [TerminController::class,'destroy']);

    Route::post('/logout', [AuthController::class, 'logout']); 
});   