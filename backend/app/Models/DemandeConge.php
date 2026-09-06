<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DemandeConge extends Model
{
    use HasFactory;

    protected $table = 'demandes_conge';

    protected $fillable = [
        'employe_id',
        'type_conge_id',
        'date_debut',
        'date_fin',
        'duree',
        'type_journee',
        'motif',
    ];

    protected $casts = [
        'date_debut' => 'date',
        'date_fin' => 'date',
        'duree' => 'decimal:2',
    ];

    // Employé qui fait la demande
    public function employe()
    {
        return $this->belongsTo(Employe::class);
    }

    // Type de congé demandé
    public function typeConge()
    {
        return $this->belongsTo(TypeConge::class);
    }

    // Validations de la demande
    public function validations()
    {
        return $this->hasMany(Validation::class);
    }
}
