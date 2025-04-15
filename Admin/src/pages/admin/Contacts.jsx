import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { Pagination, Box } from "@mui/material";

const ContactList = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = () => {
        axios.get("http://localhost:5000/api/contact/view-contact")
            .then((response) => {
                setContacts(response.data);
            })
            .catch((error) => {
                console.error("Error fetching contacts:", error);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to fetch contact submissions."
                });
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleDelete = (contactId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This contact message will be deleted permanently!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:5000/api/contact/delete-contact/${contactId}`)
                    .then(() => {
                        Swal.fire("Deleted!", "The contact has been deleted.", "success");
                        fetchContacts();
                    })
                    .catch((error) => {
                        console.error("Error deleting contact:", error);
                        Swal.fire("Error!", "Failed to delete the contact.", "error");
                    });
            }
        });
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const filteredContacts = contacts.filter((contact) =>
        contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.subject.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredContacts.length / rowsPerPage);
    const indexOfLast = currentPage * rowsPerPage;
    const indexOfFirst = indexOfLast - rowsPerPage;
    const currentContacts = filteredContacts.slice(indexOfFirst, indexOfLast);

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mt-5 mb-4">
                <div>
                    <h2>Contact Submissions</h2>
                    <ol className="breadcrumb mb-0">
                        <li className="breadcrumb-item"><Link to="/admin">Dashboard</Link></li>
                        <li className="breadcrumb-item active">Contacts</li>
                    </ol>
                </div>
                <div className="d-flex align-items-center gap-2 mt-3 mt-md-0">
                    <input
                        type="text"
                        className="form-control"
                        style={{ maxWidth: "300px" }}
                        placeholder="Search contacts..."
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setCurrentPage(1); // reset to page 1 when searching
                        }}
                    />
                    <Link className="btn btn-primary" to="/admin/add-contact">
                        <i className="fas fa-plus-circle"></i>
                    </Link>
                </div>
            </div>

            <div className="card-body">
                {loading ? (
                    <p>Loading contacts...</p>
                ) : (
                    <>
                        <table className="table table-bordered">
                            <thead className="table-light">
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Subject</th>
                                    <th>Message</th>
                                    <th>Date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentContacts.length > 0 ? (
                                    currentContacts.map((contact, index) => (
                                        <tr key={contact._id}>
                                            <td>{indexOfFirst + index + 1}</td>
                                            <td>{contact.name}</td>
                                            <td>{contact.email}</td>
                                            <td>{contact.phone}</td>
                                            <td>{contact.subject}</td>
                                            <td>{contact.message}</td>
                                            <td>{new Date(contact.createdAt).toLocaleString()}</td>
                                            <td>
                                                <span
                                                    className="text-danger"
                                                    style={{ cursor: "pointer" }}
                                                    onClick={() => handleDelete(contact._id)}
                                                >
                                                    <i className="fas fa-trash-alt"></i>
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8">No contact submissions found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        {filteredContacts.length > rowsPerPage && (
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

export default ContactList;
