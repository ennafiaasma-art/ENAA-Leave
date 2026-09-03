import { useEffect, useState } from "react";
import api from "../services/api";

function NouvelleDemande() {
    const [typesConge, setTypesConge] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const [form, setForm] = useState({
        type_conge_id: "",
        date_debut: "",
        date_fin: "",
        duree: "",
        type_journee: "journee_entiere",
        motif: "",
    });

    // Récupérer les types de congé
  useEffect(() => {
    const fetchTypesConge = async () => {
        try {
            const response = await api.get("/types-conge");

            console.log("Réponse API :", response.data);

            setTypesConge(response.data.types_conge);
        } catch (error) {
            console.error("Erreur complète :", error);
            console.error("Status :", error.response?.status);
            console.error("Data :", error.response?.data);

            setError(
                error.response?.data?.message ||
                "Impossible de récupérer les types de congé."
            );
        }
    };

    fetchTypesConge();
}, []);

    // Changement des champs
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    // Envoyer la demande
    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setMessage("");
        setError("");

        try {
            const response = await api.post("/demandes-conge", {
                ...form,
                type_conge_id: Number(form.type_conge_id),
                duree: Number(form.duree),
            });

            setMessage(response.data.message);

            // Vider le formulaire
            setForm({
                type_conge_id: "",
                date_debut: "",
                date_fin: "",
                duree: "",
                type_journee: "journee_entiere",
                motif: "",
            });

        } catch (error) {
            console.error(error);

            if (error.response?.data?.errors) {
                setError(
                    Object.values(error.response.data.errors)
                        .flat()
                        .join(" ")
                );
            } else {
                setError(
                    error.response?.data?.message ||
                    "Une erreur est survenue."
                );
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">

            {/* Header */}
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-800">
                    Nouvelle demande de congé
                </h2>

                <p className="text-gray-500 mt-2">
                    Remplissez le formulaire pour envoyer votre demande.
                </p>
            </div>

            {/* Message succès */}
            {message && (
                <div className="mb-6 rounded-lg bg-green-100 border border-green-300 px-4 py-3 text-green-700">
                    ✅ {message}
                </div>
            )}

            {/* Message erreur */}
            {error && (
                <div className="mb-6 rounded-lg bg-red-100 border border-red-300 px-4 py-3 text-red-700">
                    ❌ {error}
                </div>
            )}

            {/* Formulaire */}
            <div className="bg-white rounded-2xl shadow-md p-8">

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Type de congé */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Type de congé
                        </label>

                        <select
                            name="type_conge_id"
                            value={form.type_conge_id}
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">
                                Sélectionner un type
                            </option>

                            {typesConge.map((type) => (
                                <option key={type.id} value={type.id}>
                                    {type.nom}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Dates */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Date de début
                            </label>

                            <input
                                type="date"
                                name="date_debut"
                                value={form.date_debut}
                                onChange={handleChange}
                                required
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Date de fin
                            </label>

                            <input
                                type="date"
                                name="date_fin"
                                value={form.date_fin}
                                onChange={handleChange}
                                required
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                    </div>

                    {/* Durée + Type journée */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Durée
                            </label>

                            <input
                                type="number"
                                name="duree"
                                value={form.duree}
                                onChange={handleChange}
                                min="0.5"
                                step="0.5"
                                placeholder="Ex: 3"
                                required
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Type de journée
                            </label>

                            <select
                                name="type_journee"
                                value={form.type_journee}
                                onChange={handleChange}
                                required
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="journee_entiere">
                                    Journée entière
                                </option>

                                <option value="matin">
                                    Matin
                                </option>

                                <option value="apres_midi">
                                    Après-midi
                                </option>
                            </select>
                        </div>

                    </div>

                    {/* Motif */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Motif
                        </label>

                        <textarea
                            name="motif"
                            value={form.motif}
                            onChange={handleChange}
                            rows="4"
                            placeholder="Écrivez le motif de votre demande..."
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        />
                    </div>

                    {/* Bouton */}
                    <div className="flex justify-end pt-4">

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold px-6 py-3 rounded-lg transition duration-200"
                        >
                            {loading
                                ? "Envoi en cours..."
                                : "Envoyer la demande"}
                        </button>

                    </div>

                </form>
            </div>
        </div>
    );
}

export default NouvelleDemande;