import React, { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Offers = () => {
	const [offers, setOffers] = useState([
		{
			Offer_Id: 1,
			Offer_Code: "DISCOUNT10",
			Offer_Description: "Get 10% off on orders above ₹500",
			Discount: 10,
			Minimum_Order: 500,
			active_status: 1,
		},
		{
			Offer_Id: 2,
			Offer_Code: "SAVE20",
			Offer_Description: "Save ₹20 on orders above ₹300",
			Discount: 20,
			Minimum_Order: 300,
			active_status: 0,
		},
	]);

	const handleDelete = (offerId) => {
		Swal.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#d33",
			cancelButtonColor: "#3085d6",
			confirmButtonText: "Yes, delete it!",
		}).then((result) => {
			if (result.isConfirmed) {
				Swal.fire("Deleted!", "Offer has been deleted.", "success");
			}
		});
	};

	const handleToggleStatus = (offerId) => {
		setOffers(
			offers.map((offer) =>
				offer.Offer_Id === offerId
					? {
							...offer,
							active_status: offer.active_status === 1 ? 0 : 1,
					  }
					: offer
			)
		);
		Swal.fire(
			"Success!",
			`Offer has been ${
				offers.find((offer) => offer.Offer_Id === offerId)
					.active_status === 1
					? "deactivated"
					: "activated"
			}.`,
			"success"
		);
	};

	return (
		<div>
			<div class="d-flex justify-content-between align-items-center mt-4">
				<div>
					<h1 className="mt-4">Manage Offers</h1>
					<ol class="breadcrumb mb-4">
						<li class="breadcrumb-item">
							<Link to="/admin">Dashboard</Link>
						</li>
						<li class="breadcrumb-item active">Offers</li>
					</ol>
				</div>
				<Link to="/admin/add-offer" className="btn btn-primary">
				<i className="fas fa-plus-circle fa-lg"></i>
				</Link>
			</div>

			<h4 className="mt-2">Discount Offers</h4>
			<div className="card-body">
				<table className="table border text-nowrap">
					<thead className="table-light">
						<tr>
							<th>Offer Description</th>
							<th>Offer Code</th>
							<th>Discount</th>
							<th>Minimum Order</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{offers.length > 0 ? (
							offers.map((offer) => (
								<tr key={offer.Offer_Id}>
									<td>{offer.Offer_Description}</td>
									<td>{offer.Offer_Code}</td>
									<td>{offer.Discount}%</td>
									<td>₹{offer.Minimum_Order}</td>
									<td>
    <div className="d-flex flex-nowrap gap-2">
        <Link className="text-secondary" to="/admin/update-offer">
            <i className="fas fa-edit"></i>
        </Link>
        <span className="text-danger" style={{ cursor: "pointer" }} onClick={() => handleDelete(offer.Offer_Id)}>
            <i className="fas fa-trash-alt"></i>
        </span>
        <span 
            className={offer.active_status === 1 ? "text-warning" : "text-success"} 
            style={{ cursor: "pointer" }} 
            onClick={() => handleToggleStatus(offer.Offer_Id)}
        >
            <i className={offer.active_status === 1 ? "fas fa-toggle-off" : "fas fa-toggle-on"}></i>
        </span>
    </div>
</td>

								</tr>
							))
						) : (
							<tr>
								<td colSpan="5" className="text-center">
									No offers available
								</td>
							</tr>
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

export default Offers;
