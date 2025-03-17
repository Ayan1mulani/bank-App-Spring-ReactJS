import React from 'react'
import { useNavigate } from 'react-router-dom';

const Header = (props) => {
    const navigate = useNavigate(); 

    
  return (
    <div>
        <div className="top-3">
        <div className="bg-2" onClick={() => navigate(-1)  }>&larr;</div>
        <div> <p className="txt-1">{props.heading}</p></div>
        <div></div>
      </div>
    </div>
  )
}

export default Header
