<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Resources\ZaposleniResource;
use App\Models\Zaposleni;

class ZaposleniController extends Controller
{
    public function index()
    {
        $users = Zaposleni::all();
        return ZaposleniResource::collection($users);
    }


    public function show($id)
    {
        $user = Zaposleni::findOrFail($id);
        return new ZaposleniResource($user);
    }
}
