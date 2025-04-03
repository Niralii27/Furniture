import React, { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Responses = () => {
  const [responses, setResponses] = useState([
    {
      id: 1,
      userName: "Rahul Mehta",
      email: "rahul.mehta@example.com",
      phone: "987-654-3210",
      message: "I have an issue with my order.",
      reply: "We're sorry for the inconvenience, Rahul. Our support team will reach out to you shortly.",
    },
    {
      id: 2,
      userName: "Sneha Iyer",
      email: "sneha.iyer@example.com",
      phone: "876-543-2109",
      message: "Great service!",
      reply: "Thank you, Sneha! We're glad you had a great experience. 😊",
    },
  ]);

  const [reply, setReply] = useState("");
  const [selectedResponse, setSelectedResponse] = useState(null);
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
        setResponses(responses.filter((response) => response.id !== id));
        Swal.fire("Deleted!", "The response has been deleted.", "success");
      }
    });
  };

  const handleReplySubmit = () => {
    if (reply.trim() === "") {
      setError("Reply cannot be empty!");
      return;
    }

    setResponses(
      responses.map((res) =>
        res.id === selectedResponse.id ? { ...res, reply } : res
      )
    );
    setReply("");
    setError("");
    setSelectedResponse(null);
    Swal.fire("Success", "Reply added/updated successfully!", "success");
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mt-4 mb-4">
        <h1>Responses</h1>
        <ol className="breadcrumb mb-0">
          <li className="breadcrumb-item"><Link to="/admin">Dashboard</Link></li>
          <li className="breadcrumb-item active">Responses</li>
        </ol>
      </div>
      <div className="card-body">
        <table className="table border text-nowrap">
          <thead className="table-light">
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Message</th>
              <th>Reply</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {responses.length ? (
              responses.map((response) => (
                <tr key={response.id}>
                  <td>{response.userName}</td>
                  <td>{response.email}</td>
                  <td>{response.phone}</td>
                  <td>{response.message}</td>
                  <td>{response.reply || "-"}</td>
                  <td>
                  <div className="d-flex gap-2">
  <span
    className="text-primary"
    style={{ cursor: "pointer" }}
    data-bs-toggle="modal"
    data-bs-target="#replyModal"
    onClick={() => {
      setSelectedResponse(response);
      setReply(response.reply || "");
      setError("");
    }}
  >
    <i className="fas fa-reply"></i>
  </span>
  <span
    className="text-danger"
    style={{ cursor: "pointer" }}
    // onClick={() => handleDelete(response.id)}
    onClick={() => handleDelete(response)}
  >
    <i className="fas fa-trash-alt"></i>
  </span>
</div>

                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">No responses found!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Reply Modal */}
      <div className="modal fade" id="replyModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Reply</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <textarea
                className="form-control"
                rows="3"
                value={reply}
                onChange={(e) => {
                  setReply(e.target.value);
                  setError("");
                }}
              ></textarea>
              {error && <div className="text-danger mt-1">{error}</div>}
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  handleReplySubmit();
                  document.querySelector("#replyModal .btn-close").click();
                }}
              >
                Submit Reply
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Responses;