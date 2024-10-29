import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ZakazaniTermini = () => {
    const [termini, setTermini] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedTermin, setSelectedTermin] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [datum, setDatum] = useState('');
    const [vreme, setVreme] = useState('');

    const token = sessionStorage.getItem('access_token'); // Retrieve the token

    useEffect(() => {
        const fetchTermini = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/termini', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setTermini(response.data.data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchTermini();
    }, [token]);

    // Open modal with selected termin details
    const openModal = (termin) => {
        setSelectedTermin(termin);
        setDatum(termin.datum);
        setVreme(termin.vreme);
        setIsModalOpen(true);
    };

    // Close modal
    const closeModal = () => {
        setSelectedTermin(null);
        setIsModalOpen(false);
    };

    const updateTermin = async () => {
        try {
            const response = await axios.put(
                `http://127.0.0.1:8000/api/termini/${selectedTermin.id}`, 
                {
                    datum,
                    vreme
                }, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            // Ažuriramo termine u stanju nakon uspešne izmene
            setTermini(
                termini.map((termin) =>
                    termin.id === selectedTermin.id
                        ? { ...termin, datum, vreme }
                        : termin
                )
            );
            alert(response.data.Poruka); // Prikaz uspešne poruke iz odgovora
            closeModal();
        } catch (error) {
            console.error("Error updating termin:", error);
            alert(error.response?.data?.Greska || "Failed to update termin.");
        }
    };
    
    // Function to delete a termin
    const deleteTermin = async (id) => {
        try {
            const response = await axios.delete(`http://127.0.0.1:8000/api/termini/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setTermini(termini.filter((termin) => termin.id !== id)); // Ažuriramo listu termina
            alert(response.data.Poruka); // Prikaz poruke o brisanju iz odgovora
        } catch (error) {
            console.error("Error deleting termin:", error);
            alert(error.response?.data?.Greska || "Failed to delete termin.");
        }
    };

   
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className='termini-page'>
            <div className="termini-container">
                <h2>Zakazani Termini</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Datum</th>
                            <th>Vreme</th>
                            <th>Usluga</th>
                            <th>Zaposleni</th>
                            <th>Akcije</th>
                        </tr>
                    </thead>
                    <tbody>
                        {termini.map((termin) => (
                            <tr key={termin.id}>
                                <td>{termin.id}</td>
                                <td>{termin.datum}</td>
                                <td>{termin.vreme}</td>
                                <td>{termin.usluga_naziv}</td>
                                <td>{termin.zaposleni_naziv}</td>
                                <td>
                                    <button onClick={() => openModal(termin)}>Izmeni</button>
                                    <button onClick={() => deleteTermin(termin.id)}>Obriši</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Modal for displaying and editing termin details */}
                {isModalOpen && selectedTermin && (
                    <div className="modal">
                        <div className="modal-content">
                            <h3>Izmena termina</h3>
                            <p><strong>ID:</strong> {selectedTermin.id}</p>
                            <label>Datum:</label>
                            <input
                                type="date"
                                value={datum}
                                onChange={(e) => setDatum(e.target.value)}
                            />
                            <label>Vreme:</label>
                            <input
                                type="time"
                                value={vreme}
                                onChange={(e) => setVreme(e.target.value)}
                            />
                            <button onClick={updateTermin}>Sačuvaj izmene</button>
                            <button onClick={closeModal}>Zatvori</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ZakazaniTermini;
