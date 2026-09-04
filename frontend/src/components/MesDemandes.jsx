
import { useEffect, useState } from "react";
import api from "../services/api";

function MesDemandes() {
    const [demandes, setDemandes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchDemandes = async () => {
            try {
                const response = await api.get("/demandes-conge");

                console.log("Mes demandes :", response.data);

                setDemandes(response.data.demandes || []);
            } catch (error) {
                console.error("Erreur demandes :", error);

                setError(
                    error.response?.data?.message ||
                    "Impossible de récupérer vos demandes."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchDemandes();
    }, []);

    if (loading) {
        return (
            <div className="bg-white rounded-xl shadow p-8 text-center">
                <p className="text-gray-500">
                    Chargement de vos demandes...
                </p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto">

            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-800">
                    Mes demandes
                </h2>

                <p className="text-gray-500 mt-2">
                    Consultez l'état de vos demandes de congé.
                </p>
            </div>

            {error && (
                <div className="mb-6 bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg">
                    ❌ {error}
                </div>
            )}

            {demandes.length === 0 ? (
                <div className="bg-white rounded-xl shadow p-8 text-center">
                    <p className="text-gray-500">
                        Vous n'avez aucune demande de congé.
                    </p>
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow overflow-hidden">

                    <div className="overflow-x-auto">
                        <table className="w-full">

                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-6 py-4 text-left">
                                        Type de congé
                                    </th>

                                    <th className="px-6 py-4 text-left">
                                        Date début
                                    </th>

                                    <th className="px-6 py-4 text-left">
                                        Date fin
                                    </th>

                                    <th className="px-6 py-4 text-left">
                                        Durée
                                    </th>

                                    <th className="px-6 py-4 text-left">
                                        Journée
                                    </th>

                                    <th className="px-6 py-4 text-left">
                                        Motif
                                    </th>

                                    <th className="px-6 py-4 text-left">
                                        Statut
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {demandes.map((demande) => (
                                    <tr
                                        key={demande.id}
                                        className="border-t hover:bg-gray-50"
                                    >
                                        <td className="px-6 py-4 font-medium">
                                            {demande.type_conge?.nom || "-"}
                                        </td>

                                        <td className="px-6 py-4">
                                            {demande.date_debut}
                                        </td>

                                        <td className="px-6 py-4">
                                            {demande.date_fin}
                                        </td>

                                        <td className="px-6 py-4">
                                            {demande.duree} jour(s)
                                        </td>

                                        <td className="px-6 py-4">
                                            {demande.type_journee ===
                                            "journee_entiere"
                                                ? "Journée entière"
                                                : demande.type_journee ===
                                                  "matin"
                                                ? "Matin"
                                                : "Après-midi"}
                                        </td>

                                        <td className="px-6 py-4">
                                            {demande.motif || "-"}
                                        </td>

                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-700">
                                                {demande.statut ||
                                                    "En attente"}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>

                </div>
            )}
        </div>
    );
}

export default MesDemandes;

