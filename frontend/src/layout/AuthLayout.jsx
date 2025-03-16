import { useState } from "react";
import Register from "../pages/Auth/Register";
import Login from "../pages/Auth/Login";

const AuthLayout = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
      <div className="relative z-10 flex justify-center items-center w-full h-screen">
        {isLogin ? (
          <Login setIsLogin={setIsLogin} />
        ) : (
          <Register setIsLogin={setIsLogin} />
        )}
      </div>
    </>
  );
};

export default AuthLayout;
