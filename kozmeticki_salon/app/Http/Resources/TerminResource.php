<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;



class TerminResource extends JsonResource
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
            'datum' => $this->resource->datum,
            'vreme' => $this->resource->vreme,
            'usluga_id' => new UslugaResource($this->resource->usluga),
            'zaposleni_id' => new ZaposleniResource($this->resource->zaposleni),
            'user_id' => new UserResource($this->resource->user),
        ];
    }
}
