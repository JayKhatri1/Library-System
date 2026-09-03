import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("/users/login", {
                email,
                password
            });

            localStorage.setItem("token", response.data.token);

            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            console.log("LOGIN RESPONSE:", response.data);

            const user = response.data.user;

            if (user.role === "admin") {
                navigate("/admin/dashboard");
            } else {
                navigate("/user/dashboard");
            }

        } catch (error) {
            console.error("LOGIN ERROR:", error);

            setMessage(
                error.response?.data?.message ||
                "Login failed!"
            );
        }
    };

    return (
        <div className="login-page">

            <div className="login-card">

                <h1 className="login-title">
                    Library Management System
                </h1>

                <h2 className="login-subtitle">
                    Login
                </h2>

                <form onSubmit={handleLogin}>

                    {/* Email */}
                    <div className="login-field">

                        <label>Email</label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            required
                        />

                    </div>


                    {/* Password */}
                    <div className="login-field">

                        <label>Password</label>

                        <div className="password-input">

                            <input
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                required
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowPassword(!showPassword)
                                }
                                className="show-password"
                            >
                                {showPassword ? "🙈" : "👁️"}
                            </button>

                        </div>

                    </div>


                    {/* Error */}
                    {message && (
                        <p className="login-error">
                            {message}
                        </p>
                    )}


                    {/* Login Button */}
                    <button
                        type="submit"
                        className="login-button"
                    >
                        Login
                    </button>

                </form>


                {/* Register */}
                <p className="register-link">
                    Don't have an account?{" "}
                    <Link to="/register">
                        Register here
                    </Link>
                </p>

            </div>

        </div>
    );
};

export default Login;