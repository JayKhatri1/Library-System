import { Link, Outlet, useNavigate } from "react-router-dom";

const AdminLayout = () => {

    const navigate = useNavigate();

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/", { replace: true });
    };

    return (

        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column"
            }}
        >

            {/* HEADER */}

            <header
                style={{
                    padding: "15px 30px",
                    borderBottom: "1px solid #ddd",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}
            >

                <h2>
                    📚 Digital Library - Admin
                </h2>

                <button onClick={logout}>
                    Logout
                </button>

            </header>


            {/* BODY */}

            <div
                style={{
                    display: "flex",
                    flex: 1
                }}
            >

                {/* SIDEBAR */}

                <aside
                    style={{
                        width: "220px",
                        padding: "30px 20px",
                        borderRight: "1px solid #ddd"
                    }}
                >

                    <h2>
                        Admin Menu
                    </h2>

                    <p>
                        🏠{" "}
                        <Link to="/admin/dashboard">
                            Dashboard
                        </Link>
                    </p>

                    <p>
                        👥{" "}
                        <Link to="/admin/users">
                            Manage Users
                        </Link>
                    </p>

                    <p>
                        📚{" "}
                        <Link to="/admin/books">
                            Manage Books
                        </Link>
                    </p>

                    <p>
                        🏷️{" "}
                        <Link to="/admin/categories">
                            Manage Categories
                        </Link>
                    </p>

                    <p>
                        📄{" "}
                        <Link to="/admin/transactions">
                            All Transactions
                        </Link>
                    </p>

                    <p>
                        ⚠️{" "}
                        <Link to="/admin/overdue">
                            Overdue Books
                        </Link>
                    </p>

                </aside>


                {/* PAGE CONTENT */}

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

export default AdminLayout;