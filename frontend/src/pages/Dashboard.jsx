import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Loading } from "../components/Loading";

const Dashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        setLoading(true);
        setTimeout(() => {
            logout();
            navigate("/");
        }, 1500);
    };

    return (
        <div className="min-h-screen flex flex-col font-sans bg-gray-100 text-gray-800">
            <header className="bg-gray-200 p-4 text-center border-b border-gray-300">
                <h1 className="text-2xl font-semibold">Bienvenido</h1>
            </header>
            <main className="flex flex-1 items-center justify-center">
                {loading ? (
                    <Loading />
                ) : (
                    <button
                        className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition duration-300"
                        onClick={handleLogout}
                    >
                        Cerrar sesión
                    </button>
                )}
            </main>
        </div>
    );
};

export default Dashboard;