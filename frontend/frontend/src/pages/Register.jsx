import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

const Register = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setSuccess(false);
            setMessage("Passwords do not match!");
            return;
        }

        try {
            const response = await api.post("/users/register", {
                username,
                email,
                password
            });

            console.log("REGISTER RESPONSE:", response.data);

            setSuccess(true);
            setMessage(
                response.data.message ||
                "Registration successful!"
            );

            setTimeout(() => {
                navigate("/");
            }, 1000);

        } catch (error) {
            console.error("REGISTER ERROR:", error);

            setSuccess(false);
            setMessage(
                error.response?.data?.message ||
                "Registration failed!"
            );
        }
    };

    return (
        <div className="login-page">

            <div className="login-card register-card">

                <h1 className="login-title">
                    Library Management System
                </h1>

                <h2 className="login-subtitle">
                    Create Account
                </h2>

                <form onSubmit={handleRegister}>

                    {/* Username */}
                    <div className="login-field">

                        <label htmlFor="username">
                            Username
                        </label>

                        <input
                            id="username"
                            type="text"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) =>
                                setUsername(e.target.value)
                            }
                            required
                        />

                    </div>


                    {/* Email */}
                    <div className="login-field">

                        <label htmlFor="email">
                            Email
                        </label>

                        <input
                            id="email"
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

                        <label htmlFor="password">
                            Password
                        </label>

                        <div className="password-input">

                            <input
                                id="password"
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                placeholder="Create a password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                required
                            />

                            <button
                                type="button"
                                className="show-password"
                                onClick={() =>
                                    setShowPassword(!showPassword)
                                }
                            >
                                {showPassword ? "🙈" : "👁️"}
                            </button>

                        </div>

                    </div>


                    {/* Confirm Password */}
                    <div className="login-field">

                        <label htmlFor="confirmPassword">
                            Confirm Password
                        </label>

                        <div className="password-input">

                            <input
                                id="confirmPassword"
                                type={
                                    showConfirmPassword
                                        ? "text"
                                        : "password"
                                }
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                required
                            />

                            <button
                                type="button"
                                className="show-password"
                                onClick={() =>
                                    setShowConfirmPassword(
                                        !showConfirmPassword
                                    )
                                }
                            >
                                {showConfirmPassword ? "🙈" : "👁️"}
                            </button>

                        </div>

                    </div>


                    {/* Message */}
                    {message && (
                        <p
                            className={
                                success
                                    ? "login-success"
                                    : "login-error"
                            }
                        >
                            {message}
                        </p>
                    )}


                    {/* Register Button */}
                    <button
                        type="submit"
                        className="login-button"
                    >
                        Create Account
                    </button>

                </form>


                {/* Login Link */}
                <p className="register-link">
                    Already have an account?{" "}

                    <Link to="/">
                        Login here
                    </Link>
                </p>

            </div>

        </div>
    );
};

export default Register;