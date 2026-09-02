import Login from "./auth/Login";
import EmployeeDashboard from "./components/EmployeeDashboard";

function App() {
    const token = localStorage.getItem("token");

    return token ? <EmployeeDashboard /> : <Login />;
}

export default App;