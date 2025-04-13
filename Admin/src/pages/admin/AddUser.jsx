import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";


const AddUser = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    userImage: null,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    const newValue = type === "file" ? files[0] : value;
    setFormData({ ...formData, [name]: newValue });

    const error = validateField(name, newValue);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validateField = (name, value) => {
    if (!value || (typeof value === "string" && value.trim() === "")) {
      return `${name.replace(/([A-Z])/g, ' $1')} is required.`;
    }

    if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
      return "Invalid email address.";
    }

    if (name === "phone" && !/^\d{10}$/.test(value)) {
      return "Phone must be 10 digits.";
    }

    if (name === "password" && value.length < 6) {
      return "Password must be at least 6 characters.";
    }

    if (name === "userImage" && value) {
      const allowed = ["image/jpeg", "image/png", "image/jpg"];
      if (!allowed.includes(value.type)) {
        return "Only JPG, PNG, and JPEG allowed.";
      }
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const newErrors = {};
    // Validate each field and add errors to newErrors object
    Object.keys(formData).forEach((field) => {
      const err = validateField(field, formData[field]);
      if (err) newErrors[field] = err;
    });
  
    // If there are validation errors, stop and show them
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  
    // Clear any previous errors
    setErrors({});
  
    // Create FormData to send in the request
    const userForm = new FormData();
    Object.keys(formData).forEach((key) => {
      userForm.append(key, formData[key]);
    });
  
    try {
      // Send FormData with axios - do not wrap it in an object
      const res = await axios.post("http://localhost:5000/api/Login/add-user", userForm, {
        headers: {
          "Content-Type": "multipart/form-data", // Necessary for file uploads
        },
      });
  
      console.log("Response from backend:", res);
  
      // Check the response
      if (res.status === 201) {
        Swal.fire("Success", res.data.message || "User added successfully", "success").then(() => {
          navigate("/admin/users"); // Redirect to users page
        });
  
        // Reset form after success
        setFormData({
          fullname: "",
          lastName: "",
          email: "",
          phone: "",
          password: "",
          userImage: null,
        });
      } else {
        Swal.fire("Error", res.data.error || "Something went wrong", "error");
      }
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      Swal.fire("Error", "Something went wrong. Please try again.", "error");
    }
  };
  

  return (
    <div>
      <br />
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Add New User</h2>
        <nav>
          <Link to="/admin">Dashboard</Link> / <Link to="/admin/users">Users</Link> / Add User
        </nav>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">First Name</label>
                <input type="text" className="form-control" name="fullname" value={formData.fullname} onChange={handleChange} />
                {errors.fullname && <p className="text-danger">{errors.fullname}</p>}
              </div>
              <div className="col-md-6">
                <label className="form-label">Last Name</label>
                <input type="text" className="form-control" name="lastName" value={formData.lastName} onChange={handleChange} />
                {errors.lastName && <p className="text-danger">{errors.lastName}</p>}
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} />
                {errors.email && <p className="text-danger">{errors.email}</p>}
              </div>
              <div className="col-md-6">
                <label className="form-label">Phone</label>
                <input type="text" className="form-control" name="phone" value={formData.phone} onChange={handleChange} />
                {errors.phone && <p className="text-danger">{errors.phone}</p>}
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} />
              {errors.password && <p className="text-danger">{errors.password}</p>}
            </div>

            <div className="mb-3">
              <label className="form-label">Profile Image</label>
              <input type="file" className="form-control" name="userImage" onChange={handleChange} />
              {errors.userImage && <p className="text-danger">{errors.userImage}</p>}
            </div>

            <button type="submit" className="btn btn-primary w-100">Add User</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
