<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request
     * @return array
     */
    public function toArray($request)
    {
        $data = [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
        ];

        if ($this->is_worker) {
            $data['is_admin'] = 'Ovaj korisnik je administrator sajta';
        } else {
            $data['is_admin'] = 'Ovo je obican korisnik salona';
        }

        return $data;
    }
}
