import React from "react";
import { Link } from "react-router-dom";
import "../styles/About.css";
import Logo from '../assets/logo.png';
import pdf from '../assets/tp_logo.pdf';
import FI_FITLINK from '../assets/Fitness_Instructor_FITLINK.jpeg';
import GOMZI from '../assets/GOMZI_Certificate.jpeg';
import NCVET from '../assets/NCVET_Certificate.jpeg';
import PT_FITLINK from '../assets/Personal_Trainer_FITLINK.jpeg';
import PT_FSSA from '../assets/Personal_Trainer_FSSA.jpg';
import PT_SAHSS from '../assets/Personal_Trainer_SAHSS.png';
import SUPPLEMENT_FITLINK from '../assets/Supplementation_FITLINK.jpeg';

const About = () => {
    return (
        <>
        <div style={{backgroundImage: `url(${process.env.PUBLIC_URL + 'images/background.jpg'})`, 
                     backgroundSize: 'cover',
                     backgroundPosition: 'center',
                     backgroundRepeat: 'no-repeat',
                     height: '100vh'}}>
            <header>

                <nav className='navigationBar'>
                    <div className="container">
                        <a href={pdf} target="_blank" rel="noopener noreferrer">
                            <img src={Logo} alt="TP Nutrition logo" height={55} width={55} id='logo'/>
                        </a>
                        <span>&nbsp;&nbsp;&nbsp;TP Nutrition</span>
                    </div>
                    <div className="container1">
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/About">About</Link></li>
                            <li><Link to="/Transformation">Transformation</Link></li>
                        </ul>
                    </div>
                </nav>

            </header>

            <section>
                    <div className="Education">
                        <h3>Education:</h3>
                        <p><strong>Course Name:</strong> Pursuing Bachelor of Physiotherapy(BPT)</p>
                        <p><strong>College Name:</strong>Shrimad Rajchandra College of  Physiotherapy, Uka Tarsadia University, Maliba Campus</p>
                    </div><br /><br />

                    

                    <div className="Certifications">
                    <h3>Certifications:</h3>
                        <div className="part">
                            <div className="item">
                                <div className="image">
                                    <a href={FI_FITLINK} target="_blank" rel="noreferrer noopener">
                                        <img src={FI_FITLINK} alt="Fitness Instructor Certificate by Fitlink" height={125} width={125} id='cert_img'/>
                                    </a>    
                                </div>
                                <div className="description1">
                                    <p><strong>Issued By: </strong>Fitness Instructor Certificate by Fitlink</p>
                                </div>    
                            </div>

                            <div className="item">
                                <div className="image">
                                    <a href={GOMZI} target="_blank" rel="noreferrer noopener">
                                        <img src={GOMZI} alt="GOMZI International Institute of Teaching certificate" height={125} width={125} id='cert_img'/>
                                    </a> 
                                </div>
                                <div className="description">
                                    <p><strong>Issued By: </strong>GOMZI International Institute of Teaching</p>
                                </div>
                            </div>

                            <div className="item">
                                <div className="image">
                                    <a href={NCVET} target="_blank" rel="noreferrer noopener">
                                        <img src={NCVET} alt="National Council for Vocational Education & Training certificate" height={125} width={125} id='cert_img'/>
                                    </a>
                                </div>
                                <div className="description">
                                    <p><strong>Issued By: </strong>National Council for Vocational Education & Training</p>
                                </div>
                            </div>

                            <div className="item">
                                <div className="image">
                                    <a href={PT_FITLINK} target="_blank" rel="noreferrer noopener">
                                        <img src={PT_FITLINK} alt="Personal Trainer Certificate" height={125} width={125} id='cert_img'/>
                                    </a> 
                                </div>
                                <div className="description">
                                    <p><strong>Issued By: </strong>Personal Trainer Certificate by Fitlink</p>
                                </div>
                            </div>

                            <div className="item">
                                <div className="image">
                                    <a href={PT_FSSA}  target="_blank" rel="noreferrer noopener">
                                        <img src={PT_FSSA} alt="Personal Trainer Certificate by Fitness & Sports Science Association" height={125} width={125} id='cert_img'/>
                                    </a>
                                </div>
                                <div className="description">
                                    <p><strong>Issued By: </strong>Personal Trainer Certificate by Fitness & Sports Science Association</p>
                                </div>
                            </div>

                            <div className="item">
                                <div className="image">
                                    <a href={PT_SAHSS} target="_blank" rel="noreferrer noopener">
                                        <img src={PT_SAHSS} alt="Personal Trainer Certificate by SAHSS & FSSA" height={125} width={125} id='cert_img'/>
                                    </a>  
                                </div>
                                <div className="description">
                                    <p><strong>Issued By: </strong>Personal Trainer Certificate by SAHSS & FSSA</p>
                                </div>
                            </div>

                            <div className="item">
                                <div className="image">
                                    <a href={SUPPLEMENT_FITLINK} target="_blank" rel="noreferrer noopener">
                                        <img src={SUPPLEMENT_FITLINK} alt="Sports Nutrition  & Supplementation Certificate by Fitlink" height={125} width={125} id='cert_img'/>
                                    </a>                               
                                </div>
                                <div className="description">
                                    <p><strong>Issued By: </strong>Sports Nutrition  & Supplementation Certificate by Fitlink</p>
                                </div>
                            </div>
                        </div>
                    </div>
            </section>
        </div>
        </>
    );
}
export default About;