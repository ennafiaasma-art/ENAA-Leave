<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TypeConge;
use Illuminate\Http\Request;

class TypeCongeController extends Controller
{
    // Afficher tous les types de congé
    public function index()
    {
        $types = TypeConge::all();

        return response()->json([
            'message' => 'Liste des types de congé',
            'types_conge' => $types
        ]);
    }

    // Afficher un type
    public function show($id)
    {
        $type = TypeConge::find($id);

        if (!$type) {
            return response()->json([
                'message' => 'Type de congé introuvable'
            ], 404);
        }

        return response()->json($type);
    }

    // Créer un type
    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required|string|max:255',
            'description' => 'nullable|string',
            'acquisition_mensuelle' => 'nullable|numeric|min:0',
            'duree_max' => 'nullable|integer|min:1',
        ]);

        $type = TypeConge::create([
            'nom' => $request->nom,
            'description' => $request->description,
            'acquisition_mensuelle' => $request->acquisition_mensuelle,
            'duree_max' => $request->duree_max,
        ]);

        return response()->json([
            'message' => 'Type de congé créé avec succès',
            'type_conge' => $type
        ], 201);
    }

    // Modifier
    public function update(Request $request, $id)
    {
        $type = TypeConge::find($id);

        if (!$type) {
            return response()->json([
                'message' => 'Type de congé introuvable'
            ], 404);
        }

        $request->validate([
            'nom' => 'required|string|max:255',
            'description' => 'nullable|string',
            'acquisition_mensuelle' => 'nullable|numeric|min:0',
            'duree_max' => 'nullable|integer|min:1',
        ]);

        $type->update($request->only([
            'nom',
            'description',
            'acquisition_mensuelle',
            'duree_max',
        ]));

        return response()->json([
            'message' => 'Type de congé modifié avec succès',
            'type_conge' => $type
        ]);
    }

    // Supprimer
    public function destroy($id)
    {
        $type = TypeConge::find($id);

        if (!$type) {
            return response()->json([
                'message' => 'Type de congé introuvable'
            ], 404);
        }

        $type->delete();

        return response()->json([
            'message' => 'Type de congé supprimé avec succès'
        ]);
    }
}
