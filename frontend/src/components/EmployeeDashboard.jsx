import { useState } from "react";
import NouvelleDemande from "./NouvelleDemande";
function EmployeeDashboard() {
    const employe = JSON.parse(localStorage.getItem("employe"));

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
                        {employe?.prenom} {employe?.nom}
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

                <h2 className="text-3xl font-bold text-gray-800">
                    Bienvenue {employe?.prenom} 👋
                </h2>

                <p className="text-gray-500 mt-2">
                    Voici votre espace personnel.
                </p>

                {/* Informations employé */}
                <div className="bg-white rounded-xl shadow p-6 mt-8">
                    <h3 className="text-xl font-semibold mb-4">
                        Mes informations
                    </h3>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-gray-500">Nom</p>
                            <p className="font-semibold">
                                {employe?.nom}
                            </p>
                        </div>

                        <div>
                            <p className="text-gray-500">Prénom</p>
                            <p className="font-semibold">
                                {employe?.prenom}
                            </p>
                        </div>

                        <div>
                            <p className="text-gray-500">Email</p>
                            <p className="font-semibold">
                                {employe?.email}
                            </p>
                        </div>

                        <div>
                            <p className="text-gray-500">Département</p>
                            <p className="font-semibold">
                                {employe?.departement}
                            </p>
                        </div>

                        <div>
                            <p className="text-gray-500">Rôle</p>
                            <p className="font-semibold">
                                {employe?.role}
                            </p>
                        </div>

                        <div>
                            <p className="text-gray-500">Téléphone</p>
                            <p className="font-semibold">
                                {employe?.telephone}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

                    <div className="bg-white p-6 rounded-xl shadow">
                        <h3 className="text-lg font-semibold">
                            📝 Demander un congé
                        </h3>

                        <p className="text-gray-500 mt-2">
                            Créer une nouvelle demande de congé.
                        </p>

                        <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg">
                            Nouvelle demande
                        </button>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow">
                        <h3 className="text-lg font-semibold">
                            📋 Mes demandes
                        </h3>

                        <p className="text-gray-500 mt-2">
                            Consulter l'état de vos demandes.
                        </p>

                        <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg">
                            Voir mes demandes
                        </button>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow">
                        <h3 className="text-lg font-semibold">
                            🔔 Notifications
                        </h3>

                        <p className="text-gray-500 mt-2">
                            Consulter vos notifications.
                        </p>

                        <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg">
                            Mes notifications
                        </button>
                    </div>

                </div>

            </main>
        </div>
    );
}

export default EmployeeDashboard;