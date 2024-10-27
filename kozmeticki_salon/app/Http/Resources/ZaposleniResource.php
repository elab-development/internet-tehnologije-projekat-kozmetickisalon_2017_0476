<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ZaposleniResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     * @param \Illuminate\Http\Request $request
     * @return array
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'naziv' => $this->naziv,
            'strucna_sprema' => $this->strucna_sprema,
            'kontakt_telefon' => $this->kontakt_telefon,
            'email' => $this->email,
            'linkedin' => $this->linkedin,
        ];
    }
}
