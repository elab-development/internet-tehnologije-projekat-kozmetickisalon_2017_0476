<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

use App\Http\Resources\TerminResource;
use App\Models\Termin;

class TerminController extends Controller
{
    public function index()
    {
        $user_id = Auth::id(); // ID ulogovanog korisnika

    // Svi termini logovanog korisnika
    $termini = Termin::where('user_id', $user_id)->get();

    return TerminResource::collection($termini);
    }


    public function store(Request $request)
    {
        $user_id = Auth::user()->id;
        // Validacija za polja koja se unose preko requesta
        $validator = Validator::make($request->all(), [
            'datum' => 'required',
            'vreme' => 'required',
            'usluga_id' => 'required',
            'zaposleni_id' => 'required' // treba i zaposleni
        ]);
    
        // Provera validacije
        if ($validator->fails()) {
            return response()->json(['Greska' => $validator->errors()], 400);
        }
    
        $termin = new Termin();
        $termin->datum = $request->datum;
        $termin->vreme = $request->vreme;
        $termin->usluga_id = $request->usluga_id;
        $termin->zaposleni_id = $request->zaposleni_id; // iskoristiti selektovani zaposleni_id
        $termin->user_id = $user_id;
    
        $termin->save();
    
        return response()->json(['Poruka' => 'Uspesno ste zakazali termin!!!', 
            'Zakazan termin' => new TerminResource($termin)]);
    }

    public function update(Request $request, $id)
    {

            $user_id = Auth::user()->id;

            // Validacija za polja koja se unose preko requesta
            $validator = Validator::make($request->all(), [
                'datum' => 'required',
                'vreme' => 'required',
            ]);

            // Provera validacije
            if ($validator->fails()) {
                return response()->json(['Greska' => $validator->errors()], 400);
            }

            $termin = Termin::findOrFail($id);
            if($termin->user_id != $user_id){
                return response()->json(['Greska' => 'PRISTUP ZABRANJEN: Korisnik nije zakazao ovaj termin!'], 403);
            }

            $termin->datum = $request->datum;
            $termin->vreme = $request->vreme;

            $termin->save();

            return response()->json(['Poruka' => 'Termin je uspesno izmenjen!', 'Termin: ' => new TerminResource($termin)]);
    }

    public function updateVreme(Request $request, $id)
    {
            $user_id = Auth::user()->id;

            // Validacija za polja koja se unose preko requesta
            $validator = Validator::make($request->all(), [
                'vreme' => 'required',
            ]);

            // Provera validacije
            if ($validator->fails()) {
                return response()->json(['Greska' => $validator->errors()], 400);
            }

            $termin = Termin::findOrFail($id);
            if($termin->user_id != $user_id){
                return response()->json(['Greska' => 'PRISTUP ZABRANJEN: Korisnik nije zakazao ovaj termin!'], 403);
            }

            $termin->vreme = $request->vreme;

            $termin->save();

            return response()->json(['Poruka' => 'Vreme uspesno izmenjeno!', 'termin' => new TerminResource($termin)]);
    }

    public function destroy($id)
    {
        $user_id = Auth::user()->id;

        $termin = Termin::findOrFail($id);

        if($termin->user_id != $user_id){
            return response()->json(['Greska' => 'PRISTUP ZABRANJEN: Korisnik nije zakazao ovaj termin!'], 403);
        }

        $termin->delete();

        return response()->json(['Poruka' => 'Termin je uspesno obrisan.']);
    }

    public function getMetrics()
{
    // Ukupan broj termina
    $totalAppointments = Termin::count();

    // Broj termina po zaposlenom sa imenom zaposlenog
    $appointmentsByEmployee = Termin::selectRaw('zaposleni_id, COUNT(*) as count')
        ->with('zaposleni:id,naziv')  // Koristimo 'with' da učitamo ime zaposlenog
        ->groupBy('zaposleni_id')
        ->get()
        ->map(function ($item) {
            $item->zaposleni_name = $item->zaposleni->naziv; // Dodajemo naziv zaposlenog
            unset($item->zaposleni); // Uklanjamo nepotrebni objekat 'zaposleni'
            return $item;
        });

    return response()->json([
        'totalAppointments' => $totalAppointments,
        'appointmentsByEmployee' => $appointmentsByEmployee
    ]);
}



}
