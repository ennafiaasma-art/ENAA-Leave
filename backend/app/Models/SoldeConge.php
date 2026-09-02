<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SoldeConge extends Model
{
    use HasFactory;

    protected $table = 'soldes_conge';

    protected $fillable = [
        'employe_id',
        'type_conge_id',
        'solde',
        'annee',
    ];

    protected $casts = [
        'solde' => 'decimal:2',
        'annee' => 'integer',
    ];

    // Employé concerné
    public function employe()
    {
        return $this->belongsTo(Employe::class);
    }

    // Type de congé
    public function typeConge()
    {
        return $this->belongsTo(TypeConge::class);
    }
}
