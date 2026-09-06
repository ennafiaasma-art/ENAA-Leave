import { useState } from "react";
import NouvelleDemande from "./NouvelleDemande";
import MesDemandes from "./MesDemandes";

function EmployeeDashboard() {
    const employeData = localStorage.getItem("employe");
    let employe = null;

    try {
        employe = employeData ? JSON.parse(employeData) : null;
    } catch (error) {
        console.error("Erreur données employé :", error);
        localStorage.removeItem("employe");
    }

    // استخدام حالة واحدة للتحكم في الواجهة المعروضة
    const [activeView, setActiveView] = useState("dashboard"); // 'dashboard' | 'nouvelle' | 'mes_demandes'

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("employe");
        window.location.href = "/";
    };

    return (
        <div className="min-h-screen bg-gray-100">

            {/* Navbar */}
            <nav className="bg-white shadow px-8 py-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-blue-600">
                    Gestion des Congés
                </h1>

                <div className="flex items-center gap-4">
                    <span className="text-gray-700">
                        {employe?.prenom || ""} {employe?.nom || ""}
                    </span>

                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                    >
                        Déconnexion
                    </button>
                </div>
            </nav>

            {/* Content */}
            <main className="p-8">

                {/* ================= MES DEMANDES ================= */}
                {activeView === "mes_demandes" && (
                    <div>
                        <button
                            onClick={() => setActiveView("dashboard")}
                            className="mb-6 text-blue-600 hover:text-blue-800 font-semibold"
                        >
                            ← Retour au dashboard
                        </button>

                        <MesDemandes />
                    </div>
                )}

                {/* ================= NOUVELLE DEMANDE ================= */}
                {activeView === "nouvelle" && (
                    <div>
                        <button
                            onClick={() => setActiveView("dashboard")}
                            className="mb-6 text-blue-600 hover:text-blue-800 font-semibold"
                        >
                            ← Retour au dashboard
                        </button>

                        <NouvelleDemande
                            onBack={() => setActiveView("dashboard")}
                        />
                    </div>
                )}

                {/* ================= DASHBOARD ================= */}
                {activeView === "dashboard" && (
                    <>
                        <h2 className="text-3xl font-bold text-gray-800">
                            Bienvenue {employe?.prenom || ""} 👋
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Voici votre espace personnel.
                        </p>

                        {/* Informations employé */}
                        <div className="bg-white rounded-xl shadow p-6 mt-8">
                            <h3 className="text-xl font-semibold mb-4">
                                Mes informations
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-gray-500">Nom</p>
                                    <p className="font-semibold">{employe?.nom || "Non renseigné"}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500">Prénom</p>
                                    <p className="font-semibold">{employe?.prenom || "Non renseigné"}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500">Email</p>
                                    <p className="font-semibold">{employe?.email || "Non renseigné"}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500">Département</p>
                                    <p className="font-semibold">{employe?.departement || "Non renseigné"}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500">Rôle</p>
                                    <p className="font-semibold">{employe?.role || "Non renseigné"}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500">Téléphone</p>
                                    <p className="font-semibold">{employe?.telephone || "Non renseigné"}</p>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

                            {/* Nouvelle demande */}
                            <div className="bg-white p-6 rounded-xl shadow">
                                <h3 className="text-lg font-semibold">📝 Demander un congé</h3>
                                <p className="text-gray-500 mt-2">Créer une nouvelle demande de congé.</p>
                                <button
                                    onClick={() => setActiveView("nouvelle")}
                                    className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                                >
                                    + Ajouter une demande
                                </button>
                            </div>

                            {/* Mes demandes */}
                            <div className="bg-white p-6 rounded-xl shadow">
                                <h3 className="text-lg font-semibold">📋 Mes demandes</h3>
                                <p className="text-gray-500 mt-2">Consulter l'état de vos demandes.</p>
                                <button
                                    onClick={() => setActiveView("mes_demandes")}
                                    className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                                >
                                    Voir mes demandes
                                </button>
                            </div>

                            {/* Notifications */}
                            <div className="bg-white p-6 rounded-xl shadow">
                                <h3 className="text-lg font-semibold">🔔 Notifications</h3>
                                <p className="text-gray-500 mt-2">Consulter vos notifications.</p>
                                <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">
                                    Mes notifications
                                </button>
                            </div>

                        </div>
                    </>
                )}

            </main>
        </div>
    );
}

export default EmployeeDashboard;