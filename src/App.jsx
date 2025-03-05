import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Check localStorage for authentication status on initial load
    useEffect(() => {
        const authStatus = localStorage.getItem("isAuthenticated");
        if (authStatus === "true") {
            setIsAuthenticated(true);
        }
    }, []);

    return (
        <Router>
            <AuthProvider>
                <AppRoutes isAuthenticated={isAuthenticated} />
            </AuthProvider>
        </Router>
    );
};

export default App;
