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
        Schema::create('plans_remplacement', function (Blueprint $table) {
            $table->id();
            $table->string('type');

            $table->foreignId('formateur_remplacant_id')
                  ->constrained('employes')
                  ->cascadeOnDelete();

            $table->date('date_remplacement');

            $table->foreignId('cours_id')
                  ->constrained('cours')
                  ->cascadeOnDelete();
                      $table->string('statut')->default('en_attente');
            $table->text('commentaire')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('plans_remplacement');
    }
};
