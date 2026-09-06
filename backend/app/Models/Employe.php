<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Employe extends Model
{
     use HasApiTokens, HasFactory;

    protected $table = 'employes';

    protected $fillable = [
        'nom',
        'prenom',
        'email',
        'password',
        'telephone',
        'role',
        'departement',
        'solde_conge',
    ];

    protected $hidden = [
        'password',
    ];

    protected $casts = [
        'solde_conge' => 'integer',
    ];

    // Soldes de congé
    public function soldesConge()
    {
        return $this->hasMany(SoldeConge::class);
    }

    // Demandes de congé
    public function demandesConge()
    {
        return $this->hasMany(DemandeConge::class);
    }

    // Validations effectuées par cet employé
    public function validations()
    {
        return $this->hasMany(Validation::class, 'validateur_id');
    }

    // Notifications reçues
    public function notifications()
    {
        return $this->hasMany(Notification::class, 'destinataire_id');
    }

    // Cours donnés par cet employé
    public function cours()
    {
        return $this->hasMany(Cours::class, 'formateur_id');
    }

    // Plans de remplacement
    public function plansRemplacement()
    {
        return $this->hasMany(
            PlanRemplacement::class,
            'formateur_remplacant_id'
        );
    }
}
