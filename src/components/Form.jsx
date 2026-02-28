import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../styles/Form.css";
import Logo from '../assets/logo.png';
import pdf from '../assets/tp_logo.pdf';

const Form = () => {
    const [formData, setFormData] = useState({
        name: '', 
        gender: '',
        age: '',
        height: '',
        weight: '',
        city: '',
        contact: '',
        medical: {
            obesity: false,
            pcod_pcos: false,
            thyroid: false,
            asthma: false,
            hypertension: false,
            osteoporosis: false,
            others: false,
        },
        description:'',
        reason: '',
        interest: '',
        goal: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (name in formData.medical) {
            setFormData(prev => ({
                ...prev,
                medical: {
                    ...prev.medical,
                    [name]: checked
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleGenderChange = (e) => {
        setFormData(prev => ({
            ...prev,
            gender: e.target.value
        }));
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Please enter your name.';
        if (!formData.age.trim()) newErrors.age = 'Please enter your age.';
        if (!formData.gender.trim()) newErrors.gender = 'Please select your gender.';
        if (!formData.height.trim()) newErrors.height = 'Please enter your height.';
        if (!formData.weight.trim()) newErrors.weight = 'Please enter your weight.';
        if (!formData.contact.trim()) newErrors.contact = 'Please enter your contact number.';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (validate()) {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/consultation`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });

                const res = await response.json();
                if (res.success) {
                    alert(res.message || 'Form submitted successfully!');
                    console.log('Response from server:', res);

                    // Reset form after success
                    setFormData({
                        name: '', 
                        gender: '',
                        age: '',
                        height: '',
                        weight: '',
                        city: '',
                        contact: '',
                        description: '',
                        medical: {
                            obesity: false,
                            pcod_pcos: false,
                            thyroid: false,
                            asthma: false,
                            hypertension: false,
                            osteoporosis: false,
                            others: false,
                        },
                        reason: '',
                        interest: '',
                        goal: ''
                    });
                } else {
                    alert(res.message || "something went wrong");
                }
            }
            catch (err) {
                console.error('Error submitting form:', err);
                alert('Something went wrong. Please try again.');
            }
        }
    };

    return (
        <div style={{
            backgroundImage: `url(${process.env.PUBLIC_URL + 'images/background.jpg'})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            minHeight: '100vh',
        }}>
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
                <h1>Personal Training Client Intake Form:</h1>
                <div className="disclaimer">
                    <h2><strong>Disclaimer:</strong></h2>
                    <p>This form is used to collect information about clients and used for internal purpose only. 
                    The information you provide is confidential and will be treated accordingly.</p>
                </div>

                <div className='consultationForm'>
                    <form onSubmit={handleSubmit} className="form">
                    <label>Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                    {errors.name && <p style={{color: 'red'}}>{errors.name}</p>}<br /><br />

                    <label>Gender:</label>
                    <input type="radio" name="gender" value="Male" checked={formData.gender === 'Male'} onChange={handleGenderChange} /> Male
                    <input type="radio" name="gender" value="Female" checked={formData.gender === 'Female'} onChange={handleGenderChange} /> Female
                    {errors.gender && <p style={{color: 'red'}}>{errors.gender}</p>}<br /><br />

                    <label>Age:</label>
                    <input type="text" name="age" value={formData.age} onChange={handleChange} />
                    {errors.age && <p style={{color: 'red'}}>{errors.age}</p>}<br /><br />

                    <label>Height:</label>
                    <input type="text" name="height" value={formData.height} onChange={handleChange} />
                    {errors.height && <p style={{color: 'red'}}>{errors.height}</p>}<br /><br />

                    <label>Weight:</label>
                    <input type="text" name="weight" value={formData.weight} onChange={handleChange} />
                    {errors.weight && <p style={{color: 'red'}}>{errors.weight}</p>}<br /><br />

                    <label>City:</label>
                    <input type="text" name="city" value={formData.city} onChange={handleChange} /><br /><br />

                    <label>Contact No.:</label>
                    <input type="text" name="contact" value={formData.contact} onChange={handleChange} />
                    {errors.contact && <p style={{color: 'red'}}>{errors.contact}</p>}<br /><br />

                    <h2>Medical Information:</h2>
                    {Object.keys(formData.medical).map((item) => (
                        <div key={item} style={{ display: 'inline-block', marginRight: '15px' }}>
                            <input
                                type="checkbox"
                                name={item}
                                checked={formData.medical[item]}
                                onChange={handleChange}
                            />
                            <label>{item.replace(/_/g, " ").toUpperCase()}</label>
                        </div>
                    ))}<br /><br />

                    <label>Please Describe:</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        disabled={!formData.medical.others}
                        placeholder="Fill this only when you selected the others checkbox."
                        cols="30"
                        rows="4"
                    /><br /><br />

                    <h2>Current Fitness Level & Goal:</h2>
                    <label>(1) Reason to select me as your personal trainer:</label>
                    <textarea name="reason" cols="30" rows="4" value={formData.reason} onChange={handleChange} /><br /><br />

                    <label>(2) What are your interests and favorite activities:</label>
                    <textarea name="interest" cols="30" rows="4" value={formData.interest} onChange={handleChange} /><br /><br />

                    <label>(3) What are your fitness goals:</label>
                    <textarea name="goal" cols="30" rows="4" value={formData.goal} onChange={handleChange} /><br /><br />

                    <button type="submit">Submit Form</button>
                </form>
                </div>

                <br />
                <h1>Thank You for Consultation.</h1>
            </section>
        </div>
    );
};

export default Form;
