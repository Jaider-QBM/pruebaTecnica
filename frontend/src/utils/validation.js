import { useState } from "react";

const useValidation = () => {
    const [errors, setErrors] = useState({});

    const validateLogin = (email, password) => {
        let validationErrors = {};

        if (!email.trim()) {
            validationErrors.email = "El campo Email es requerido.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            validationErrors.email = "El formato del Email no es válido.";
        }

        if (!password.trim()) {
            validationErrors.password = "El campo Contraseña es requerido.";
        } else if (password.length < 6) {
            validationErrors.password = "La contraseña debe tener al menos 6 caracteres.";
        }

        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0; // Retorna true si no hay errores
    };

    return { errors, validateLogin };
};

export default useValidation;
