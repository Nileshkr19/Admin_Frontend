import React, { useEffect } from "react";

const SetupAdminCredentials = () => {
    useEffect(() => {
        // Check if phone and password are already set in localStorage
        if (!localStorage.getItem("phone") || !localStorage.getItem("password")) {
            localStorage.setItem("phone", "7367934117");
            localStorage.setItem("password", "Nilesh@1");
        }
    }, []);

    return null;
};

export default SetupAdminCredentials;
