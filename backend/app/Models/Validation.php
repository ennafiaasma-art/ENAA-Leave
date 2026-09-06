<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Validation extends Model
{
    use HasFactory;

    protected $table = 'validations';

    protected $fillable = [
        'demande_conge_id',
        'validateur_id',
        'niveau',
        'statut',
        'date_validation',
        'commentaire',
    ];

    protected $casts = [
        'date_validation' => 'datetime',
    ];

    // Demande de congé
    public function demandeConge()
    {
        return $this->belongsTo(DemandeConge::class);
    }

    // Employé qui valide
    public function validateur()
    {
        return $this->belongsTo(
            Employe::class,
            'validateur_id'
        );
    }
}
