import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

const AddContact = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
    });

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Name is required.";
        if (!formData.email.trim()) newErrors.email = "Email is required.";
        if (!formData.phone.trim()) newErrors.phone = "Phone number is required.";
        if (!formData.subject.trim()) newErrors.subject = "Subject is required.";
        if (!formData.message.trim()) newErrors.message = "Message is required.";
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/contact/add-contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                Swal.fire({
                    title: "Success!",
                    text: data.message || "Contact added successfully.",
                    icon: "success",
                    confirmButtonText: "OK"
                }).then(() => {
                    navigate("/admin/contacts");
                });

                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    subject: "",
                    message: ""
                });
                setErrors({});
            } else {
                Swal.fire({
                    title: "Error!",
                    text: data.error || "Something went wrong.",
                    icon: "error",
                    confirmButtonText: "OK"
                });
            }
        } catch (err) {
            Swal.fire({
                title: "Error!",
                text: "Something went wrong. Please try again.",
                icon: "error",
                confirmButtonText: "OK"
            });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: "" });
    };

    return (
        <div>
            <br />
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Add New Contact</h2>
                <nav>
                    <Link to="/admin">Dashboard</Link> / <Link to="/admin/contacts">Contacts</Link> / Add Contact
                </nav>
            </div>

            <div className="card shadow-sm">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        {["name", "email", "phone", "subject", "message"].map((field, index) => (
                            <div className="mb-3" key={index}>
                                <label className="form-label text-capitalize">{field}</label>
                                <input
                                    type={field === "email" ? "email" : "text"}
                                    className="form-control"
                                    name={field}
                                    value={formData[field]}
                                    onChange={handleChange}
                                    placeholder={`Enter ${field}`}
                                />
                                {errors[field] && <p className="text-danger">{errors[field]}</p>}
                            </div>
                        ))}

                        <button type="submit" className="btn btn-primary w-100">Add Contact</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddContact;
