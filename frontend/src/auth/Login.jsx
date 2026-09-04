import { useState } from "react";
import {useNavigate } from "react-router-dom"
import axios from "axios";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const handleLogin = async (e) => {
        e.preventDefault();

        setLoading(true);
        setMessage("");

      try {
        const response = await axios.post("http://localhost:8001/api/login", {
            email,
            password,
        });

            console.log(response.data);

            localStorage.setItem("token", response.data.token);
            localStorage.setItem(
                "employe",
                JSON.stringify(response.data.employe)
            );

            setMessage("Connexion réussie ✅");

setTimeout(() => {
    navigate('/')
}, 500);
        } catch (error) {
            console.error(error);

            setMessage(
                error.response?.data?.message ||
                "Email ou mot de passe incorrect"
            );
        } finally {
            setLoading(false);
        }
    };

    const isSuccess = message.includes("réussie");

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200/80 overflow-hidden">
                
                {/* En-tête / Header */}
                <div className="bg-slate-900 p-8 text-center text-white">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-600 rounded-xl mb-3 shadow-lg shadow-indigo-500/30">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight">Espace Administration</h1>
                    <p className="text-slate-400 text-sm mt-1">Accédez à la gestion de l'établissement</p>
                </div>

                {/* Formulaire */}
                <div className="p-8">
                    {message && (
                        <div className={`mb-6 p-4 rounded-xl text-sm font-medium border flex items-center gap-2 ${
                            isSuccess 
                                ? "bg-emerald-50 border-emerald-200 text-emerald-800" 
                                : "bg-rose-50 border-rose-200 text-rose-800"
                        }`}>
                            <span>{message}</span>
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="nom@exemple.com"
                                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all text-slate-800 text-sm bg-slate-50 focus:bg-white"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Mot de passe
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="••••••••"
                                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all text-slate-800 text-sm bg-slate-50 focus:bg-white"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-xl shadow-md shadow-indigo-600/20 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center text-sm"
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Connexion...
                                </span>
                            ) : (
                                "Se connecter"
                            )}
                        </button>
                    </form>
                </div>

                {/* Pied de carte */}
                <div className="bg-slate-50 px-8 py-4 border-t border-slate-100 text-center">
                    <p className="text-xs text-slate-400">
                        Portail sécurisé de l'administration scolaire
                    </p>
                </div>

            </div>
        </div>
    );
}

export default Login;