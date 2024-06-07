


import React, { useState } from "react";
import '../App.css';
import ecellLogo from '../img/Ecell-logo.png'; 
import { storage, db } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

const Contact = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        contactNo: "",
        branch: "",
      });
      const [errors, setErrors] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
      
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate contact number format (10 digits)
  const validateContactNo = (contactNo) => {
    const contactNoRegex = /^\d{10}$/;
    return contactNoRegex.test(contactNo);
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.contactNo) {
      newErrors.contactNo = "Contact No. is required";
    } else if (!validateContactNo(formData.contactNo)) {
      newErrors.contactNo = "Invalid contact number";
    }
    if (!formData.branch) newErrors.branch = "Branch is required";
    if (!formData.message) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      alert("Please correct the errors in the form");
      return;
    }

    try {
      // Initialize variables for Firebase operations
      let uploadedImageUrl = "";

      // If there's an image, upload it to Firebase Storage
      if (selectedImage) {
        const storageRef = ref(storage, `images/${selectedImage.name}`);
        const uploadTask = uploadBytesResumable(storageRef, selectedImage);

        // Get the image URL after the upload is complete
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Progress monitoring (optional)
          },
          (error) => {
            console.error("Error uploading image: ", error);
          },
          async () => {
            // Get the download URL after successful upload
            uploadedImageUrl = await getDownloadURL(uploadTask.snapshot.ref);
          }
        );
      }

      // Save form data to Firestore
      await addDoc(collection(db, "contacts"), {
        ...formData,
        imageUrl: uploadedImageUrl, // Store the uploaded image URL
        createdAt: new Date(),
      });

      alert("Form submitted successfully!");

      // Clear form after submission
      setFormData({
        name: "",
        email: "",
        contactNo: "",
        branch: "",
        message: "",
      });
      setSelectedImage(null);
      setImageUrl("");

    } catch (error) {
      console.error("Error submitting form: ", error);
      alert("Error submitting form");
    }
  };



  return (
    <>
      <form className="form">
        <div className="heading">
          <img src={ecellLogo} alt="E-Cell Logo" />
          <h1>Contact Form</h1>
        </div>

        <label className="label">Name</label>
        <input type="text" placeholder="Name" required/>

        <label className="label">Email</label>
        <input type="email" placeholder="Email" required/>

        <label className="label">Contact No.</label>
        <input type="text" placeholder="Contact No." required/>

        <label className="label" required>Branch</label>
        <select>
          <option value="">Select Branch</option>
          <option value="">Mathematics & Computing</option>
          <option value="">Computer Science & Engg.</option>
          <option value="">Electrical Engineering</option>
          <option value="">Electronics Engineering</option>
          <option value="">Mechanical Engineering</option>
          <option value="MNC">Chemical Engineering</option>
          <option value="MNC">Ceramic Engineering</option>
          <option value="MNC">Pharmaceutical Engineering</option>
          <option value="MNC">Civil Engineering</option>

        </select>

        <label className="label">Upload Image</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />

        {selectedImage && (
          <div className="image-preview">
            <img src={selectedImage} alt="Selected Preview" />
          </div>
        )}

        <button type="submit" className="submit button">Submit</button>
      </form>
    </>
  );
};

export default Contact;