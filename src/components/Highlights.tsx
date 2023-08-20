"use client";
import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import products from "@/app/products";

function SampleNextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, color: "black" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, color: "black" }}
      onClick={onClick}
    />
  );
}

export default class AdaptiveHeight extends Component {
  render() {
    var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      initialSlide: 0,
      autoplay: true,
      autoplaySpeed: 2000,
      cssEase: "linear",
      pauseOnHover: true,
      adaptiveHeight: true,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 900,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 680,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
          },
        },
      ],
    };

    return (
      <div className="bg-slate-100 ">
        <div className=" m-10 ">
          <h1 className="text-center text-3xl font-bold text-blue-950 pt-10">
            Our Featured Product
          </h1>
          <Slider {...settings}>
            {products.map((product) => (
              <div
                key={product.id}
                className="p-10 product-card hover:scale-110 object-cover transition-transform duration-300 "
              >
                <Image
                  src={product.src}
                  height={380}
                  width={380}
                  alt={product.alt}
                />
                <h1 className="text-3xl">{product.alt}</h1>
                <p>{product.price} </p>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    );
  }
}
