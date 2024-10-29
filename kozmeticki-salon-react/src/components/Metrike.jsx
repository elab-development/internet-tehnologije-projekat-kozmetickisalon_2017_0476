import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, Doughnut } from 'react-chartjs-2';
import useKozmetickeUsluge from './custom-hooks/useKozmetickeUsluge';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Metrike = () => {
    const [totalAppointments, setTotalAppointments] = useState(0);
    const [appointmentsByEmployee, setAppointmentsByEmployee] = useState([]);
    const { usluge, loading, error } = useKozmetickeUsluge('http://127.0.0.1:8000/api/usluge');

    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/metrics', {
                    headers: { Authorization: `Bearer ${sessionStorage.getItem('access_token')}` },
                });
                setTotalAppointments(response.data.totalAppointments);
                setAppointmentsByEmployee(response.data.appointmentsByEmployee);
            } catch (error) {
                console.error("Error fetching metrics:", error);
            }
        };
        fetchMetrics();
    }, []);

   // Filtriraj usluge tako da se prikazuju samo jedinstveni nazivi
    const uniqueUsluge = usluge.reduce((acc, current) => {
        if (!acc.some(item => item.naziv === current.naziv)) {
            acc.push(current);
        }
        return acc;
    }, []);

    // Pripremite podatke za Doughnut chart koristeći samo jedinstvene usluge
    const chartData = {
        labels: uniqueUsluge.map((usluga) => usluga.naziv),
        datasets: [
            {
                label: 'Cena kozmetičkih usluga',
                data: uniqueUsluge.map((usluga) => usluga.cena),
                backgroundColor: [
                    '#FFC1CC',
                    '#FF9AA2',
                    '#FFB7B2',
                    '#FF858D',
                    '#FF5C61'
                ],
                borderColor: '#FFFFFF',
                borderWidth: 1,
            },
        ],
    };

    // Data for employee bar chart
    const employeeData = {
        labels: appointmentsByEmployee.map((item) => item.zaposleni_name),
        datasets: [
            {
                label: 'Number of appointments by employee',
                data: appointmentsByEmployee.map((item) => item.count),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 3,
        plugins: {
            legend: {
                position: 'top',
            },
        },
    };

     // Eksportovanje usluga u CSV
     const handleExport = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/export-csv', {
                headers: { Authorization: `Bearer ${sessionStorage.getItem('access_token')}` },
                responseType: 'blob', // bitno za download
            });

            // Create a link element and trigger download
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'usluge-csv.csv');
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        } catch (error) {
            console.error("Error exporting CSV:", error);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading services: {error.message}</p>;

    return (
        <div className="metrics-page">
            <h2>Salon Metrics</h2>
            <div className="metrics-page-first-row">
                <div className="metric-box-total">
                    <h3>Total appointments</h3>
                    <div className="total-appointments">{totalAppointments}</div>
                </div>

                <div className="metric-box">
                    <h3>Best employees:</h3>
                    <Bar data={employeeData} options={chartOptions} className="metrics-chart" />
                </div>
            </div>

            <h2>Salon Services Overview</h2>
            <div className="chart-container-doughnut" style={{ maxWidth: '500px', margin: '0 auto' }}>
                <Doughnut data={chartData} />
                <button onClick={handleExport} className="export-button">
                Export Services to CSV
            </button>
            </div>
           
        </div>
    );
};

export default Metrike;
