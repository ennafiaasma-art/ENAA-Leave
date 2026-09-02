<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TypeConge extends Model
{
    use HasFactory;

    protected $table = 'types_conge';

    protected $fillable = [
        'nom',
        'description',
        'acquisition_mensuelle',
        'duree_max',
    ];

    protected $casts = [
        'acquisition_mensuelle' => 'decimal:2',
        'duree_max' => 'integer',
    ];

    // Soldes liés à ce type de congé
    public function soldesConge()
    {
        return $this->hasMany(SoldeConge::class);
    }

    // Demandes utilisant ce type de congé
    public function demandesConge()
    {
        return $this->hasMany(DemandeConge::class);
    }
}
