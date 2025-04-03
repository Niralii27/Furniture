import React from "react";
import { Link } from "react-router-dom";

const ViewUser = () => {
    const customerData = {
        userImage: "data:image/jpeg;base64,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", // Sample profile image
        firstName: "Amit",
        lastName: "Sharma",
        email: "amitsharma@gmail.com",
        phone: "9876543210",
        accountStatus: "Active",
    };

    return (
        <div className="container-fluid px-4">
            {/* Breadcrumb Navigation */}
            <div className="d-flex justify-content-between align-items-center mt-4 mb-4">
                <h1>View Customer Profile</h1>
                <nav>
                    <Link to="/admin">Dashboard</Link> / 
                    <Link to="/admin/users">Customers</Link> / 
                    <span>View Customer</span>
                </nav>
            </div>

            {/* Customer Profile Details */}
            <div className="card mb-4">
                <div className="card-header"><h5>Customer Details</h5></div>
                <div className="card-body text-center">
                    <img 
                        src={customerData.userImage} 
                        alt="User Profile" 
                        className="rounded-circle mb-3"
                        width="120"
                    />
                    <h4>{customerData.firstName} {customerData.lastName}</h4>
                    <p><strong>Email:</strong> {customerData.email}</p>
                    <p><strong>Phone:</strong> {customerData.phone}</p>
                    <p>
                        <strong>Account Status:</strong> 
                        <span className={`badge ${customerData.accountStatus === "Active" ? "bg-success" : "bg-danger"}`}>
                            {customerData.accountStatus}
                        </span>
                    </p>
                </div>
            </div>

            {/* Action Buttons */}
            {/* <div className="text-center">
                <Link to="/admin/" className="btn btn-primary mx-2">
                    <i className="fas fa-edit"></i> Edit Profile
                </Link>
                <button className="btn btn-danger">
                    <i className="fas fa-trash"></i> Delete Customer
                </button>
            </div> */}
        </div>
    );
};

export default ViewUser;
