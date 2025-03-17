import React, { useEffect, useState } from "react";
import Bottom from "../Home/Bottom";
import SearchBar from "../Transfer/SearchBar"; 
import "./Style2.css";
import { fetchGetDataWithAuth } from "../Client/Clinet";

const TransactionJ = () => {
  const [transactions, setTransactions] = useState([]);
  const loggedInAccountNumber = sessionStorage.getItem("AccountNumber");

  useEffect(() => {
    console.log("Fetching transaction details...");

    const getAllUsersDetails = async () => {
      try {
        const response = await fetchGetDataWithAuth("Transaction/history");
        console.log("Fetched transaction details:", response);

        const data = response?.data || response;

        if (Array.isArray(data)) {
        setTransactions(data);
        } else {
          console.error("Unexpected data format:", data);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    getAllUsersDetails();
  }, []);

  return (
    <div className="transaction-container">
      {/* Header */}
      <div className="header">
        <h1 className="title">History</h1>
      </div>

      {/* Search Bar */}
      <div className="search-container">
        <SearchBar />
      </div>

      {/* Transaction History */}
      <div className="history">
        {transactions.length > 0 ? (
          transactions.map((transaction, index) => {
            const sender1 = (transaction?.senderAccountNumber || "Unknown");
            const receiver2 = (transaction?.receiverAccountNumber || "Unknown");
            const loggedIn3 = loggedInAccountNumber ? (loggedInAccountNumber) : "Not Logged In";
            const isSent3 = loggedIn3 == sender1; // True if logged-in user is the sender

            const sender = String(transaction?.senderAccountNumber || "Unknown");
            const receiver = String(transaction?.receiverAccountNumber || "Unknown");
            const loggedIn = loggedInAccountNumber ? String(loggedInAccountNumber) : "Not Logged In";

            const isSent = loggedIn === sender; // True if logged-in user is the sender

            console.log(
              `Transaction ID: ${index + 1}, Sender: ${sender}, Receiver: ${receiver}, Logged-in: ${loggedIn}, isSent: ${isSent}`
            );

            return (
              <div key={index} className="transaction-card">
                <div className="transaction-details">
                  <p className="received-from">{isSent ? "Sent to" : "Received from"}</p>
                  <h4 className="name">{isSent ? receiver : sender}</h4>
                  {/* Display Sender and Receiver Account Numbers */}
                  <p className="account-number">
                    {isSent3 ? `${receiver2}` : `${sender1}`}
                  </p>
                  <p className="date">{new Date(transaction?.timestamp).toLocaleString()}</p>
                </div>
                <h4
                  className="amount"
                  style={{ color: isSent ? "#62b1ff " : "#008000" }} // Blue for sent, Green for received
                >
                  {isSent ? `-₹${transaction?.amount}` : `+₹${transaction?.amount}`}
                </h4>
              </div>
            );
          })
        ) : (
          <p className="no-transactions">No transactions found.</p>
        )}
      </div>

      {/* Bottom Navigation */}
      <Bottom />
    </div>
  );
};

export default TransactionJ;