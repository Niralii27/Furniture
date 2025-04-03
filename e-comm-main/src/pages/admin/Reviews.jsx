import React, { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Reviews = () => {
    const [reviews, setReviews] = useState([
        {
          id: 1,
          productImage: "https://sunnymate.co/wp-content/uploads/2024/12/%E4%BC%91%E9%97%B2%E6%A4%85E901C1614B-600x450.webp",
          productName: "Zenith Pro Leather Bed",
          productId: 101,
          userName: "ms. swta parmar",
          userId: 201,
          rating: 4,
          review: "Great product!",
          reply: "Thank you!",
        },
        {
          id: 2,
          productImage: "https://sunnymate.co/wp-content/uploads/2024/12/1006-fabric-grey-600x600.webp",
          productName: "Prism Light Sofa Short",
          productId: 102,
          userName: "diya patel",
          userId: 202,
          rating: 4,
          review: "Excellent quality!",
          reply: "Glad you liked it!",
        },
        {
          id: 3,
          productImage: "https://www.ulcdn.net/images/products/920224/product/Cayman_Coffee_Table_Teak_LP.jpg?1722318846",
          productName: "Cayman Round Solid Wood Coffee Table in Teak",
          productId: 103,
          userName: "shyam shah",
          userId: 203,
          rating: 3,
          review: "Average experience.",
          reply: "Thank you for your feedback!",
        }
       
      ]);

  const [reply, setReply] = useState("");
  const [selectedReview, setSelectedReview] = useState(null);
  const [error, setError] = useState("");

  const handleDelete = (id) => {
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
        Swal.fire("Deleted!", "The review has been deleted.", "success");
      }
    });
  };

  const handleReplySubmit = () => {
    if (reply.trim() === "") {
      setError("Reply cannot be empty!");
      return;
    }
  
    const isNewReply = !selectedReview.reply; // Check if it's a new reply
  

  
    setReply("");
    setError("");
  
    Swal.fire("Success", isNewReply ? "Reply added successfully!" : "Reply updated successfully!", "success");
  };
  
  return (
    <div>
        <div class="d-flex justify-content-between align-items-center mt-4 mb-4">
            <div>
                <h1 class="mt-4">Manage Rating & Review</h1>
                <ol class="breadcrumb mb-4">
                    <li class="breadcrumb-item"><Link to="/admin">Dashboard</Link></li>
                    <li class="breadcrumb-item active">Reviews</li>
                </ol>
            </div>
            
            <Link to="/admin/add-review" className="btn btn-primary text-nowrap"> <i className="fas fa-plus-circle fa-lg"></i></Link>
        </div>
      <div className="card-body">
        <table className="table border text-nowrap">
          <thead className="table-light">
            <tr>
              <th>Product</th>
              <th>Username</th>
              <th>Rating</th>
              <th>Review</th>
              <th>Reply</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.length ? (
              reviews.map((review) => (
                <tr key={review.id}>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src={review.productImage}
                        alt={review.productName}
                        style={{ width: 50, height: 50, objectFit: "cover" }}
                        className="me-2"
                      />
                      <a href="#">{review.productName}</a>
                    </div>
                  </td>
                  <td>
                    <a href="#">{review.userName}</a>
                  </td>
                  <td>
                    <span className="text-warning">
                      {Array.from({ length: 5 }, (_, i) =>
                        i < review.rating ? "★" : "☆"
                      )}
                    </span>
                  </td>
                  <td>{review.review}</td>
                  <td>{review.reply ? review.reply : "No reply yet"}</td>
                  <td>
                  <div className="d-flex flex-nowrap gap-2">
                    <span
                      className="text-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#replyModal"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setSelectedReview(review);
                        setReply(review.reply || "");
                        setError("");
                      }}
                    >
                      <i className="fas fa-reply"></i>
                    </span>

                    <Link className="text-info" to="/admin/update-review">
                      <i className="fas fa-edit"></i>
                    </Link>

                    <span
                      className="text-danger"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDelete(review.id)}
                    >
                      <i className="fas fa-trash-alt"></i>
                    </span>
                  </div>
</td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No reviews found!
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
            
      {/* Reply Modal */}
      <div
        className="modal fade"
        id="replyModal"
        tabIndex="-1"
        aria-labelledby="replyModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="replyModalLabel">
                {selectedReview?.reply ? "Update Reply" : "Reply to Review"}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="reviewReply" className="form-label">
                    Your Reply
                  </label>
                  <textarea
                    className="form-control"
                    id="reviewReply"
                    rows="3"
                    value={reply}
                    onChange={(e) => {
                      setReply(e.target.value);
                      setError("");
                    }}
                  ></textarea>
                  {error && <div className="text-danger mt-1">{error}</div>}
                </div>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleReplySubmit}
                    >
                    {selectedReview?.reply ? "Update Reply" : "Add Reply"}
                </button>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
