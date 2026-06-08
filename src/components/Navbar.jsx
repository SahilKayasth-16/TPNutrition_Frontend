import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../styles/Navbar.css";
import Logo from '../assets/logo.png';
import pdf from '../assets/tp_logo.pdf';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header>
            <nav className="navigationBar">
                <div className="nav-container">
                    <div className="logo-section">
                        <a href={pdf} target="_blank" rel="noopener noreferrer">
                            <img src={Logo} alt="TP Nutrition logo" height={55} width={55} id='logo'/>
                        </a>
                        <span>TP Nutrition</span>
                    </div>
                    
                    {/* Hamburger menu button */}
                    <button 
                        className={`hamburger ${isOpen ? 'active' : ''}`} 
                        onClick={toggleMenu} 
                        aria-label="Toggle navigation"
                    >
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </button>

                    {/* Nav Links */}
                    <div className={`nav-links ${isOpen ? 'active' : ''}`}>
                        <ul>
                            <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
                            <li><Link to="/About" onClick={() => setIsOpen(false)}>About</Link></li>
                            <li><Link to="/Transformation" onClick={() => setIsOpen(false)}>Transformation</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
