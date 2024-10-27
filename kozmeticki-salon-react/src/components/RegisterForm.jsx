import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await axios.post('http://127.0.0.1:8000/api/register', {
                name,
                email,
                password
            });

            setShowModal(true);
            setError('');
        } catch (error) {
            setError('Neuspešna registracija. Proverite podatke i pokušajte ponovo.');
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        navigate('/login');
    };

    return (
        <div className="registration-page">
            <div className="form-container">
                <div className="register-form">
                    <h2>Registrujte se:</h2>
                    {error && <p className="error">{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Ime:</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Lozinka:</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="submit-button">Registracija</button>
                    </form>
                </div>
            </div>
            <div className="image-container">
                <img src="https://sunsetmall.ae/wp-content/uploads/2023/04/Cerise-Home-Page.jpg" alt="Beauty Salon" />
            </div>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Registracija uspešna!</h3>
                        <p>Možete se sada prijaviti.</p>
                        <button onClick={handleCloseModal} className="close-button">OK</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RegisterForm;
