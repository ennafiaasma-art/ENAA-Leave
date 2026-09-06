import { useState, useEffect } from "react";
import api from "../services/api";

function NouvelleDemande() {
    // 🛠️ أنواع العطل مقادة يدوياً هنا
    const [typesConge] = useState([
        { id: 1, nom: "Congé Annuel" },
        { id: 2, nom: "Congé Maladie" },
        { id: 3, nom: "Congé Sans Solde" },
        { id: 4, nom: "Autorisation d'absence" },
    ]);

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

    // Calcul automatique de la durée si dates renseignées
    useEffect(() => {
        if (form.date_debut && form.date_fin) {
            const start = new Date(form.date_debut);
            const end = new Date(form.date_fin);

            if (end >= start) {
                const diffTime = Math.abs(end - start);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

                if (diffDays === 1 && form.type_journee !== "journee_entiere") {
                    setForm((prev) => ({ ...prev, duree: 0.5 }));
                } else {
                    setForm((prev) => ({ ...prev, duree: diffDays }));
                }
            }
        }
    }, [form.date_debut, form.date_fin, form.type_journee]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

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

            setMessage(response.data.message || "Demande envoyée avec succès.");

            setForm({
                type_conge_id: "",
                date_debut: "",
                date_fin: "",
                duree: "",
                type_journee: "journee_entiere",
                motif: "",
            });
        } catch (error) {
            if (error.response?.data?.errors) {
                setError(Object.values(error.response.data.errors).flat().join(" "));
            } else {
                setError(error.response?.data?.message || "Une erreur est survenue.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-800">
                    Nouvelle demande de congé
                </h2>
                <p className="text-gray-500 mt-2">
                    Remplissez le formulaire pour envoyer votre demande.
                </p>
            </div>

            {message && (
                <div className="mb-6 rounded-lg bg-green-100 border border-green-300 px-4 py-3 text-green-700">
                    ✅ {message}
                </div>
            )}

            {error && (
                <div className="mb-6 rounded-lg bg-red-100 border border-red-300 px-4 py-3 text-red-700">
                    ❌ {error}
                </div>
            )}

            <div className="bg-white rounded-2xl shadow-md p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
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
                            <option value="">Sélectionner un type</option>
                            {typesConge.map((type) => (
                                <option key={type.id} value={type.id}>
                                    {type.nom}
                                </option>
                            ))}
                        </select>
                    </div>

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
                                min={form.date_debut}
                                onChange={handleChange}
                                required
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Durée (jours)
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
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
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
                                <option value="journee_entiere">Journée entière</option>
                                <option value="matin">Matin</option>
                                <option value="apres_midi">Après-midi</option>
                            </select>
                        </div>
                    </div>

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

                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold px-6 py-3 rounded-lg transition duration-200"
                        >
                            {loading ? "Envoi en cours..." : "Envoyer la demande"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default NouvelleDemande;