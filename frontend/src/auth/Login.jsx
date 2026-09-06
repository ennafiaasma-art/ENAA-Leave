import { useState } from "react";
import api from "../services/api"; // استخدام الملف الموحد للـ API

function Login({ setToken }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const response = await api.post("/login", {
                email: email.trim(),
                password: password,
            });

            const token = response.data.token;
            const userData = response.data.employe || response.data.user;

            // حفظ البيانات في LocalStorage
            localStorage.setItem("token", token);
            localStorage.setItem("employe", JSON.stringify(userData));

            setMessage("Connexion réussie ✅");

            // تحديث State في App.jsx للانتقال فوراً لـ Dashboard دون الحاجة لـ Reload
            if (setToken) {
                setToken(token);
            }

        } catch (error) {
            console.error("Login Error:", error.response?.data);
            setMessage(
                error.response?.data?.message || "Email ou mot de passe incorrect"
            );
        } finally {
            setLoading(false);
        }
    };

    // إضافة واجهة الإدخال (JSX) التي كانت مفقودة
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6 text-slate-800">Connexion</h2>
                
                {message && (
                    <div className={`p-3 rounded mb-4 text-sm ${message.includes("réussie") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                        {message}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Mot de passe</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200 disabled:opacity-50"
                    >
                        {loading ? "Chargement..." : "Se connecter"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;