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

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function zaposleni() {
        return $this->belongsTo(Zaposleni::class);
    }

    public function usluga() {
        return $this->belongsTo(Usluga::class);
    }
}
