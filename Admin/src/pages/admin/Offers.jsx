import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { Pagination, Box } from "@mui/material";

const OfferList = () => {
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchOffers();
    }, []);

    const fetchOffers = () => {
        axios.get("http://localhost:5000/api/offer/view-offers")
            .then((res) => {
                setOffers(res.data);
            })
            .catch((err) => {
                console.error("Error fetching offers:", err);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to fetch offers."
                });
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This offer will be deleted permanently!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:5000/api/offer/delete-offer/${id}`)
                    .then(() => {
                        Swal.fire("Deleted!", "Offer has been deleted.", "success");
                        fetchOffers();
                    })
                    .catch((err) => {
                        console.error("Error deleting offer:", err);
                        Swal.fire("Error!", "Failed to delete the offer.", "error");
                    });
            }
        });
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const filteredOffers = offers.filter((offer) =>
        offer.offerDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        offer.offerCode.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredOffers.length / rowsPerPage);
    const indexOfLast = currentPage * rowsPerPage;
    const indexOfFirst = indexOfLast - rowsPerPage;
    const currentOffers = filteredOffers.slice(indexOfFirst, indexOfLast);

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mt-5 mb-4">
                <div>
                    <h2>Offer List</h2>
                    <ol className="breadcrumb mb-0">
                        <li className="breadcrumb-item"><Link to="/admin">Dashboard</Link></li>
                        <li className="breadcrumb-item active">Offers</li>
                    </ol>
                </div>
                <div className="d-flex align-items-center gap-2 mt-3 mt-md-0">
                    <input
                        type="text"
                        className="form-control"
                        style={{ maxWidth: "300px" }}
                        placeholder="Search offers..."
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setCurrentPage(1); // reset to page 1 when searching
                        }}
                    />
                    <Link className="btn btn-primary" to="/admin/add-offer">
                        <i className="fas fa-plus-circle"></i>
                    </Link>
                </div>
            </div>

            <div className="card-body">
                {loading ? (
                    <p>Loading offers...</p>
                ) : (
                    <>
                        <table className="table table-bordered">
                            <thead className="table-light">
                                <tr>
                                    <th>#</th>
                                    <th>Description</th>
                                    <th>Code</th>
                                    <th>Discount (%)</th>
                                    <th>Min Amount</th>
                                    <th>Max Amount</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentOffers.length > 0 ? (
                                    currentOffers.map((offer, index) => (
                                        <tr key={offer._id}>
                                            <td>{indexOfFirst + index + 1}</td>
                                            <td>{offer.offerDescription}</td>
                                            <td>{offer.offerCode}</td>
                                            <td>{offer.discount}</td>
                                            <td>{offer.minDiscountAmount}</td>
                                            <td>{offer.maxDiscountAmount}</td>
                                            <td>{new Date(offer.startDate).toLocaleDateString()}</td>
                                            <td>{new Date(offer.endDate).toLocaleDateString()}</td>
                                            <td>
                                                <div className="d-flex flex-nowrap">
                                                    <Link className="text-primary me-2" to={`/admin/update-offer?offer_id=${offer._id}`}>
                                                        <i className="fas fa-edit"></i>
                                                    </Link>
                                                    <span
                                                        className="text-danger"
                                                        style={{ cursor: "pointer" }}
                                                        onClick={() => handleDelete(offer._id)}
                                                    >
                                                        <i className="fas fa-trash-alt"></i>
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="9">No offers found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        {filteredOffers.length > rowsPerPage && (
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

export default OfferList;
