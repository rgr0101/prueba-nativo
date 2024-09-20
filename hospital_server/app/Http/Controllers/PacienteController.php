<?php

namespace App\Http\Controllers;

use App\Models\Paciente;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PacienteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $pacientes = Paciente::all();
        
        return response()->json($pacientes, 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'nombre_completo' => 'required|string|max:255',
            'edad' => 'required|integer',
            'sexo' => 'required|string|max:1',
            'fecha_nacimiento' => 'required|date',
            'ciudad_origen' => 'required|string|max:255',
            'hospital' => 'required|string|max:255',
            'nombre_tutor' => 'required|string|max:255',
            'telefono_tutor' => 'required|string|max:15',
        ]);

        $request['fecha_inscripcion'] = now();

        $paciente = Paciente::create($request->all());
        return response()->json($paciente, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Paciente $paciente)
    {
        return response()->json($paciente, 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Paciente $paciente)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Paciente $paciente): JsonResponse
    {
        $request->validate([
            'nombre_completo' => 'sometimes|required|string|max:255',
            'edad' => 'sometimes|required|integer',
            'sexo' => 'sometimes|required|string|max:1',
            'fecha_nacimiento' => 'sometimes|required|date',
            'ciudad_origen' => 'sometimes|required|string|max:255',
            'hospital' => 'sometimes|required|string|max:255',
            'nombre_tutor' => 'sometimes|required|string|max:255',
            'telefono_tutor' => 'sometimes|required|string|max:15',
        ]);

        $paciente->update($request->all());
        return response()->json($paciente, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Paciente $paciente): JsonResponse
    {
        $paciente->delete();
        return response()->json(null, 204);
    }
}
