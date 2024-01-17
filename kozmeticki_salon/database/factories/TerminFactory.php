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
        return [
            'datum' => $this->faker->date(), 
            'vreme' => $this->faker->time('H:i:s'),
            'usluga_id' => Usluga::factory(),
            'zaposleni_id' => Zaposleni::factory(),
            'user_id' => User::factory(),
        ];
    }
}
