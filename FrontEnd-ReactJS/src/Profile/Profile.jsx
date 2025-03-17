import React, { useEffect, useState } from 'react';
import './Profile.css';
import { useNavigate } from 'react-router-dom'; 
import { fetchGetDataWithAuth } from '../Client/Clinet';


const Profile = () => {



   const [userDetails, setUserDetails] = useState({});
  
   
    useEffect(() => {
      const getUserDetails = async () => {
        const data = await fetchGetDataWithAuth('auth/Logged/user/details');
        if (data) {
          setUserDetails(data); // Set user details only if data is returned
        }
      };
  
      getUserDetails();
    }, []);
  
  








  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle the image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Create a URL for the selected image
      setUserDetails((prev) => ({
        ...prev,
        profileImage: imageUrl
      }));
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log('Profile updated:', userDetails);
    // Here, you would typically send the updated data to an API
  };
  const navigate = useNavigate(); 


  return (
    <div>
        <div className="top-3">
        <div className="bg-2" onClick={() => navigate(-1)  }>&larr;</div>
        <div> <p className="txt-1">Money Transfer</p></div>
        <div></div>
      </div>
    <div className="profile-container">
       
      <div className="profile-card">
        <div className="profile-photo">
          <img
            src={userDetails.profileImage}
            alt="Profile"
            className="profile-img"
            onClick={() => document.getElementById('image-upload').click()} // Trigger file input click
          />
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleImageChange} // Handle the image change
          />
        </div>
        <div className="profile-info">
          <h2> Update Profile Information</h2>

          <form onSubmit={handleUpdate}>
            <div className="profile-inputs">
              <div className="input-field">
                <label htmlFor="address">Address:</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={userDetails.adress}
                  onChange={handleInputChange}
                  placeholder="Enter your address"
                />
              </div>

              {/* <div className="input-field">
                <label htmlFor="dob">Date of Birth:</label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={userDetails.dob}
                  onChange={handleInputChange}
                />
              </div> */}

              <div className="input-field">
                <label htmlFor="gender">Gender:</label>
                <select
                  id="gender"
                  name="gender"
                  value={userDetails.gender}
                  onChange={handleInputChange}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="input-field">
                <label htmlFor="occupation">Occupation:</label>
                <input
                  type="text"
                  id="occupation"
                  name="occupation"
                  value={userDetails.occupation}
                  onChange={handleInputChange}
                  placeholder="Enter your occupation"
                />
              </div>

              <div className="input-field">
                <label htmlFor="phone">Phone Number:</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={userDetails.phoneNo}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="input-field">
                <label htmlFor="email">Email Address:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={userDetails.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                />
              </div>

              <div className="input-field">
                <button type="submit" className="update-btn">Update Profile</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Profile;