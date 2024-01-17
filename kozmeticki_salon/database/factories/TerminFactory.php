<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

use App\Models\User;
use App\Models\Zaposleni;
use App\Models\Usluga;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Termin>
 */
class TerminFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $datum = date('Y-m-d'); // Dohvati trenutni datum
        $randomBrojDana = rand(7, 30); // Generiši random broj od 7 do 30

        // Dodaj random broj dana na trenutni datum
        $noviDatum = date('Y-m-d', strtotime("+$randomBrojDana days", strtotime($datum)));
        return [
            'datum' => $noviDatum, 
            'vreme' => $this->faker->time('H:i:s'),
            'usluga_id' => Usluga::factory(),
            'zaposleni_id' => Zaposleni::factory(),
            'user_id' => User::factory(),
        ];
    }
}
