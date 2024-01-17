<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Resources\UslugaResource;
use App\Models\Usluga;

class SearchController extends Controller
{
    public function searchNaziveUsluga(Request $request)
    {
        $upit = Usluga::query();


        if ($request->has('naziv')) {
            $upit->where('naziv', 'like', '%' . $request->input('naziv') . '%');
        }

  
        $page = $request->input('stranica', 1);


        $perPage = 1;

        $Services = $upit->orderBy('naziv')->paginate($perPage, ['*'], 'page', $page);

        if($Services->isEmpty()){
            return response()->json(['Poruka' => 'Ne postoje usluge ciji je naziv jednak kriterijumu pretrage.'], 404);
        }
        return response()->json(['Trenutna stranica: ' => $Services->currentPage(), 'Poslednja stranica: ' => $Services->lastPage(),
         'Usluge pronadjene: ' => UslugaResource::collection($Services)], 200);
    }
}
