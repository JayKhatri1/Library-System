
import { Link, Outlet, useNavigate } from "react-router-dom";

const UserLayout = () => {

    const navigate = useNavigate();

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#f5f6fa"
            }}
        >

            {/* ================================
                HEADER
            ================================= */}

            <header
                style={{
                    height: "65px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0 30px",
                    backgroundColor: "#ffffff",
                    borderBottom: "1px solid #ddd"
                }}
            >

                <h2>
                    📚 Digital Library
                </h2>

                <button onClick={logout}>
                    Logout
                </button>

            </header>


            {/* ================================
                MAIN AREA
            ================================= */}

            <div
                style={{
                    display: "flex",
                    flex: 1
                }}
            >

                {/* ============================
                    SIDEBAR
                ============================= */}

                <aside
                    style={{
                        width: "220px",
                        backgroundColor: "#ffffff",
                        borderRight: "1px solid #ddd",
                        padding: "25px 15px"
                    }}
                >

                    <h3>
                        Library Menu
                    </h3>


                    <nav
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "12px",
                            marginTop: "20px"
                        }}
                    >

                        <Link to="/user/dashboard">
                            🏠 Dashboard
                        </Link>

                        <Link to="/user/books">
                            📚 Books
                        </Link>

                        <Link to="/user/transactions">
                            📖 My Borrowed Books
                        </Link>

                        <Link to="/user/fines">
                            💰 My Fines
                        </Link>

                    </nav>

                </aside>


                {/* ============================
                    PAGE CONTENT
                ============================= */}

                <main
                    style={{
                        flex: 1,
                        padding: "30px"
                    }}
                >

                    <Outlet />

                </main>

            </div>

        </div>
    );
};

export default UserLayout;

