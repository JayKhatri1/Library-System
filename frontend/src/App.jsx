import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";

import UserDashboard from "./pages/UserDashboard";
import Books from "./pages/Books";
import MyTransactions from "./pages/MyTransactions";
import UserFines from "./pages/UserFines";

import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import AdminBooks from "./pages/AdminBooks";
import AdminTransactions from "./pages/AdminTransactions";
import AdminOverdue from "./pages/AdminOverdue";

import AddBook from "./pages/AddBook";
import EditBook from "./pages/EditBook";

import AdminCategories from "./pages/AdminCategories";
import AddCategory from "./pages/AddCategory";
import EditCategory from "./pages/EditCategory";

import ProtectedRoute from "./components/ProtectedRoute";
import UserLayout from "./components/UserLayout";
import AdminLayout from "./components/AdminLayout";
import Register from "./pages/Register";


function App() {

    return (
        <BrowserRouter>

            <Routes>

                {/* LOGIN */}

                <Route
                    path="/"
                    element={<Login />}
                />



                <Route path="/register" element={<Register />} />


                {/* =========================
                    USER ROUTES
                ========================= */}

                <Route
                    path="/user"
                    element={
                        <ProtectedRoute allowedRole="user">
                            <UserLayout />
                        </ProtectedRoute>
                    }
                >

                    <Route
                        path="dashboard"
                        element={<UserDashboard />}
                    />

                    <Route
                        path="books"
                        element={<Books />}
                    />

                    <Route
                        path="transactions"
                        element={<MyTransactions />}
                    />

                    <Route
                        path="fines"
                        element={<UserFines />}
                    />

                </Route>


                {/* =========================
                    ADMIN ROUTES
                ========================= */}

                <Route
                    path="/admin"
                    element={

                        <AdminLayout />
                    }
                >

                    <Route
                        path="dashboard"
                        element={<AdminDashboard />}
                    />

                    <Route
                        path="users"
                        element={<AdminUsers />}
                    />

                    <Route
                        path="books"
                        element={<AdminBooks />}
                    />

                    <Route
                        path="books/add"
                        element={<AddBook />}
                    />

                    <Route
                        path="books/edit/:id"
                        element={<EditBook />}
                    />

                    <Route
                        path="categories"
                        element={<AdminCategories />}
                    />

                    <Route
                        path="categories/add"
                        element={<AddCategory />}
                    />

                    <Route
                        path="/admin/categories/edit/:id"
                        element={
                            <ProtectedRoute allowedRole="admin">
                                <EditCategory />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="transactions"
                        element={<AdminTransactions />}
                    />

                    <Route
                        path="overdue"
                        element={<AdminOverdue />}
                    />

                </Route>


                {/* FALLBACK */}

                <Route
                    path="*"
                    element={<Login />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;