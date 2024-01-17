<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\Termin;

class TerminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 1; $i <= 6; $i++) {
            Termin::factory()->create([
                'usluga_id' => rand(1, 6),
                'zaposleni_id' => rand(1, 6),
                'user_id' => rand(1, 6),
            ]);
        }
    }
}
