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
        Schema::create('demandes_conge', function (Blueprint $table) {
            $table->id();
             // Employé qui fait la demande
            $table->foreignId('employe_id')
                ->constrained('employes')
                ->cascadeOnDelete();
// Type de congé demandé
            $table->foreignId('type_conge_id')
                ->constrained('types_conge')
                ->restrictOnDelete();
                     $table->date('date_debut');
            $table->date('date_fin');
               $table->decimal('duree', 5, 2);
                  $table->enum('type_journee', [
                'journee_entiere',
                'matin',
                'apres_midi'
            ])->default('journee_entiere');
             $table->text('motif')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('demandes_conge');
    }
};
