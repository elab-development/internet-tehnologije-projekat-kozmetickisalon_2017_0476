<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('termini', function (Blueprint $table) {
            $table->foreignId('usluga_id')->nullable()->references('id')->on('usluge')->onDelete('set null');
            $table->foreignId('zaposleni_id')->nullable()->references('id')->on('zaposleni')->onDelete('set null');
            $table->foreignId('user_id')->nullable()->references('id')->on('users')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('termini', function (Blueprint $table) {
            $table->dropForeign('usluga_id');
            $table->dropForeign('zaposleni_id');
            $table->dropForeign('user_id');
        });
    }
};
