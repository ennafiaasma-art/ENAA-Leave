<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PlanRemplacement extends Model
{
    use HasFactory;

    protected $table = 'plans_remplacement';

    protected $fillable = [
        'type',
        'formateur_remplacant_id',
        'date_remplacement',
        'cours_id',
        'statut',
        'commentaire',
    ];

    protected $casts = [
        'date_remplacement' => 'date',
    ];

    // Cours à remplacer
    public function cours()
    {
        return $this->belongsTo(Cours::class);
    }

    // Employé qui remplace
    public function formateurRemplacant()
    {
        return $this->belongsTo(
            Employe::class,
            'formateur_remplacant_id'
        );
    }
}
