import React from "react";
import "./Home.css";
import Product from "./Product";


function Home() {
  return (
    <div className="home">
      <div className="home__container">
        <img className="home__image" src="./batman.png" />
        <div className="home__row">
          <Product id={123} title="The Lean StartUp" price={199} rating={3} image="./leanstartup2.jpg" />
          <Product id={234} title="Singer Sewing Machine" price={899} rating={4} image="./sewing machine.jpg"/>
        </div>
        <div className="home__row">
          <Product id={345} title="OnePlus Nord CE 2 5G (Bahamas Blue, 8GB RAM, 128GB Storage)" price={11999} rating={5} image="./smartphone.jpg" />
          <Product id={456} title="Garnier Men Power White Anti-Pollution Double Action Facewash" price={169} rating={4} image="./garnier.jpg" />
          <Product id={567} title="Bella Voste Eye Liner Kohl Gel" price={478} rating={5} image="./kajal.jpg"/>
        </div>
        <div className="home__row">
          <Product id={678} title="TCL Next Generation Smart Tv" price={59999} rating={5} image="./smarttv.jpg" />
        </div>

        <div className="home__row">
          
        </div>
      </div>
    </div>
  );
}

export default Home;
