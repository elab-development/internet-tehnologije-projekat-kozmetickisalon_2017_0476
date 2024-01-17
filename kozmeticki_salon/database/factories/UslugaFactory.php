<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Usluga>
 */
class UslugaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $usluge = [
            'Hemijski tretman', 'Bioloski tretman lica', 'Antiage tretman', 'Tretman ciscenja lica'
            , 'Lashlift', 'Laminacija obrva', 'Masaza lica', 'Tretman vocnim kiselinama',
        ];

        return [
            'naziv' => $this->faker->randomElement($usluge), 
            'opis' => $this->faker->sentence(),
            'cena' => $this->faker->numberBetween($min = 5000, $max = 20000),
        ];
    }
}
