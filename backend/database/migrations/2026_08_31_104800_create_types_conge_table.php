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
        Schema::create('types_conge', function (Blueprint $table) {
            $table->id();
             $table->string('nom');
        $table->text('description')->nullable();
        $table->decimal('acquisition_mensuelle', 5, 2)->nullable();
        $table->integer('duree_max')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('types_conge');
    }
};
