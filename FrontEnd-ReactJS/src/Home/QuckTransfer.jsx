



 

import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import './Home.css';
import { useNavigate } from 'react-router-dom'; 

const QuickTransfer = () => {
  const navigate = useNavigate(); 

  const handleSeeMoreClick = () => {
    navigate('./MoneyTransfer');  
  };

  const images = [
    "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
    "https://plus.unsplash.com/premium_photo-1690579805307-7ec030c75543?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29uJTIwaWNvbnxlbnwwfHwwfHx8MA%3D%3D",
    "https://img.freepik.com/free-photo/lifestyle-people-emotions-casual-concept-confident-nice-smiling-asian-woman-cross-arms-chest-confident-ready-help-listening-coworkers-taking-part-conversation_1258-59335.jpg",
    "https://media.gettyimages.com/id/1424988699/photo/businessman-contemplating-in-the-office-looking-through-the-window.jpg?s=612x612&w=gi&k=20&c=ec8N6SmeF0UkzAU7k31pa32TFzMDYGCoiE0bQVUurX8="
  ];

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    swipeToSlide: true,
    touchMove: true,
    arrows: false,
    dots: false
  };

  return (
    <div className='quick-div'>
      <div className='flex'>
        <p className='op-t-1'>QUICK MONEY TRANSFERS</p>
                <p onClick={handleSeeMoreClick} className='red'>SEE MORE &gt;</p> 
      </div>
      <div className='transfer-carousel'>
        <Slider {...settings}>
          {images.map((src, index) => (
            <div key={index}>
              <img className='Profile' src={src} alt={`profile-${index}`} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default QuickTransfer;
