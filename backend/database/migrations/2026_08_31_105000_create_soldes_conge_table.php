<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('soldes_conge', function (Blueprint $table) {
            $table->id();
              $table->foreignId('employe_id')
            ->constrained('employes')
            ->cascadeOnDelete();

        $table->foreignId('type_conge_id')
            ->constrained('types_conge')
            ->cascadeOnDelete();

        $table->decimal('solde', 8, 2)->default(0);
        $table->year('annee');
            $table->timestamps();
             $table->unique([
            'employe_id',
            'type_conge_id',
            'annee'
        ]);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('soldes_conge');
    }
};
