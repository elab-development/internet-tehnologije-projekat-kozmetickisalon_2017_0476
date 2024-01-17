<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Zaposleni>
 */
class ZaposleniFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $strucneSpreme = [
            'Esteticar', 'Diplomirani kozmetolog', 
            'Frizerska skola', 'Skola za negu lepote', 'Diplomirani dermatolog',
            'Dermatoloski tehnicar', 'Tehnicar hemijsko-prehrambene skole'
        ];



        return [
            'naziv' => $this->faker->name(), 
            'strucna_sprema' => $this->faker->randomElement($strucneSpreme),
            'kontakt_telefon' => $this->faker->phoneNumber(),
            'email' => $this->faker->safeEmail(),
            'linkedin' => 'https://www.linkedin.com/in/'.$this->faker->word(),
        ];
    }
}
