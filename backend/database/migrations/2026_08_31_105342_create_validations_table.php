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
        Schema::create('validations', function (Blueprint $table) {
            $table->id();
             $table->foreignId('demande_conge_id')
            ->constrained('demandes_conge')
            ->cascadeOnDelete();

        $table->foreignId('validateur_id')
            ->constrained('employes')
            ->cascadeOnDelete();

        $table->enum('niveau', [
            'manager',
            'rh'
        ]);


         $table->enum('statut', [
            'approved',
            'rejected',
            'needs_information'
        ]);
             $table->timestamp('date_validation')->nullable();

        $table->text('commentaire')->nullable();
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('validations');
    }
};
