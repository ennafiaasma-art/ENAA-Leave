<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\DemandeConge;
use Illuminate\Http\Request;

class DemandeCongeController extends Controller
{
    // Afficher mes demandes
    public function index(Request $request)
    {
        $employe = $request->user();

        $demandes = DemandeConge::with('typeConge')
            ->where('employe_id', $employe->id)
            ->latest()
            ->get();

        return response()->json([
            'message' => 'Liste de mes demandes de congé',
            'demandes' => $demandes
        ]);
    }

    // Afficher une demande
    public function show(Request $request, $id)
    {
        $demande = DemandeConge::with('typeConge', 'validations')
            ->where('employe_id', $request->user()->id)
            ->find($id);

        if (!$demande) {
            return response()->json([
                'message' => 'Demande de congé introuvable'
            ], 404);
        }

        return response()->json($demande);
    }

    // Créer une demande
    public function store(Request $request)
    {
        $request->validate([
            'type_conge_id' => 'required|exists:types_conge,id',
            'date_debut' => 'required|date',
            'date_fin' => 'required|date|after_or_equal:date_debut',
            'duree' => 'required|numeric|min:0.5',
            'type_journee' => 'required|in:journee_entiere,matin,apres_midi',
            'motif' => 'nullable|string',
        ]);

        $demande = DemandeConge::create([
            'employe_id' => $request->user()->id,
            'type_conge_id' => $request->type_conge_id,
            'date_debut' => $request->date_debut,
            'date_fin' => $request->date_fin,
            'duree' => $request->duree,
            'type_journee' => $request->type_journee,
            'motif' => $request->motif,
        ]);

        return response()->json([
            'message' => 'Demande de congé créée avec succès',
            'demande' => $demande->load('typeConge')
        ], 201);
    }

    // Modifier une demande
    public function update(Request $request, $id)
    {
        $demande = DemandeConge::where('employe_id', $request->user()->id)
            ->find($id);

        if (!$demande) {
            return response()->json([
                'message' => 'Demande de congé introuvable'
            ], 404);
        }

        $request->validate([
            'type_conge_id' => 'required|exists:types_conge,id',
            'date_debut' => 'required|date',
            'date_fin' => 'required|date|after_or_equal:date_debut',
            'duree' => 'required|numeric|min:0.5',
            'type_journee' => 'required|in:journee_entiere,matin,apres_midi',
            'motif' => 'nullable|string',
        ]);

        $demande->update($request->only([
            'type_conge_id',
            'date_debut',
            'date_fin',
            'duree',
            'type_journee',
            'motif',
        ]));

        return response()->json([
            'message' => 'Demande modifiée avec succès',
            'demande' => $demande->load('typeConge')
        ]);
    }

    // Supprimer une demande
    public function destroy(Request $request, $id)
    {
        $demande = DemandeConge::where('employe_id', $request->user()->id)
            ->find($id);

        if (!$demande) {
            return response()->json([
                'message' => 'Demande de congé introuvable'
            ], 404);
        }

        $demande->delete();

        return response()->json([
            'message' => 'Demande supprimée avec succès'
        ]);
    }
}
