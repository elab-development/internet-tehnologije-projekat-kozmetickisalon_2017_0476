<?php

namespace App\Exports;

use App\Models\Usluga;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class UslugaExport implements FromCollection, WithHeadings
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return collect(Usluga::vratiSveUsluge());
    }

    public function headings():array{
        return [
            'Id',
            'Naziv kozmeticke usluge',
            'Opis kozmeticke usluge',
            'Cena kozmeticke usluge'
        ];
    }
}
