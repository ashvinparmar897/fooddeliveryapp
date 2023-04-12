import React, { useEffect } from "react";
import Card from "../components/Card";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useState } from "react";

const Home = () => {
  const [search, setSearch] = useState("");
  const [foodItem, setfoodItem] = useState([]);
  const [foodCat, setfoodCat] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    setfoodItem(response[0]);
    setfoodCat(response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div>
        {" "}
        <Navbar />
      </div>
      <div>
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade"
          style={{ objectFit: "contain !important" }}
          data-bs-ride="carousel"
        >
          <div className="carousel-inner" id="carousel">
            <div className="carousel-caption" style={{ zIndex: "10" }}>
              <div className="d-flex jsustfy-content-center">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="carousel-item active">
              <img
                src="https://source.unsplash.com/random/900×700/?burger"
                className="d-block w-100"
                alt="..."
                style={{ filter: "brightness(30%)" }}
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/900×700/?pastry"
                className="d-block w-100"
                alt="..."
                style={{ filter: "brightness(30%)" }}
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/900×700/?barbeque"
                className="d-block w-100"
                alt="..."
                style={{ filter: "brightness(50%)" }}
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="container">
        {foodCat !== []
          ? foodCat.map((data) => {
              return (
                <div className="row">
                  <div className="fs-3 m-3" key={data._id}>
                    {data.CategoryName}
                  </div>
                  <hr />
                  {foodItem !== []
                    ? foodItem
                        .filter(
                          (items) =>
                            items.CategoryName === data.CategoryName &&
                            items.name
                              .toLowerCase()
                              .includes(search.toLocaleLowerCase())
                        )
                        .map((filteritems) => {
                          return (
                            <div
                              key={filteritems._id}
                              className="col-12 col-sm-6 col-lg-3"
                            >
                              <Card
                                foodItem={filteritems}
                                options={filteritems.options[0]}
                              />{" "}
                            </div>
                          );
                        })
                    : ""}
                </div>
              );
            })
          : ""}
      </div>

      <hr />
      <div>
        {" "}
        <Footer />
      </div>
    </div>
  );
};

export default Home;
