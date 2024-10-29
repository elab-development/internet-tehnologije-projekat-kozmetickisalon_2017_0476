import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Metrike = () => {
    const [totalAppointments, setTotalAppointments] = useState(0);
    const [appointmentsByEmployee, setAppointmentsByEmployee] = useState([]);

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
            }
        },
    };

    return (
        <div className="metrics-page">
             <h2>Salon Metrics</h2>
            <div className='metrics-page-first-row'>
           
            <div className="metric-box-total">
                <h3>Total appointments</h3>
                <div className="total-appointments">{totalAppointments}</div>
            </div>

            <div className="metric-box">
                <h3>Best employees:</h3>
                <Bar data={employeeData} options={chartOptions} className="metrics-chart" />
            </div>
            </div>

        </div>
    );
};

export default Metrike;
