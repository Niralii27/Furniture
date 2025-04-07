  import React, { useState, useEffect } from "react";
  import { Link, useNavigate } from "react-router-dom";
  import Swal from "sweetalert2";
  import axios from "axios";

  const AddReview = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
      productid: "",
      userid: "",
      rating: 0,
      review: "",
    });

    const [hoveredRating, setHoveredRating] = useState(0);
    const [errors, setErrors] = useState({});
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    

    // Fetch users and products on component mount
    useEffect(() => {
      const fetchData = async () => {
        try {
          // Fetch products
          const productRes = await fetch("http://localhost:5000/api/product/get-all");
          const productData = await productRes.json();
          if (productRes.ok) {
            setProducts(productData);
          } else {
            Swal.fire("Error", productData.message || "Failed to load products", "error");
          }
    
          // Fetch users
          const userRes = await fetch("http://localhost:5000/api/user/get-all");
          const userData = await userRes.json();
          if (userRes.ok) {
            setUsers(userData);
          } else {
            Swal.fire("Error", userData.message || "Failed to load users", "error");
          }
        } catch (error) {
          Swal.fire("Error", "Something went wrong while loading data", "error");
        }
      };
    
      fetchData();
    }, []);
    
    
      

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });

      const error = validateField(name, value);
      setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    };

    const handleStarClick = (value) => {
      setFormData({ ...formData, rating: value });
      setErrors((prev) => ({ ...prev, rating: null }));
    };

    const validateField = (name, value) => {
      let error = null;
      const displayName = name.replace(/([A-Z])/g, " $1").trim();
      const formattedName = displayName.charAt(0).toUpperCase() + displayName.slice(1);

      if (!value || value.toString().trim() === "") {
        return `${formattedName} is required.`;
      }

      if (name === "review") {
        if (value.length < 10) return `${formattedName} must be at least 10 characters long.`;
        if (value.length > 500) return `${formattedName} cannot exceed 500 characters.`;
      }

      return error;
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      let newErrors = {};
      Object.keys(formData).forEach((key) => {
        newErrors[key] = validateField(key, formData[key]);
      });

      setErrors(newErrors);

      if (Object.values(newErrors).every((err) => !err)) {
        try {
          const payload = {
              user: formData.userid,
              product: formData.productid,
              rating: formData.rating,
              review: formData.review,
            };
            

          const response = await axios.post("http://localhost:5000/api/Review/add-review", payload);

          if (response.status === 201) {
            Swal.fire("Success!", response.data.message || "Review added successfully.", "success").then(() => {
              navigate("/admin/reviews");
            });

            setFormData({ productid: "", userid: "", rating: 0, review: "" });
            setErrors({});
          } else {
            Swal.fire("Error!", response.data.error || "Something went wrong.", "error");
          }
        } catch (err) {
          Swal.fire("Error!", "Something went wrong. Please try again.", "error");
        }
      }
    };

    return (
      <div>
        <h1 className="mt-4">Add Review</h1>
        <ol className="breadcrumb mb-4">
          <li className="breadcrumb-item"><Link to="/admin">Dashboard</Link></li>
          <li className="breadcrumb-item active">Add Review</li>
        </ol>

        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>

              {/* Product Selection */}
              <div className="mb-3">
                <label htmlFor="productid" className="form-label">Product</label>
                <select
                  className="form-select"
                  id="productid"
                  name="productid"
                  value={formData.productid}
                  onChange={handleChange}
                  >
                  <option value="" disabled>Select a product</option>
                  {products.map((product) => (
                      <option key={product._id} value={product._id}>
                      {product.name}
                      </option>
                  ))}
                  </select>

                {errors.productid && <div className="text-danger">{errors.productid}</div>}
              </div>

              {/* User Selection */}
              <div className="mb-3">
                <label htmlFor="userid" className="form-label">User</label>
                <select
                  className="form-select"
                  id="userid"
                  name="userid"
                  value={formData.userid}
                  onChange={handleChange}
                  >
                  <option value="" disabled>Select a user</option>
                  {users.map((user) => (
                      <option key={user._id} value={user._id}>
                      {user.firstName} {user.lastName}
                      </option>
                  ))}
                  </select>

                {errors.userid && <div className="text-danger">{errors.userid}</div>}
              </div>

              {/* Star Rating */}
              <div className="mb-3">
                <label className="form-label">Rating</label>
                <div className="d-flex gap-1 fs-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      onClick={() => handleStarClick(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      style={{
                        cursor: "pointer",
                        color: (hoveredRating || formData.rating) >= star ? "#ffc107" : "#d0e8ff"
                      }}
                    >
                      ★
                    </span>
                  ))}
                </div>
                {errors.rating && <div className="text-danger">{errors.rating}</div>}
              </div>

              {/* Review Text */}
              <div className="mb-3">
                <label htmlFor="review" className="form-label">Review</label>
                <textarea
                  className="form-control"
                  id="review"
                  name="review"
                  rows="3"
                  value={formData.review}
                  onChange={handleChange}
                  placeholder="Enter review"
                ></textarea>
                {errors.review && <div className="text-danger">{errors.review}</div>}
              </div>

              <input type="submit" className="btn btn-primary" value="Submit Review" />
            </form>
          </div>
        </div>
      </div>
    );
  };

  export default AddReview;
