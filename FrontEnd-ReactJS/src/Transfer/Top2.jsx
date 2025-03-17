import React from "react";
import "./Style.css";
import ReciverBox from "./ReciverBox";
import Header from "../Header/Header";
import SearchBar from "./SearchBar";


const Top2 = () => {


  return (
    <div>
      <div>
      <Header heading="Money Transfer"/>
      </div>
      <div>
        <SearchBar/>
      </div>
      {/* Receiver Box */}

      <ReciverBox/>
   
    </div>
  );
};

export default Top2;