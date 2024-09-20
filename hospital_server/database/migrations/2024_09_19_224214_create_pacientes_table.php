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
        Schema::create('pacientes', function (Blueprint $table) {
            $table->id();
            $table->string('nombre_completo');
            $table->integer('edad');
            $table->enum('sexo', ['M', 'F']);
            $table->date('fecha_nacimiento');
            $table->string('ciudad_origen');
            $table->date('fecha_inscripcion');
            $table->string('hospital');
            $table->string('nombre_tutor');
            $table->string('telefono_tutor');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pacientes');
    }
};
