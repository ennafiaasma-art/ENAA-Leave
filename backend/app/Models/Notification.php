<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;

    protected $table = 'notifications';

    protected $fillable = [
        'destinataire_id',
        'titre',
        'message',
        'type',
        'date_envoi',
        'lu',
    ];

    protected $casts = [
        'date_envoi' => 'datetime',
        'lu' => 'boolean',
    ];

    // Employé destinataire
    public function destinataire()
    {
        return $this->belongsTo(
            Employe::class,
            'destinataire_id'
        );
    }
}
