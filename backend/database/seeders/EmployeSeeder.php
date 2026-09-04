<?php

namespace Database\Seeders;

use App\Models\Employe;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class EmployeSeeder extends Seeder
{
    public function run(): void
    {
       Employe::updateOrCreate(
    ['email' => 'asma@gmail.com'],
    [
        'nom' => 'Ennafia',
        'prenom' => 'Asma',
        'password' => Hash::make('12345678'),
        'telephone' => '0612345678',
        'role' => 'employe',
        'departement' => 'Informatique',
    ]
);
    }
}
