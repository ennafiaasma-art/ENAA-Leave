<?php

namespace Database\Seeders;

use App\Models\Employe;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class EmployeSeeder extends Seeder
{
    public function run(): void
    {
        Employe::create([
            'nom' => 'Ennafia',
            'prenom' => 'Asma',
            'email' => 'asma@gmail.com',
            'password' => Hash::make('12345678'),
            'telephone' => '0612345678',
            'role' => 'employe',
            'departement' => 'Informatique',
        ]);
    }
}
