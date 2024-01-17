<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use DB;

class Usluga extends Model
{
    use HasFactory;

    protected $table = 'usluge';

    protected $fillable = [
        'naziv',
        'opis', 
        'cena',
    ];

    public function termini() {
        return $this->hasMany(Termin::class);
    }

    public static function vratiSveUsluge(){
        $result = DB::table('usluge')->select('id', 'naziv', 'opis', 'cena')->get()->toArray();
        return $result;
    }
}
