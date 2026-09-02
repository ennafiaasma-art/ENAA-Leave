<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cours extends Model
{
    use HasFactory;

    protected $table = 'cours';

    protected $fillable = [
        'titre',
        'module',
        'date',
        'heure_debut',
        'heure_fin',
        'formateur_id',
    ];

    protected $casts = [
        'date' => 'date',
    ];

    // Formateur du cours
    public function formateur()
    {
        return $this->belongsTo(
            Employe::class,
            'formateur_id'
        );
    }

    // Plans de remplacement liés au cours
    public function plansRemplacement()
    {
        return $this->hasMany(PlanRemplacement::class);
    }
}
