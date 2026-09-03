
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ role = "user" }) => {

    const navigate = useNavigate();

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
    };

    return (
        <nav
            style={{
                padding: "15px 25px",
                borderBottom: "1px solid #ddd",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}
        >

            <h2>📚 Digital Library</h2>

            <div style={{ display: "flex", gap: "15px" }}>

                {role === "user" ? (
                    <>
                        <Link to="/user/dashboard">
                            Dashboard
                        </Link>

                        <Link to="/user/books">
                            Books
                        </Link>

                        <Link to="/user/transactions">
                            My Transactions
                        </Link>

                        <Link to="/user/fines">
                            My Fines
                        </Link>
                    </>
                ) : (
                    <>
                        <Link to="/admin/dashboard">
                            Dashboard
                        </Link>

                        <Link to="/admin/users">
                            Users
                        </Link>

                        <Link to="/admin/books">
                            Books
                        </Link>

                        <Link to="/admin/categories">
                            Categories
                        </Link>

                        <Link to="/admin/transactions">
                            Transactions
                        </Link>

                        <Link to="/admin/overdue">
                            Overdue
                        </Link>
                    </>
                )}

                <button onClick={logout}>
                    Logout
                </button>

            </div>

        </nav>
    );
};

export default Navbar;
