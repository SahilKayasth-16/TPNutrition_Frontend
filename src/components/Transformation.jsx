import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "../styles/Transformation.css";
import Logo from '../assets/logo.png';
import pdf from '../assets/tp_logo.pdf';

const Transformation = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/testimonial`)
      .then((res) => res.json())
      .then((data) => {
        setTestimonials(data);
        console.log("Fetched testimonials:", data);
      })
      .catch(err => console.error("Error fetching testimonials:", err));
  }, []);

  return (
    <div style={{
      backgroundImage: `url(${process.env.PUBLIC_URL + 'images/background.jpg'})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      minHeight: '100vh'
    }}>
      <header>
        <nav className='navigationBar'>
          <div className="container">
            <a href={pdf} target="_blank" rel="noopener noreferrer">
              <img src={Logo} alt="TP Nutrition logo" height={55} width={55} id='logo' />
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

      <section className="transformpage">
        <h1>Client Transformations</h1>

        <div className="imageSection">
          {testimonials.length > 0 ? (
            testimonials.map((client) => (
              <div className="trnasformCard" key={client._id}>
                <div className="img">
                  <img
                    src={`${process.env.REACT_APP_API_URL}${client.imageBefore}`}
                    alt={`${client.name} before transformation`}
                    className="beforeImg"
                  />
                  <img
                    src={`${process.env.REACT_APP_API_URL}${client.imageAfter}`}
                    alt={`${client.name} after transformation`}
                    className="afterImg"
                  />
                </div>

                <div className="clientDetails">
                  <h3><strong>Name:</strong> {client.name}</h3>
                  <h3><strong>Age:</strong> {client.age}</h3>
                  <h3><strong>Goal:</strong> {client.goal}</h3>
                  <p>{client.description}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No testimonials are available now.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Transformation;
