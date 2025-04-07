import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';

const UpdateOffer = () => {
    const [searchParams] = useSearchParams();
    const offerId = searchParams.get("offer_id");
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        offerDescription: "",
        offerCode: "",
        discount: "",
        maxDiscountAmount: "",
        minDiscountAmount: "",
        startDate: "",
        endDate: ""
    });

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (offerId) {
            axios.get(`http://localhost:5000/api/offer/view-offer/${offerId}`)
                .then(res => {
                    const data = res.data;
                    setFormData({
                        offerDescription: data.offerDescription,
                        offerCode: data.offerCode,
                        discount: data.discount,
                        maxDiscountAmount: data.maxDiscountAmount,
                        minDiscountAmount: data.minDiscountAmount,
                        startDate: data.startDate.slice(0, 10),
                        endDate: data.endDate.slice(0, 10)
                    });
                })
                .catch(err => {
                    console.error("Error fetching offer:", err);
                    Swal.fire("Error", "Failed to fetch offer data", "error");
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [offerId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        for (let key in formData) {
            if (!formData[key]) {
                setError("All fields are required.");
                return;
            }
        }

        setError("");
        setSubmitting(true);

        try {
            await axios.put(`http://localhost:5000/api/offer/update-offer/${offerId}`, formData);

            Swal.fire("Updated!", "Offer updated successfully", "success").then(() => {
                navigate("/admin/offers");
            });
        } catch (error) {
            console.error("Update error:", error);
            Swal.fire("Error", "Failed to update offer", "error");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div>
            <h1 className="mt-4">Update Offer</h1>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item"><Link to="/admin">Dashboard</Link></li>
                <li className="breadcrumb-item active">Update Offer</li>
            </ol>

            {loading ? <p>Loading...</p> : (
                <div className="card mb-4">
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Offer Description</label>
                                <input type="text" className="form-control" name="offerDescription" value={formData.offerDescription} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Offer Code</label>
                                <input type="text" className="form-control" name="offerCode" value={formData.offerCode} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Discount (%)</label>
                                <input type="number" className="form-control" name="discount" value={formData.discount} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Minimum Discount Amount</label>
                                <input type="number" className="form-control" name="minDiscountAmount" value={formData.minDiscountAmount} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Maximum Discount Amount</label>
                                <input type="number" className="form-control" name="maxDiscountAmount" value={formData.maxDiscountAmount} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Start Date</label>
                                <input type="date" className="form-control" name="startDate" value={formData.startDate} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">End Date</label>
                                <input type="date" className="form-control" name="endDate" value={formData.endDate} onChange={handleChange} />
                            </div>

                            {error && <small className="text-danger">{error}</small>}

                            <button type="submit" className="btn btn-primary" disabled={submitting}>
                                {submitting ? "Updating..." : "Update Offer"}
                            </button>
                            <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate("/admin/offers")}>
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UpdateOffer;
