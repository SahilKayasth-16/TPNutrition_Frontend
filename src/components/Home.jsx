import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import "../styles/Home.css";
import Img from '../assets/tanay.jpg';
import Navbar from './Navbar';

const Home = () => {
    const navigate = useNavigate();

    const goToForm = () => {
        navigate("/Form");
    }
    return (
        <>
        <div style={{backgroundImage: `url(${process.env.PUBLIC_URL + 'images/background.jpg'})`, 
                     backgroundSize: 'cover',
                     backgroundPosition: 'center',
                     backgroundRepeat: 'no-repeat',
                     backgroundAttachment: 'fixed',
                     height: '100vh'}}>
            <Navbar />
            <section>
                <div className="img">
                    <img src={Img} alt="Couldn't load it" height={425} width={425} />
                </div>
                <div className="description">
                    <h1>Transform your body & life</h1>
                    <p>Hey, I am Tanay Parmar, a fitness enthusiast with a goal to spread awareness
                        about the importance of fitness and nutrition in our daily lives.
                    </p>
                    <div className="qualification">
                        <ul>
                            <li>Personal Trainer EREPS Level 4</li>
                            <li>Nutritionist</li>
                            <li>Strength & Conditioning Coach</li>
                        </ul>
                    <h3><b>EXPERT IN:</b></h3>
                    <ul>
                        <li>Fatloss</li>
                        <li>Strength training</li>
                        <li>Tabata & funtional training</li>
                    </ul>
                    </div>

                    <Link to="/Form">
                        <button onClick={goToForm}>Book an appointment</button>
                    </Link>
                        
                </div>
                <div className="social_media">
                        <ul>
                            <a href="https://instagram.com/wellness_warrior_22" target="_blank" rel="noopener noreferrer">
                                <li><i className="fa-brands fa-instagram"></i></li>
                            </a>
                            <a href="https://facebook.com/tanay.parmar.752" target="_blank" rel="noopener noreferrer">
                                <li><i className="fa-brands fa-facebook-f"></i></li>
                            </a>
                            <a href="https://wa.me/919313559080?text=Hello%20I%20want%20to%20book%20a%20consultation" target="_blank" rel="noopener noreferrer">
                                <li><i className="fa-brands fa-whatsapp"></i></li>
                            </a>
                        </ul>
                </div>
            </section>
        </div>
        </>
    );
}

export default Home;