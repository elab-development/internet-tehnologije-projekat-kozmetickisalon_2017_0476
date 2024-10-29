<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;



class TerminResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     * @param \Illuminate\Http\Request $request
     * @return array
     */
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'datum' => $this->datum,
            'vreme' => $this->vreme,
            'usluga_naziv' => $this->usluga->naziv, // Prikazujemo samo naziv usluge
            'zaposleni_naziv' => $this->zaposleni->naziv, // Prikazujemo samo naziv zaposlenog
        ];
    }
}
