<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usluga;
use App\Http\Resources\UslugaResource;
use Illuminate\Pagination\Paginator;

class PretragaController extends Controller
{
    public function pretragaPoNazivu(Request $request)
    {
     
        $query = Usluga::query();


        if ($request->has('naziv')) {
            $query->where('naziv', 'like', '%' . $request->input('naziv') . '%');
        }

        $page = $request->input('stranica', 1);
        $perPage = 2;

        $usluge = $query->orderBy('naziv')->paginate($perPage, ['*'], 'stranica', $page);

        if($usluge->isEmpty()){
            return response()->json(['Poruka' => 'Ne postoje usluge ciji naziv zadovoljava uneti kriterijum pretrage.'], 404);
        }
        return response()->json(['Trenutna stranica: ' => $usluge->currentPage(), 'Poslednja stranica:' => $usluge->lastPage(),
         'Pronadjeni usluge sa unetim nazivom:' => UslugaResource::collection($usluge)], 200);
    }
}
