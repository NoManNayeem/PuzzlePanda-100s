import React from 'react';
import Slider from 'react-slick';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const SimpleSlider = () => {
  const NextArrow = (props) => {
    const { onClick } = props;
    return (
      <div
        className="absolute top-1/2 right-2 transform -translate-y-1/2 p-2 bg-teal-500 text-white rounded-full cursor-pointer shadow-lg hover:bg-teal-600 transition duration-300 z-10"
        onClick={onClick}
      >
        <FaArrowRight />
      </div>
    );
  };

  const PrevArrow = (props) => {
    const { onClick } = props;
    return (
      <div
        className="absolute top-1/2 left-2 transform -translate-y-1/2 p-2 bg-teal-500 text-white rounded-full cursor-pointer shadow-lg hover:bg-teal-600 transition duration-300 z-10"
        onClick={onClick}
      >
        <FaArrowLeft />
      </div>
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    appendDots: (dots) => (
      <div>
        <ul className="flex justify-center mt-4 space-x-2">{dots}</ul>
      </div>
    ),
    customPaging: (i) => (
      <button className="w-3 h-3 bg-teal-500 rounded-full"></button>
    ),
  };

  return (
    <div className="w-full max-w-4xl mx-auto relative">
      <Slider {...settings}>
        <div>
          <img
            src="https://plus.unsplash.com/premium_photo-1713102866538-8065a1aeccaa?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Slide 1"
            className="w-full h-64 object-cover rounded-lg shadow-lg"
          />
        </div>
        <div>
          <img
            src="https://images.unsplash.com/photo-1563299796-b729d0af54a5?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Slide 2"
            className="w-full h-64 object-cover rounded-lg shadow-lg"
          />
        </div>
        <div>
          <img
            src="https://images.unsplash.com/photo-1572467551143-a57f5de1f861?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Slide 3"
            className="w-full h-64 object-cover rounded-lg shadow-lg"
          />
        </div>
        {/* Add more slides as needed */}
      </Slider>
    </div>
  );
};

export default SimpleSlider;
