import React from "react";
import {Link} from "react-router-dom"
import '../styles/Header.css'; // Adjust the import path

function Header() {

    return (

        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                    <Link to="/random" className="nav-link">Home Page</Link>
                    </li>
                    <li className="nav-item">
                    <Link to="/add" className="nav-link">Create Ads</Link>
                    </li>
                    <li className="nav-item">
                    <Link to="/" className="nav-link">Ads Gallery</Link>
                    </li>
                    <li className="nav-item">
                    <Link to="/manage" className="nav-link">Manage Ads</Link>
                    </li>
                    <li className="nav-item">
                    <Link to="/statistic" className="nav-link">Ads Statistic</Link>
                    </li>
                    <li className="nav-item">
                    <Link to="/get" className="nav-link">Ads Payment</Link>
                    </li>
                </ul>
                </div>
            </div>
            </nav>
        </div>
    )
}

// export default Header;
// import React,{useState} from "react";
// import { Link } from "react-router-dom";

// function Header() {
//   return (

    

//     <ul className="nav nav-pills">
//       <li className="nav-item">
//       <Link to ="/home" className="nav-link">Home</Link>
//       </li>
//       <li className="nav-item">
//         <a className="nav-link" href="/add">Add Package</a>
//       </li>
//       <li className="nav-item">
//         <a className="nav-link" href="/view">View Form</a>
//       </li>
//       <li className="nav-item">
//         <a className="nav-link" href="/select" aria-disabled="true">Package Counts</a>
//       </li>

//       <li className="nav-item">
//         <a className="nav-link" href="/uploads" aria-disabled="true">Recipts</a>
//       </li>
      
//     </ul>


//   );
// }

export default Header;
