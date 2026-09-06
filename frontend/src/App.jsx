import { useState, useEffect } from "react";
import Login from "./auth/Login";
import EmployeeDashboard from "./components/EmployeeDashboard";

function App() {
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // جلب التوكن والتأكد من أنه قيمة صحيحة
        const storedToken = localStorage.getItem("token");
        
        if (storedToken && storedToken !== "undefined" && storedToken !== "null") {
            setToken(storedToken);
        } else {
            setToken(null);
        }
        
        setLoading(false);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setToken(null);
    };

    if (loading) {
        return (
            <div style={{ padding: "20px", textAlign: "center" }}>
                <p>Chargement...</p>
            </div>
        );
    }

    return token ? (
        <EmployeeDashboard token={token} onLogout={handleLogout} />
    ) : (
        <Login setToken={setToken} />
    );
}

export default App;