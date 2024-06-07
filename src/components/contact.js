import React, { useState } from "react";
import '../App.css';
import ecellLogo from '../img/Ecell-logo.png';
import { storage, db } from '../firebase';
import { collection, addDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const Contact = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [contactNo, setContactNo] = useState("");
    const [Branch, setBranch] = useState("");
    const [image, setImage] = useState(null);

    const userCollectionRef = collection(db, "contactdata")

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };
    const validatePhoneNumber = (contactNo) => {
        // Regular expression to validate phone number
        const re = /^\d{10}$/;
        return re.test(contactNo);
    };

    const handleImageChange = (event) => {
        if (event.target.files[0]) {
            setImage(event.target.files[0]);
        }
    }



    const handleSubmit = (event) => {
        event.preventDefault();

        if (!validateEmail(email)) {
            alert("Please enter a valid email address");
            return;
        }
        if (!validatePhoneNumber(contactNo)) {
            alert("Please enter a valid Contact no.");
            return;
        }
        const storageRef = ref(storage, 'images/${images.name');
        uploadBytes(storageRef, image)
            .then((snapshot) => {
                console.log('image uploaded successfully', snapshot);
                return getDownloadURL(snapshot.ref);
            })
            .then((DownloadURL) => {
                const formData = { name, email, contactNo, Branch, image: DownloadURL };
                // addDoc(userCollectionRef, {
                //     name: name,
                //     email: email,
                //     contactNo: contactNo,
                //     Branch: Branch,
                // })
                return addDoc(userCollectionRef,formData);
            })
                    .then(() => {
                        alert("Data submitted successfully!");
                        setName("");
                        setEmail("");
                        setContactNo("");
                        setBranch("");
                        setImage(null);
                    })
                    .catch((error) => {
                        console.error("error adding document:", error);
                        alert("error submitting form");
                    });
                };
            


    

    return (
        <>
            <form className="form">
                <div className="heading">
                    {/* <img src={ecellLogo} alt="E-Cell Logo" /> */}
                    <h1>Contact Form</h1>
                </div>

                <label className="label">Name</label>
                <input
                    type="text"
                    placeholder="Name"
                    onChange={(event) => {
                        setName(event.target.value);
                    }}
                    required />

                <label className="label">Email</label>
                <input type="email"
                    placeholder="Email"
                    onChange={(event) => {
                        setEmail(event.target.value);
                    }}
                    required />

                <label className="label">Contact No.</label>
                <input
                    type="text"
                    placeholder="Contact No."
                    onChange={(event) => {
                        setContactNo(event.target.value);
                    }}
                    required />

                <label className="label" required>Branch</label>
                <select placeholder="Branch" value={Branch}
                    onChange={(event) => {
                        setBranch(event.target.value);
                    }}>
                    <option value="">Select Branch</option>
                    <option value="Mathematics & Computing">Mathematics & Computing</option>
                    <option value="Computer Science & Engg.">Computer Science & Engg.</option>
                    <option value="Electrical Engineering">Electrical Engineering</option>
                    <option value="Electronics Engineering">Electronics Engineering</option>
                    <option value="Mechanical Engineering">Mechanical Engineering</option>
                    <option value="Chemical Engineering">Chemical Engineering</option>
                    <option value="Ceramic Engineering">Ceramic Engineering</option>
                    <option value="Pharmaceutical Engineering">Pharmaceutical Engineering</option>
                    <option value="Civil Engineering">Civil Engineering</option>

                </select>

                <label className="label">Image</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                />

                <button type="submit" className="submit button"
                    onClick={handleSubmit}>Submit</button>
            </form>
        </>
    );
};

export default Contact;