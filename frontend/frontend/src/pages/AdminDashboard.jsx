
// // import { useEffect, useState } from "react";
// // // import { Link } from "react-router-dom";
// // import api from "../services/api";
// // // import Navbar from "../components/Navbar";

// // const AdminDashboard = () => {

// //     const [dashboard, setDashboard] = useState({
// //         totalUsers: 0,
// //         totalBooks: 0,
// //         borrowedBooks: 0,
// //         returnedBooks: 0,
// //         overdueBooks: 0
// //     });

// //     const [loading, setLoading] = useState(true);
// //     const [message, setMessage] = useState("");

// //     const getDashboard = async () => {

// //         try {

// //             setLoading(true);

// //             const response = await api.get(
// //                 "/admin/dashboard"
// //             );

// //             console.log(
// //                 "ADMIN DASHBOARD:",
// //                 response.data
// //             );

// //             setDashboard(
// //                 response.data.dashboard || {
// //                     totalUsers: 0,
// //                     totalBooks: 0,
// //                     borrowedBooks: 0,
// //                     returnedBooks: 0,
// //                     overdueBooks: 0
// //                 }
// //             );

// //             setMessage("");

// //         } catch (error) {

// //             console.log(
// //                 "ADMIN DASHBOARD ERROR:",
// //                 error
// //             );

// //             setMessage(
// //                 error.response?.data?.message ||
// //                 "Unable to load admin dashboard"
// //             );

// //         } finally {

// //             setLoading(false);
// //         }
// //     };


// //     useEffect(() => {
// //         getDashboard();
// //     }, []);


// //     if (loading) {
// //         return (
// //             <div>
// //                 {/* <Navbar role="admin" /> */}

// //                 <div style={{ padding: "30px" }}>
// //                     <h2>Loading dashboard...</h2>
// //                 </div>
// //             </div>
// //         );
// //     }


// //     return (
// //         <div>


// //             <div style={{ padding: "30px" }}>

// //                 <h1>
// //                     Admin Dashboard
// //                 </h1>

// //                 <p>
// //                     Welcome to the library administration panel!
// //                 </p>


// //                 {message && (
// //                     <p>
// //                         {message}
// //                     </p>
// //                 )}


// //                 {/* =================================
// //                     LIBRARY STATISTICS
// //                 ================================= */}

// //                 <h2 style={{ marginTop: "30px" }}>
// //                     Library Statistics
// //                 </h2>


// //                 <div
// //                     style={{
// //                         display: "grid",
// //                         gridTemplateColumns:
// //                             "repeat(5, 1fr)",
// //                         gap: "20px",
// //                         marginTop: "20px"
// //                     }}
// //                 >

// //                     {/* USERS */}

// //                     <div
// //                         style={{
// //                             padding: "20px",
// //                             border: "1px solid #ddd",
// //                             borderRadius: "10px"
// //                         }}
// //                     >

// //                         <h3>
// //                             Total Users
// //                         </h3>

// //                         <h1>
// //                             {dashboard.totalUsers}
// //                         </h1>

// //                     </div>


// //                     {/* BOOKS */}

// //                     <div
// //                         style={{
// //                             padding: "20px",
// //                             border: "1px solid #ddd",
// //                             borderRadius: "10px"
// //                         }}
// //                     >

// //                         <h3>
// //                             Total Books
// //                         </h3>

// //                         <h1>
// //                             {dashboard.totalBooks}
// //                         </h1>

// //                     </div>


// //                     {/* BORROWED */}

// //                     <div
// //                         style={{
// //                             padding: "20px",
// //                             border: "1px solid #ddd",
// //                             borderRadius: "10px"
// //                         }}
// //                     >

// //                         <h3>
// //                             Borrowed Books
// //                         </h3>

// //                         <h1>
// //                             {dashboard.borrowedBooks}
// //                         </h1>

// //                     </div>


// //                     {/* RETURNED */}

// //                     <div
// //                         style={{
// //                             padding: "20px",
// //                             border: "1px solid #ddd",
// //                             borderRadius: "10px"
// //                         }}
// //                     >

// //                         <h3>
// //                             Returned Books
// //                         </h3>

// //                         <h1>
// //                             {dashboard.returnedBooks}
// //                         </h1>

// //                     </div>


// //                     {/* OVERDUE */}

// //                     <div
// //                         style={{
// //                             padding: "20px",
// //                             border: "1px solid #ddd",
// //                             borderRadius: "10px"
// //                         }}
// //                     >

// //                         <h3>
// //                             Overdue Books
// //                         </h3>

// //                         <h1>
// //                             {dashboard.overdueBooks}
// //                         </h1>

// //                     </div>

// //                 </div>


// //                 {/* =================================
// //                     ADMIN ACTIONS
// //                 ================================= */}

// //                 {/* <h2 style={{ marginTop: "40px" }}>
// //                     Management
// //                 </h2> */}

// // {/* 
// //                 <div
// //                     style={{
// //                         display: "flex",
// //                         flexWrap: "wrap",
// //                         gap: "15px",
// //                         marginTop: "20px"
// //                     }}
// //                 >

// //                     <Link to="/admin/users">
// //                         <button>
// //                             Manage Users
// //                         </button>
// //                     </Link>


// //                     <Link to="/admin/books">
// //                         <button>
// //                             Manage Books
// //                         </button>
// //                     </Link>


// //                     <Link to="/admin/categories">
// //                         <button>
// //                             Manage Categories
// //                         </button>
// //                     </Link>


// //                     <Link to="/admin/transactions">
// //                         <button>
// //                             All Transactions
// //                         </button>
// //                     </Link>


// //                     <Link to="/admin/overdue">
// //                         <button>
// //                             Overdue Books
// //                         </button>
// //                     </Link>

// //                 </div>  */}

// //             </div>

// //         </div>
// //     );
// // };

// // export default AdminDashboard;

// import { useEffect, useState } from "react";
// import api from "../services/api";

// const AdminDashboard = () => {

//     const [dashboard, setDashboard] = useState({
//         totalUsers: 0,
//         totalBooks: 0,
//         borrowedBooks: 0,
//         returnedBooks: 0,
//         overdueBooks: 0
//     });

//     const [loading, setLoading] = useState(true);
//     const [message, setMessage] = useState("");


//     // ==========================================
//     // GET ADMIN DASHBOARD
//     // ==========================================

//     const getDashboard = async () => {

//         try {

//             setLoading(true);
//             setMessage("");

//             const response = await api.get(
//                 "/admin/dashboard"
//             );

//             console.log(
//                 "ADMIN DASHBOARD:",
//                 response.data
//             );

//             setDashboard(
//                 response.data.dashboard || {
//                     totalUsers: 0,
//                     totalBooks: 0,
//                     borrowedBooks: 0,
//                     returnedBooks: 0,
//                     overdueBooks: 0
//                 }
//             );

//         } catch (error) {

//             console.log(
//                 "ADMIN DASHBOARD ERROR:",
//                 error
//             );

//             setMessage(
//                 error.response?.data?.message ||
//                 "Unable to load admin dashboard"
//             );

//         } finally {

//             setLoading(false);
//         }
//     };


//     // ==========================================
//     // LOAD DASHBOARD
//     // ==========================================

//     useEffect(() => {
//         getDashboard();
//     }, []);


//     // ==========================================
//     // LOADING
//     // ==========================================

//     if (loading) {

//         return (
//             <div>

//                 <h2>
//                     Loading dashboard...
//                 </h2>

//             </div>
//         );
//     }


//     // ==========================================
//     // DASHBOARD
//     // ==========================================

//     return (

//         <div>

//             <h1>
//                 Admin Dashboard
//             </h1>

//             <p>
//                 Welcome to the library administration panel!
//             </p>


//             {message && (
//                 <p>
//                     {message}
//                 </p>
//             )}


//             {/* ==========================================
//                 LIBRARY STATISTICS
//             ========================================== */}

//             <h2
//                 style={{
//                     marginTop: "30px"
//                 }}
//             >
//                 Library Statistics
//             </h2>


//             <div
//                 style={{
//                     display: "grid",
//                     gridTemplateColumns:
//                         "repeat(auto-fit, minmax(160px, 1fr))",
//                     gap: "20px",
//                     marginTop: "20px"
//                 }}
//             >


//                 {/* TOTAL USERS */}

//                 <div
//                     style={{
//                         padding: "20px",
//                         border: "1px solid #ddd",
//                         borderRadius: "10px",
//                         textAlign: "center"
//                     }}
//                 >

//                     <h3>
//                         Total Users
//                     </h3>

//                     <h1>
//                         {dashboard.totalUsers}
//                     </h1>

//                 </div>


//                 {/* TOTAL BOOKS */}

//                 <div
//                     style={{
//                         padding: "20px",
//                         border: "1px solid #ddd",
//                         borderRadius: "10px",
//                         textAlign: "center"
//                     }}
//                 >

//                     <h3>
//                         Total Books
//                     </h3>

//                     <h1>
//                         {dashboard.totalBooks}
//                     </h1>

//                 </div>


//                 {/* BORROWED BOOKS */}

//                 <div
//                     style={{
//                         padding: "20px",
//                         border: "1px solid #ddd",
//                         borderRadius: "10px",
//                         textAlign: "center"
//                     }}
//                 >

//                     <h3>
//                         Borrowed Books
//                     </h3>

//                     <h1>
//                         {dashboard.borrowedBooks}
//                     </h1>

//                 </div>


//                 {/* RETURNED BOOKS */}

//                 <div
//                     style={{
//                         padding: "20px",
//                         border: "1px solid #ddd",
//                         borderRadius: "10px",
//                         textAlign: "center"
//                     }}
//                 >

//                     <h3>
//                         Returned Books
//                     </h3>

//                     <h1>
//                         {dashboard.returnedBooks}
//                     </h1>

//                 </div>


//                 {/* OVERDUE BOOKS */}

//                 <div
//                     style={{
//                         padding: "20px",
//                         border: "1px solid #ddd",
//                         borderRadius: "10px",
//                         textAlign: "center"
//                     }}
//                 >

//                     <h3>
//                         Overdue Books
//                     </h3>

//                     <h1>
//                         {dashboard.overdueBooks}
//                     </h1>

//                 </div>

//             </div>

//         </div>
//     );
// };

// export default AdminDashboard;
import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
    const [dashboard, setDashboard] = useState({
        totalUsers: 0,
        totalBooks: 0,
        borrowedBooks: 0,
        returnedBooks: 0,
        overdueBooks: 0
    });

    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    const getDashboard = async () => {
        try {
            setLoading(true);

            const response = await api.get("/admin/dashboard");

            console.log("ADMIN DASHBOARD:", response.data);

            setDashboard({
                totalUsers: response.data.dashboard?.totalUsers || 0,
                totalBooks: response.data.dashboard?.totalBooks || 0,
                borrowedBooks:
                    response.data.dashboard?.borrowedBooks || 0,
                returnedBooks:
                    response.data.dashboard?.returnedBooks || 0,
                overdueBooks:
                    response.data.dashboard?.overdueBooks || 0
            });

            setMessage("");
        } catch (error) {
            console.log("ADMIN DASHBOARD ERROR:", error);

            setMessage(
                error.response?.data?.message ||
                "Unable to load admin dashboard"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getDashboard();
    }, []);

    if (loading) {
        return (
            <div className="admin-page-message">
                <h2>Loading admin dashboard...</h2>
            </div>
        );
    }

    return (
        <div className="admin-dashboard">

            {/* Header */}

            <div className="admin-dashboard-header">
                <div>
                    <h1 className="admin-dashboard-title">
                        Admin Dashboard
                    </h1>

                    <p className="admin-dashboard-welcome">
                        Manage your digital library from one place.
                    </p>
                </div>
            </div>

            {message && (
                <p className="admin-page-message">
                    {message}
                </p>
            )}

            {/* Statistics */}

            <h2 className="admin-section-title">
                Library Overview
            </h2>

            <div className="admin-stat-grid">

                <div className="admin-stat-card">
                    <div className="admin-stat-icon">
                        👥
                    </div>

                    <div>
                        <p>Total Users</p>
                        <h2>{dashboard.totalUsers}</h2>
                    </div>
                </div>

                <div className="admin-stat-card">
                    <div className="admin-stat-icon">
                        📚
                    </div>

                    <div>
                        <p>Total Books</p>
                        <h2>{dashboard.totalBooks}</h2>
                    </div>
                </div>

                <div className="admin-stat-card">
                    <div className="admin-stat-icon">
                        📖
                    </div>

                    <div>
                        <p>Borrowed Books</p>
                        <h2>{dashboard.borrowedBooks}</h2>
                    </div>
                </div>

                <div className="admin-stat-card">
                    <div className="admin-stat-icon">
                        ✅
                    </div>

                    <div>
                        <p>Returned Books</p>
                        <h2>{dashboard.returnedBooks}</h2>
                    </div>
                </div>

                <div className="admin-stat-card overdue-card">
                    <div className="admin-stat-icon">
                        ⚠️
                    </div>

                    <div>
                        <p>Overdue Books</p>
                        <h2>{dashboard.overdueBooks}</h2>
                    </div>
                </div>

            </div>

            {/* Quick Management */}

            <h2 className="admin-section-title">
                Quick Management
            </h2>

            <div className="admin-management-grid">

                <Link
                    to="/admin/users"
                    className="admin-management-card"
                >
                    <span>👥</span>

                    <div>
                        <h3>Manage Users</h3>
                        <p>View all registered users.</p>
                    </div>
                </Link>

                <Link
                    to="/admin/books"
                    className="admin-management-card"
                >
                    <span>📚</span>

                    <div>
                        <h3>Manage Books</h3>
                        <p>Add, edit and delete books.</p>
                    </div>
                </Link>

                <Link
                    to="/admin/categories"
                    className="admin-management-card"
                >
                    <span>📂</span>

                    <div>
                        <h3>Categories</h3>
                        <p>Manage book categories.</p>
                    </div>
                </Link>

                <Link
                    to="/admin/transactions"
                    className="admin-management-card"
                >
                    <span>📋</span>

                    <div>
                        <h3>Transactions</h3>
                        <p>View all borrowing activity.</p>
                    </div>
                </Link>

                <Link
                    to="/admin/overdue"
                    className="admin-management-card"
                >
                    <span>⚠️</span>

                    <div>
                        <h3>Overdue Books</h3>
                        <p>Check books that are overdue.</p>
                    </div>
                </Link>

            </div>

        </div>
    );
};

export default AdminDashboard;