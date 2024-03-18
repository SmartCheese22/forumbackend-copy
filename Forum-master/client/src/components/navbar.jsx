import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: 'rgb(100, 130, 130)' }}>
  <NavLink className="navbar-brand" to="/">
    College Pathfinder
  </NavLink>
  <button
    className="navbar-toggler"
    type="button"
    data-toggle="collapse"
    data-target="#navbarSupportedContent"
    aria-controls="navbarSupportedContent"
    aria-expanded="false"
    aria-label="Toggle navigation"
  >
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item">
        <NavLink className="nav-link" to="/" activeClassName="active">
          Home
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/dashboard" activeClassName="active">
          Forum
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/users/search" activeClassName="active">
          Search
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/users/compare" activeClassName="active">
          Compare
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/users/collegepredictor" activeClassName="active">
          College Predictor
        </NavLink>
      </li>
    </ul>
    <ul className="navbar-nav ml-auto">
      {!user ? (
        <>
          <li className="nav-item">
            <NavLink className="nav-link" to="/users/login">
              Login
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/users/register">
              Register
            </NavLink>
          </li>
        </>
      ) : (
        <>
          <li className="nav-item">
            <NavLink className="nav-link" to="/me">
              Hi {user.username}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/users/logout">
              Logout
            </NavLink>
          </li>
        </>
      )}
    </ul>
  </div>
</nav>

  );
};

export default NavBar;
