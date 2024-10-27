import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ setToken, setIsAdmin }) => {
    const [email, setEmail] = useState('marija@gmail.com');
    const [password, setPassword] = useState('password');
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false); 
    const [isAdmin, setIsAdminState] = useState(false); 
    let navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', {
                email,
                password
            });

            const { access_token, token_type, is_admin, user_email } = response.data; 
            
            // Ispis celog response-a da vidimo šta vraća backend
            console.log('Response data:', response.data);
            
            sessionStorage.setItem('access_token', access_token);
            sessionStorage.setItem('token_type', token_type);
            sessionStorage.setItem('is_admin', is_admin);
            sessionStorage.setItem('is_admin', user_email);
            setToken(access_token);

            // Postavi state za modal i tip korisnika
            setIsAdmin(!!is_admin);
            setIsAdminState(!!is_admin);
            setShowModal(true); // Prikaz modala nakon uspešnog logovanja

            // Ispis u konzoli da li je korisnik admin ili ne
            console.log('Login successful');
            console.log(`Logged in as: ${user_email}`);
            console.log(`User type (is_admin): ${is_admin ? 'Admin' : 'Not an admin'}`);
        } catch (error) {
            setError('Nisu dobri parametri za login.');
        }
    };

    // Funkcija za zatvaranje modala i preusmeravanje
    const handleCloseModal = () => {
        setShowModal(false);
        if (isAdmin) {
            navigate('/admin/usluge');
        } else {
            navigate('/usluge');
        }
    };

        return (
            <div className="login-page">
                <div className="form-container">
                    <div className="login-form">
                        <h2>Prijavite se:</h2>
                        {error && <p className="error">{error}</p>}
                        <form onSubmit={handleSubmit}>
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
                            <button type="submit" className="submit-button">Prijava</button>
                        </form>
                    </div>
                </div>
                <div className="image-container">
                    <img src="https://sunsetmall.ae/wp-content/uploads/2023/04/Cerise-Home-Page.jpg" alt="Beauty Salon" />
                </div>
    
                {showModal && (
                    <div className="modal">
                        <div className="modal-content">
                            <h3>Uspešno ste se logovali!</h3>
                            <p>{isAdmin ? 'Vi ste admin ovog kozmetickog salona' : 'Dobrodošli u naš kozmetički salon'}</p>
                            <button onClick={handleCloseModal} className="close-button">OK</button>
                        </div>
                    </div>
                )}
            </div>
        );
};

export default LoginForm;


