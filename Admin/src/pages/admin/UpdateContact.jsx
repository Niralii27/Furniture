import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';

const UpdateContact = () => {
    const [searchParams] = useSearchParams();
    const contactId = searchParams.get("contact_id");

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
    });

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        if (contactId) {
            axios.get(`http://localhost:5000/api/admin/view-contact/${contactId}`)
                .then(res => {
                    setFormData(res.data);
                })
                .catch(err => {
                    console.error("Error fetching contact:", err);
                    Swal.fire("Error", "Failed to fetch contact data", "error");
                })
                .finally(() => setLoading(false));
        }
    }, [contactId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};
        const requiredFields = ["name", "email", "phone", "subject", "message"];

        requiredFields.forEach(field => {
            if (!formData[field].trim()) {
                newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
            }
        });

        if (Object.keys(newErrors).length > 0) {
            setError(newErrors);
            return;
        }

        setSubmitting(true);
        setError({});

        try {
            await axios.put(`http://localhost:5000/api/admin/update-contact/${contactId}`, formData);
            Swal.fire("Updated!", "Contact updated successfully", "success").then(() => {
                navigate("/admin/contacts");
            });
        } catch (error) {
            console.error("Update error:", error);
            Swal.fire("Error", "Failed to update contact", "error");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div>
            <h1 className="mt-4">Update Contact</h1>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item"><Link to="/admin">Dashboard</Link></li>
                <li className="breadcrumb-item active">Update Contact</li>
            </ol>

            {loading ? <p>Loading...</p> : (
                <div className="card mb-4">
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            {["name", "email", "phone", "subject", "message"].map((field, idx) => (
                                <div className="mb-3" key={idx}>
                                    <label className="form-label">
                                        {field.charAt(0).toUpperCase() + field.slice(1)}
                                    </label>
                                    <input
                                        type="text"
                                        name={field}
                                        className="form-control"
                                        value={formData[field]}
                                        onChange={handleChange}
                                    />
                                    {error[field] && <small className="text-danger">{error[field]}</small>}
                                </div>
                            ))}

                            <button type="submit" className="btn btn-primary" disabled={submitting}>
                                {submitting ? "Updating..." : "Update Contact"}
                            </button>
                            <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate("/admin/contacts")}>
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UpdateContact;
