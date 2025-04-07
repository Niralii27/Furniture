import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

const AddOffer = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        offerDescription: "",
        offerCode: "",
        discount: "",
        maxDiscountAmount: "",
        minDiscountAmount: "",
        startDate: "",
        endDate: "",
    });
    const [error, setError] = useState("");

    const validateForm = () => {
        const {
            offerDescription,
            offerCode,
            discount,
            maxDiscountAmount,
            minDiscountAmount,
            startDate,
            endDate,
        } = formData;

        if (
            !offerDescription ||
            !offerCode ||
            !discount ||
            !maxDiscountAmount ||
            !minDiscountAmount ||
            !startDate ||
            !endDate
        ) {
            return "All fields are required.";
        }
        if (isNaN(discount) || isNaN(maxDiscountAmount) || isNaN(minDiscountAmount)) {
            return "Discount and amount fields must be numbers.";
        }
        return null;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/Offer/add-offer", {
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
                    text: data.message || "Offer added successfully.",
                    icon: "success",
                    confirmButtonText: "OK"
                }).then(() => {
                    navigate("/admin/offers");
                });

                setFormData({
                    offerDescription: "",
                    offerCode: "",
                    discount: "",
                    maxDiscountAmount: "",
                    minDiscountAmount: "",
                    startDate: "",
                    endDate: "",
                });
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

    return (
        <div>
            <br />
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Add New Offer</h2>
                <nav>
                    <Link to="/admin">Dashboard</Link> / <Link to="/admin/offers">Offers</Link> / Add Offer
                </nav>
            </div>

            <div className="card shadow-sm">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Offer Description</label>
                            <input
                                type="text"
                                className="form-control"
                                name="offerDescription"
                                value={formData.offerDescription}
                                onChange={handleChange}
                                placeholder="Enter offer description"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Offer Code</label>
                            <input
                                type="text"
                                className="form-control"
                                name="offerCode"
                                value={formData.offerCode}
                                onChange={handleChange}
                                placeholder="Enter offer code"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Discount (%)</label>
                            <input
                                type="number"
                                className="form-control"
                                name="discount"
                                value={formData.discount}
                                onChange={handleChange}
                                placeholder="Enter discount percentage or amount"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Maximum Discount Amount</label>
                            <input
                                type="number"
                                className="form-control"
                                name="maxDiscountAmount"
                                value={formData.maxDiscountAmount}
                                onChange={handleChange}
                                placeholder="Enter max discount amount"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Minimum Discount Amount</label>
                            <input
                                type="number"
                                className="form-control"
                                name="minDiscountAmount"
                                value={formData.minDiscountAmount}
                                onChange={handleChange}
                                placeholder="Enter min discount amount"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Start Date</label>
                            <input
                                type="date"
                                className="form-control"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">End Date</label>
                            <input
                                type="date"
                                className="form-control"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleChange}
                            />
                        </div>

                        {error && <p className="text-danger">{error}</p>}

                        <button type="submit" className="btn btn-primary w-100">Add Offer</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddOffer;
