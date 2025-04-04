import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Users = () => {
    const navigate = useNavigate();

    const [users, setUsers] = useState([
        { id: 1, profilePicture: "user1.jpg", fullName: "Amit Sharma", email: "amit.sharma@example.com", phone: "9876543210", status: 1 },
        { id: 2, profilePicture: "user2.jpg", fullName: "Priya Patel", email: "priya.patel@example.com", phone: "8765432109", status: 0 },
        { id: 3, profilePicture: "user3.jpg", fullName: "Rajesh Verma", email: "rajesh.verma@example.com", phone: "7654321098", status: -1 },
    ]);  
    

    const handleDelete = (userId, userName) => {
        Swal.fire({
            title: "Are you sure?",
            text: `Do you want to delete ${userName}? This action cannot be undone!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                setUsers(users.filter(user => user.id !== userId));
                Swal.fire("Deleted!", `${userName} has been removed.`, "success");
            }
        });
    };



    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mt-4 mb-4">
            <div>
                    <br></br>
                    <h1>Manage Customers</h1>
                    <ol className="breadcrumb mb-0">
                        <li className="breadcrumb-item"><Link to="/admin">Dashboard</Link></li>
                        <li className="breadcrumb-item active">Products</li>
                    </ol>
                </div>
              
                <Link className="btn btn-primary" to="/admin/add-user">
                <i className="fas fa-plus-circle fa-lg"></i>
                </Link>
            </div>

            <div className="card-body">
                <table className="table border text-nowrap">
                    <thead className="table-light">
                        <tr>
                            <th>User Image</th>
                            <th>User Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Account Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 ? (
                            users.map((user) => (
                                <tr key={user.id}>
                                    <td>
                                       
                                        {/* <img src={`/img/users/${user.profilePicture}`} alt={user.fullName} style={{ width: 50, height: 50, objectFit: "cover" }} /> */}
                                        <img src={"data:image/jpeg;base64,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"} alt={user.fullName} style={{ width: 50, height: 50, objectFit: "cover" }} />
                                    </td>
                                    <td>{user.fullName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>
                                        {user.status === 1 ? "Active" : user.status === 0 ? "Inactive" : "Deleted"}
                                    </td>
                                    <td className="d-flex gap-1">
                                        <Link to={`/admin/view-user`} className="text-info me-2m">
                                            <i className="fas fa-eye"></i> 
                                        </Link>
                                        <Link to={`/admin/update-user`} className="text-primary me-2">
                                            <i className="fas fa-edit"></i>
                                        </Link>
                                       

                                        <span className="text-danger" style={{ cursor: "pointer" }} onClick={() =>  handleDelete(user.id, user.fullName)}>
                                            <i className="fas fa-trash-alt"></i>
                                        </span>

                                        <Link to={`/admin/cart`} className="text">
                                            <i className="fas fa-shopping-cart"></i> 
                                        </Link>
                                    </td>

                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="6">No users to display!</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="d-flex justify-content-end">
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li className="page-item"><button className="page-link" disabled>Previous</button></li>
                        <li className="page-item active"><button className="page-link" disabled>1</button></li>
                        <li className="page-item"><button className="page-link" disabled>2</button></li>
                        <li className="page-item"><button className="page-link" disabled>3</button></li>
                        <li className="page-item"><button className="page-link" disabled>Next</button></li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Users;
