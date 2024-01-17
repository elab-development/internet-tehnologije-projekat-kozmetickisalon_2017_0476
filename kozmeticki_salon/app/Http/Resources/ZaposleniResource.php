<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ZaposleniResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->resource->id,
            'naziv' => $this->resource->naziv,
            'strucna_sprema' => $this->resource->strucna_sprema,
            'kontakt_telefon' => $this->resource->kontakt_telefon,
            'email' => $this->resource->email,
            'linkedin' => $this->resource->linkedin,
        ];
    }
}
