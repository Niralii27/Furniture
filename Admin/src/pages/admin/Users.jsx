import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { Pagination, Box } from "@mui/material";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(5); // for pagination
    const [searchQuery, setSearchQuery] = useState(""); // for searching

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        axios.get("http://localhost:5000/api/User/view-user")
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                console.error("Error fetching users:", error);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to fetch users."
                });
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleDelete = (userId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This user will be permanently deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:5000/api/User/delete-user/${userId}`)
                    .then(() => {
                        Swal.fire("Deleted!", "User has been deleted.", "success");
                        fetchUsers();
                    })
                    .catch((error) => {
                        console.error("Error deleting user:", error);
                        Swal.fire("Error!", "Failed to delete user.", "error");
                    });
            }
        });
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    // Filtered user list
    const filteredUsers = users.filter((user) =>
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.phone.toString().includes(searchQuery)
    );

    const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
    const indexOfLastUser = currentPage * rowsPerPage;
    const indexOfFirstUser = indexOfLastUser - rowsPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mt-5 mb-5 flex-wrap">
                <div>
                    <h1>Users</h1>
                    <ol className="breadcrumb mb-0">
                        <li className="breadcrumb-item"><Link to="/admin">Dashboard</Link></li>
                        <li className="breadcrumb-item active">Users</li>
                    </ol>
                </div>


                {/* for search */}
                <div className="d-flex align-items-center gap-2 mt-3 mt-md-0">
                    <input
                        type="text"
                        className="form-control"
                        style={{ maxWidth: "300px" }}
                        placeholder="Search by name, email or phone..."
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setCurrentPage(1); // reset to first page on new search
                        }}
                    />

                    <Link className="btn btn-outline-secondary" to="/admin">
                        <i className="fas fa-arrow-left"></i>
                    </Link>
                    <Link className="btn btn-primary text-nowrap" to="/admin/add-user">
                        <i className="fas fa-user-plus fa-lg"></i>
                    </Link>
                </div>
            </div>

            <div className="card-body">
                {loading ? (
                    <p>Loading users...</p>
                ) : (
                    <>
                        <table className="table border text-nowrap">
                            <thead className="table-light">
                                <tr>
                                    <th>Image</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentUsers.length > 0 ? (
                                    currentUsers.map((user) => (
                                        <tr key={user._id}>
                                            <td>
                                                <img
                                                    src={user.userImage ? `http://127.0.0.1:5000/public/uploads/${user.userImage}` : "https://via.placeholder.com/50"}
                                                    alt={user.firstName}
                                                    style={{ width: 50, height: 50, objectFit: "cover", borderRadius: "50%" }}
                                                />
                                            </td>
                                            <td>{user.firstName}</td>
                                            <td>{user.lastName}</td>
                                            <td>{user.email}</td>
                                            <td>{user.phone}</td>
                                            <td>
                                                <div className="d-flex flex-nowrap">
                                                    <Link className="text-primary me-2" to={`/admin/update-user?user_id=${user._id}`}>
                                                        <i className="fas fa-edit"></i>
                                                    </Link>
                                                    <span
                                                        className="text-danger"
                                                        style={{ cursor: "pointer" }}
                                                        onClick={() => handleDelete(user._id)}
                                                    >
                                                        <i className="fas fa-trash-alt"></i>
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6">No users found!</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        {/* Pagination Controls */}
                        {filteredUsers.length > rowsPerPage && (
                            <Box mt={3} display="flex" justifyContent="center">
                                <Pagination
                                    count={totalPages}
                                    page={currentPage}
                                    onChange={handlePageChange}
                                    color="primary"
                                />
                            </Box>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default UserList;
