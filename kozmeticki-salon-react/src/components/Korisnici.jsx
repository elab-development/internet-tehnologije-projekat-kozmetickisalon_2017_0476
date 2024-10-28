import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Korisnici = () => {
    const [korisnici, setKorisnici] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const token = sessionStorage.getItem('access_token'); // Retrieve the token

    useEffect(() => {
        const fetchKorisnici = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/users', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setKorisnici(response.data.data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchKorisnici();
    }, [token]);

    // Open modal with selected user details
    const openModal = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    // Close modal
    const closeModal = () => {
        setSelectedUser(null);
        setIsModalOpen(false);
    };

    // Function to delete a user
    const deleteUser = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // Update the state locally by removing the deleted user
            setKorisnici(korisnici.filter(user => user.id !== id));
            setSelectedUser(null);
            alert("User deleted successfully.");
        } catch (error) {
            console.error("Error deleting user:", error);
            alert("Failed to delete user.");
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className='korisnici-page'>
        <div className="korisnici-container">
            <h2>Korisnici</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Ime</th>
                        <th>Email</th>
                        <th>Akcije</th>
                    </tr>
                </thead>
                <tbody>
                    {korisnici.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <button onClick={() => openModal(user)}>Detalji</button>
                                <button onClick={() => deleteUser(user.id)}>Obriši</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal for displaying user details */}
            {isModalOpen && selectedUser && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Detalji korisnika</h3>
                        <p><strong>ID:</strong> {selectedUser.id}</p>
                        <p><strong>Ime:</strong> {selectedUser.name}</p>
                        <p><strong>Email:</strong> {selectedUser.email}</p>
                        <p><strong>Uloga:</strong> {selectedUser.is_admin ? 'Admin' : 'Posetilac'}</p>
                        <button onClick={() => deleteUser(selectedUser.id)}>Obriši korisnika</button>
                        <button onClick={closeModal}>Zatvori</button>
                    </div>
                </div>
            )}
        </div>
        </div>
    );
};

export default Korisnici;
