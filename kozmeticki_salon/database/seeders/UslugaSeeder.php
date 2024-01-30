<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\Usluga;

class UslugaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Usluga::factory()->times(7)->create();

        for ($i = 1; $i <= 3; $i++) {
            Usluga::factory()->create([
                'naziv' => 'Lashlift',
            ]);
        }
    }
}
