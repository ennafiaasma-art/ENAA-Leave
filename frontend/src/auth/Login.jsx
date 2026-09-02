import { useState } from "react";
import axios from "axios";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        setLoading(true);
        setMessage("");

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/login",
                {
                    email,
                    password,
                }
            );

            console.log(response.data);

            localStorage.setItem("token", response.data.token);
            localStorage.setItem(
                "employe",
                JSON.stringify(response.data.employe)
            );

            setMessage("Connexion réussie ✅");

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

    return (
        <div>
            <h1>Connexion</h1>

            <form onSubmit={handleLogin}>

                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Mot de passe</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? "Connexion..." : "Se connecter"}
                </button>

            </form>

            {message && <p>{message}</p>}
        </div>
    );
}

export default Login;