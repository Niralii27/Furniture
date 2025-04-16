import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { Pagination, Box } from "@mui/material";

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchReviews(); // Fetch reviews on component mount
  }, []);

  const fetchReviews = () => {
    axios
      .get("http://localhost:5000/api/Review/view-reviews-admin")
      .then((res) => {
        console.log("Fetched reviews for admin:", res.data); // To debug
        setReviews(res.data); // Set the reviews for admin view
      })
      .catch((err) => {
        console.error("Error fetching reviews:", err);
        Swal.fire("Error", "Failed to fetch reviews", "error");
      })
      .finally(() => setLoading(false)); // Set loading state to false after fetching
  };

  const handleDelete = (reviewId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This review will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:5000/api/Review/delete-review/${reviewId}`)
          .then(() => {
            Swal.fire("Deleted!", "Review has been deleted.", "success");
            fetchReviews(); // Refresh the list after deletion
          })
          .catch((err) => {
            console.error("Error deleting review:", err);
            Swal.fire("Error!", "Failed to delete the review.", "error");
          });
      }
    });
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value); // Update the current page on page change
  };

  // Filter reviews based on search query
  const filteredReviews = reviews.filter(
    (review) =>
      (review.user?.firstName &&
        review.user?.firstName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (review.user?.lastName &&
        review.user?.lastName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (review.product?.name &&
        review.product?.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredReviews.length / rowsPerPage); // Total pages for pagination
  const indexOfLast = currentPage * rowsPerPage; // Index of the last review for the current page
  const indexOfFirst = indexOfLast - rowsPerPage; // Index of the first review for the current page
  const currentReviews = filteredReviews.slice(indexOfFirst, indexOfLast); // Slice the reviews for pagination

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mt-5 mb-4">
        <div>
          <h2>Review List</h2>
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item">
              <Link to="/admin">Dashboard</Link>
            </li>
            <li className="breadcrumb-item active">Reviews</li>
          </ol>
        </div>

        <div className="d-flex align-items-center gap-2">
          <input
            type="text"
            className="form-control"
            style={{ maxWidth: "300px" }}
            placeholder="Search reviews..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1); // Reset to page 1 when searching
            }}
          />
          <Link className="btn btn-primary" to="/admin/add-review">
            <i className="fas fa-plus-circle"></i>
          </Link>
        </div>
      </div>

      <div className="card-body">
        {loading ? (
          <p>Loading reviews...</p>
        ) : (
          <>
            <table className="table table-bordered">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>User</th>
                  <th>Product</th>
                  <th>Rating</th>
                  <th>Review</th>
                  <th>Created At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentReviews.length > 0 ? (
                  currentReviews.map((review, index) => (
                    <tr key={review._id}>
                      <td>{indexOfFirst + index + 1}</td>
                      <td>
                        {review.user?.fullname} {review.user?.lastName}
                      </td>
                      <td>{review.product?.name}</td>
                      <td>{review.rating} ★</td>
                      <td>{review.review}</td>
                      <td>{new Date(review.createdAt).toLocaleString()}</td>
                      <td>
                        <div className="d-flex flex-nowrap">
                          <span
                            className="text-danger"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleDelete(review._id)}
                          >
                            <i className="fas fa-trash-alt"></i>
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7">No reviews found.</td>
                  </tr>
                )}
              </tbody>
            </table>

            {filteredReviews.length > rowsPerPage && (
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

export default ReviewList;
