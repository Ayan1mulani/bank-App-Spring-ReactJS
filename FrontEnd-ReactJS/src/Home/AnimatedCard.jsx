import React from "react";
import { motion } from "framer-motion";
import { CreditCard } from "lucide-react";
import "./AnimatedCard.css";

const AnimatedCard = ({userDetails}) => {
  return (
    <div className="container">
      <motion.div
        className="animated-card"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.5 }}
      >
        {/* Shine Effect */}
        <div className="shine"></div>

        {/* Visa Logo */}
        <div className="visa-logo">VISA</div>

        {/* Chip Icon */}
        <div className="chip-icon">
          <CreditCard size={32} />
        </div>

        {/* Card Number */}
        <div className="card-number">
        {userDetails.accountNumber}
        </div>

        {/* Card Holder */}
        <div className="card-holder">
          <span className="label">{userDetails.accountHolderName?"Card Holder":"No Bank Found"}</span>
         {userDetails.accountHolderName}
        </div>

        {/* Expiry Date */}
        <div className="expiry-date">
          <span className="label">Expires</span>
          <span className="label">{userDetails.accountHolderName?"12/27":"Create Bank account ↓"}</span>
        </div>
      </motion.div>
    </div>
  );
};

export default AnimatedCard;