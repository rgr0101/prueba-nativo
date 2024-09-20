<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PacienteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        DB::table('pacientes')->insert([
            [
                'nombre_completo' => 'Juan Pérez',
                'edad' => 8,
                'sexo' => 'M',
                'fecha_nacimiento' => '2016-05-12',
                'ciudad_origen' => 'Mérida',
                'fecha_inscripcion' => '2024-09-19',
                'hospital' => 'Regional',
                'nombre_tutor' => 'Pedro Pérez',
                'telefono_tutor' => '999 999 9999',
            ],
            [
                'nombre_completo' => 'Ana Gómez',
                'edad' => 5,
                'sexo' => 'F',
                'fecha_nacimiento' => '2019-02-25',
                'ciudad_origen' => 'Progreso',
                'fecha_inscripcion' => '2024-09-19',
                'hospital' => 'Regional',
                'nombre_tutor' => 'María Gómez',
                'telefono_tutor' => '988 888 8888',
            ],
        ]);
    }
}
