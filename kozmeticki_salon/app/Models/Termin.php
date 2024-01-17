<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Termin extends Model
{
    use HasFactory;

    protected $table = 'termini';

    protected $fillable = [
        'datum',
        'vreme', 
        'usluga_id',
        'zaposleni_id',
        'user_id',
    ];
}
