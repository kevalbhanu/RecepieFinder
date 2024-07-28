import React from "react";
import { Link , useNavigate } from "react-router-dom";
import '../Navbar.css';

export default function Navbar() {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const logout = ()=>{
        localStorage.clear();
        navigate('/login');
    }
  return (
    <header className="navbar">
      <div className="navbar-container">
      { !auth ? (<ul className="navbar-list">
          <li className="navbar-item">
            <Link to="/register">Signup</Link>
          </li>
          <li className="navbar-item">
            <Link to="/login">Login</Link>
          </li>
        </ul>):(<>
        <div className="navbar-title">
        <h3>Recepies</h3>
        </div>
            <ul className="navbar-list">
                <li className="navbar-item">
                    <Link onClick={logout} to='/login'>
                    Logout
                    </Link>
                </li>
            </ul>
            </>
        )}
      </div>
    </header>
  );
}
