import { useState, useEffect } from "react";
import Register from "../pages/Auth/Register";
import Login from "../pages/Auth/Login";

const AuthLayout = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [transitionClass, setTransitionClass] = useState("scale-100 opacity-100");

  useEffect(() => {
    setTransitionClass("scale-100 opacity-100");
  }, [isLogin]);

  const handleToggle = () => {
    setTransitionClass("scale-0 opacity-0");
    setTimeout(() => {
      setIsLogin((prev) => !prev);
    }, 300);
  };

  return (
    <>
      <div className="flex justify-center items-center w-full min-h-screen py-10 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
        <div
          className={`transition-all duration-300 ease-in-out ${transitionClass}`}
        >
          {isLogin ? (
            <Login setIsLogin={handleToggle} />
          ) : (
            <Register setIsLogin={handleToggle} />
          )}
        </div>
      </div>
    </>
  );
};

export default AuthLayout;