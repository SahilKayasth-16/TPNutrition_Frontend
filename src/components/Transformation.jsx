import React, { useEffect, useState } from 'react';
import "../styles/Transformation.css";
import Navbar from './Navbar';

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
      <Navbar />

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
