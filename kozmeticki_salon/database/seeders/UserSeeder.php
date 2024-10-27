<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name'=>"Marija",
            'email'=>"marija@gmail.com",
            'password' =>  "marija123",
            'is_admin' => true,
            'remember_token' => Str::random(10),
        ]);
       
        User::factory()->times(6)->create();
    }
}
