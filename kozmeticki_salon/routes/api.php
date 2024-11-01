<?php

use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ZaposleniController;
use App\Http\Controllers\UslugaController;
use App\Http\Controllers\TerminController;
use App\Http\Controllers\PretragaController;
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

Route::group(['middleware' => ['auth:sanctum']], function () {

    Route::get('/metrics', [TerminController::class, 'getMetrics']);

    Route::get('/termini', [TerminController::class, 'index']);
    Route::post('/termini', [TerminController::class,'store']);
    Route::put('/termini/{id}', [TerminController::class,'update']);
    Route::patch('/termini/{id}', [TerminController::class,'updateVreme']);
    Route::delete('/termini/{id}', [TerminController::class,'destroy']);

    Route::get('/export-csv', [UslugaController::class, 'exportToCSV']);

    Route::get('/pretraga/poNazivu', [PretragaController::class, 'pretragaPoNazivu']);

    Route::get('usluge', [UslugaController::class, 'index']);
    Route::get('usluge/{id}', [UslugaController::class, 'show']); 

    Route::post('/logout', [AuthController::class, 'logout']); 

    Route::get('/users',[UserController::class,'index']);
    Route::get('/users/{id}',[UserController::class,'show']);
    Route::delete('/users/{id}', [UserController::class, 'destroy']);
});   