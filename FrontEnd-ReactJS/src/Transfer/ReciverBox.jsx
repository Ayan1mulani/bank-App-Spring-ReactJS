import React, { useEffect, useState } from "react";
import "./Style.css";
import { useNavigate } from "react-router-dom";
import { fetchGetDataWithAuth } from "../Client/Clinet";

const avatarUrls = [
  "https://cdn0.iconfinder.com/data/icons/fashion-avatars/512/Avatar_09.png",
  "https://cdn0.iconfinder.com/data/icons/fashion-avatars/512/Avatar_08.png",
  "https://cdn0.iconfinder.com/data/icons/fashion-avatars/512/Avatar_07.png",
  "https://cdn0.iconfinder.com/data/icons/fashion-avatars/512/Avatar_10.png"
];

const getRandomAvatar = () => {
  return avatarUrls[Math.floor(Math.random() * avatarUrls.length)];
};

const ReciverBox = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   console.log("Fetching user details...");
  //   const getAllUsersDetails = async () => {
  //     try {
  //       const response = await fetchGetDataWithAuth("auth/All/user/details");
  //       console.log("Fetched user details:", response);

  //       // Ensure data is correctly structured
  //       const data = response?.data || response; 

  //       if (Array.isArray(data)) {
  //         setUserDetails(data.map(user => ({
  //           ...user,
  //           avatar: getRandomAvatar() // Assign a random avatar to each user
  //         })));
  //       } else {
  //         console.error("Expected an array but received:", data);
  //         setError("Invalid data format received from API");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching user details:", error);
  //       setError("Failed to fetch user details");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   getAllUsersDetails();
  // }, []);

    useEffect(() => {
      console.log("Fetching transaction details...")

  const getAllUsersDetails = async () => {
    try {
      const response = await fetchGetDataWithAuth("auth/All/user/details");
      console.log("Fetched transaction details:", response);

      const data = response?.data || response;

      if (Array.isArray(data)) {
        setUserDetails(data.map(user => ({
          ...user,
          avatar: getRandomAvatar() // Assign a random avatar to each user
        })));
      } else {
        console.error("Unexpected data format:", data);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
            setLoading(false);
          }
  };

  getAllUsersDetails();
}, []);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div>
      {loading ? (
        <p>Loading user details...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : userDetails.length > 0 ? (
        userDetails.map((user, index) => (
          <div key={index} className={`receiver ${expandedIndex === index ? "expanded" : ""}`}>
            <div className="receiver-header" onClick={() => toggleExpand(index)}>
              <img className="img3" src={user.avatar} alt="Profile" />
              <div>
                <p className="txt4">{user.accountHolderName || "N/A"}</p>
                <p className="txt5">{user.email || "N/A"}</p>
              </div>
            </div>
            {expandedIndex === index && (
              <div className="extra-info">
                <p>Acc No: {user.accountNumber || "Not Available"}</p>
                <div className="style3">
                  <p>Contact: {user.phoneNo || "Not Available"}</p>
                  <button 
                    onClick={() => navigate("./SendMoney", { 
                      state: { name: user.accountHolderName, accNumber: user.accountNumber } 
                    })}
                  >
                    Send Money
                  </button>
                </div>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default ReciverBox;