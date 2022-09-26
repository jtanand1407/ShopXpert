import React from "react";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";

function Header() {
  
  const [{basket , user} ,dispatch]=useStateValue();

  const handleAuthentication = () =>{
    auth.signOut();
  }

  return (
    <div className="header">
      <Link to="/">
        <img
          className="header__logo"
          src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
        />
      </Link>
      <div className="header__search">
        <input className="header__searchInput" type="text" />
        <SearchIcon className="header__searchIcon" />
      </div>
      <div className="header__nav">
        <Link to={!user && "/login"}>
        <div  onClick={handleAuthentication} className="header__options">
          <span className="firstline">{ (user) ? `Hello, ${user?.email}` : 'Hello Guest'}</span>
          <span className="secondline">{user ? 'Sign Out' : 'Sign In'}</span>
        </div>
        </Link>
        <Link to='./orders'>
        <div className="header__options">
          <span className="firstline">Returns</span>
          <span className="secondline">& Orders</span>
        </div>
        </Link>
        
        <div className="header__options">
          <span className="firstline">Your</span>
          <span className="secondline">Prime</span>
        </div>
        <Link to="/checkout">
        <div className="header__optionbasket">
            <ShoppingBasketIcon />
            <span className="secondline basket__count">{basket?.length}</span>
          </div>
        </Link>
          
        
      </div>
    </div>
  );
}

export default Header;
