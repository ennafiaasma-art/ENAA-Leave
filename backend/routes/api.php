<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DemandeCongeController;


Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/demandes-conge', [DemandeCongeController::class, 'index']);
    Route::get('/demandes-conge/{id}', [DemandeCongeController::class, 'show']);
    Route::post('/demandes-conge', [DemandeCongeController::class, 'store']);
    Route::put('/demandes-conge/{id}', [DemandeCongeController::class, 'update']);
    Route::delete('/demandes-conge/{id}', [DemandeCongeController::class, 'destroy']);
});
