import React, { useState } from "react";
import { Loading } from "./Loading";
import { FormError } from "./FormError";
import useValidation from "../utils/validation";
import Input from "./Input";
import Button from "./Button";

const AuthForm = ({ title, description, submitText, onSubmit, isLogin, setIsLogin, redirect, imageOrder }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { errors, validateLogin } = useValidation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        if (!validateLogin(email, password)) return;
        setLoading(true);

        try {
            await onSubmit(email, password);
            if (redirect) {
                redirect();
            }
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    return (
        <div className="">
            {loading ? (
                <Loading />
            ) : (
                <div className="mx-auto max-w-md p-6 overflow-hidden md:p-0 lg:rounded-xl lg:shadow-md lg:max-w-4xl lg:h-[35rem] xl:max-w-7xl xl:h-[50rem]">
                    <div className="lg:grid lg:grid-cols-2 h-full">
                        <div className={`p-8 flex justify-center rounded-3xl items-center flex-col bg-night-shadow font-orbitron text-white text-center lg:rounded-none ${imageOrder}`}>
                            <img
                                className="h-32 w-auto object-cover md:h-44 xl:h-auto xl:w-80"
                                src="/img/ilustrate-icon.webp"
                                alt="Icon-Ilustrate"
                            />
                            <h1 className="font-black md:text-3xl xl:mt-7 xl:mb-2 xl:text-5xl">JQ Selene</h1>
                            <p className="xl:text-lg">Where creativity aligns with the cosmos.</p>
                        </div>

                        <div className="h-full content-center pt-20 font-montserrat-alternates text-white lg:text-night-shadow lg:bg-white lg:px-14 lg:pt-0 xl:px-20">
                            <div className="text-center">
                                <h2 className="text-2xl font-[1000] sm:text-3xl lg:text-2xl xl:text-3xl">{title}</h2>
                                <p className="mb-10 mt-2 font-normal text-sm xl:text-base ">{description}</p>
                            </div>
                            {error && <FormError message={error} />}
                            <form onSubmit={handleSubmit}>
                                <Input
                                    type="email"
                                    label="Correo Electronico"
                                    placeholder="test@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    error={errors.email}
                                />
                                <Input
                                    type="password"
                                    label="Contraseña"
                                    placeholder="Contraseña"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    error={errors.password}
                                />
                                <Button type="submit" disabled={loading}>
                                    {submitText}
                                </Button>
                            </form>

                            <p className="w-full text-end mt-2">
                                {isLogin ? "¿No tienes cuenta? " : "¿Ya tienes cuenta? "}
                                <span onClick={() => setIsLogin(!isLogin)} className="text-blue-500 cursor-pointer">
                                    {isLogin ? "Regístrate aquí" : "Inicia sesión aquí"}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AuthForm;