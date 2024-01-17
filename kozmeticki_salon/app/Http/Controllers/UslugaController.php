<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Resources\UslugaResource;
use App\Models\Usluga;

use Maatwebsite\Excel\Facades\Excel;
use App\Exports\UslugaExport;

class UslugaController extends Controller
{
    public function index()
    {
        $users = Usluga::all();
        return UslugaResource::collection($users);
    }


    public function show($id)
    {
        $user = Usluga::findOrFail($id);
        return new UslugaResource($user);
    }

    public function exportToCSV(){
        return Excel::download(new UslugaExport, 'usluge-csv.csv');
    }
}
