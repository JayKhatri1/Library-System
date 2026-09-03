
// import { useEffect, useState } from "react";
// import api from "../services/api";

// const UserDashboard = () => {

//     const [dashboard, setDashboard] = useState({
//         totalBorrowed: 0,
//         currentlyBorrowed: 0,
//         returnedBooks: 0,
//         totalFine: 0
//     });

//     const [loading, setLoading] = useState(true);
//     const [message, setMessage] = useState("");


//     const getDashboard = async () => {

//         try {

//             setLoading(true);

//             const response = await api.get(
//                 "/users/dashboard"
//             );

//             console.log(
//                 "USER DASHBOARD:",
//                 response.data
//             );

//             setDashboard(
//                 response.data.dashboard || {
//                     totalBorrowed: 0,
//                     currentlyBorrowed: 0,
//                     returnedBooks: 0,
//                     totalFine: 0
//                 }
//             );

//             setMessage("");

//         } catch (error) {

//             console.log(
//                 "USER DASHBOARD ERROR:",
//                 error
//             );

//             setMessage(
//                 error.response?.data?.message ||
//                 "Unable to load dashboard"
//             );

//         } finally {

//             setLoading(false);
//         }
//     };


//     useEffect(() => {
//         getDashboard();
//     }, []);


//     if (loading) {

//         return (
//             <div>
//                 <h2>Loading dashboard...</h2>
//             </div>
//         );

//     }


//     return (
//         <div>

//             <h1 className="dashboard-title">
//                 User Dashboard
//             </h1>

//             <p className="dashboard-welcome">
//                 Welcome to your dashboard!
//             </p>

//             {message && (
//                 <p>{message}</p>
//             )}

//             <h2 className="summary-title">
//                 Library Summary
//             </h2>

//             <div className="summary-grid">

//                 <div className="summary-card">
//                     <h3>Total Borrowed</h3>
//                     <div className="summary-number">
//                         {dashboard.totalBorrowed}
//                     </div>
//                 </div>

//                 <div className="summary-card">
//                     <h3>Currently Borrowed</h3>
//                     <div className="summary-number">
//                         {dashboard.currentlyBorrowed}
//                     </div>
//                 </div>

//                 <div className="summary-card">
//                     <h3>Returned Books</h3>
//                     <div className="summary-number">
//                         {dashboard.returnedBooks}
//                     </div>
//                 </div>

//                 <div className="summary-card">
//                     <h3>Total Fine</h3>
//                     <div className="summary-number">
//                         ₹{dashboard.totalFine}
//                     </div>
//                 </div>

//             </div>

//         </div>
//     );
// };


// export default UserDashboard;

import { useEffect, useState } from "react";
import api from "../services/api";

const UserDashboard = () => {
    const [dashboard, setDashboard] = useState({
        totalBorrowed: 0,
        currentlyBorrowed: 0,
        returnedBooks: 0,
        totalFine: 0
    });

    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    const getDashboard = async () => {
        try {
            setLoading(true);

            const response = await api.get("/users/dashboard");

            console.log("USER DASHBOARD RESPONSE:", response.data);

            const data = response.data.dashboard;

            setDashboard({
                totalBorrowed: data?.totalBorrowed || 0,
                currentlyBorrowed: data?.currentlyBorrowed || 0,
                returnedBooks: data?.returnedBooks || 0,
                totalFine: data?.totalFine || 0
            });

            setMessage("");
        } catch (error) {
            console.log("USER DASHBOARD ERROR:", error);

            setMessage(
                error.response?.data?.message ||
                "Unable to load dashboard"
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
            <div className="page-message">
                <h2>Loading dashboard...</h2>
            </div>
        );
    }

    return (
        <div>
            <h1 className="dashboard-title">
                User Dashboard
            </h1>

            <p className="dashboard-welcome">
                Welcome to your dashboard!
            </p>

            {message && (
                <p className="page-message">
                    {message}
                </p>
            )}

            <h2 className="summary-title">
                Library Summary
            </h2>

            <div className="summary-grid">

                <div className="summary-card">
                    <p>Total Borrowed</p>
                    <h2 className="summary-number">
                        {dashboard.totalBorrowed}
                    </h2>
                </div>

                <div className="summary-card">
                    <p>Currently Borrowed</p>
                    <h2 className="summary-number">
                        {dashboard.currentlyBorrowed}
                    </h2>
                </div>

                <div className="summary-card">
                    <p>Returned Books</p>
                    <h2 className="summary-number">
                        {dashboard.returnedBooks}
                    </h2>
                </div>

                <div className="summary-card">
                    <p>Total Fine</p>
                    <h2 className="summary-number">
                        ₹{dashboard.totalFine}
                    </h2>
                </div>

            </div>
        </div>
    );
};

export default UserDashboard;