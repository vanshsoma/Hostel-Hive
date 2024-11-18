import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FoodMenu.css';

const FoodMenu = () => {
    const [weeklySchedules, setWeeklySchedules] = useState([]);
    const [weekIndex, setWeekIndex] = useState(0);

    // Fetch schedules from the backend
    useEffect(() => {
        const fetchSchedules = async () => {
            try {
                const response = await axios.get('http://localhost:5002/api/schedules');
                setWeeklySchedules(response.data);
            } catch (error) {
                console.error('Error fetching schedules:', error);
            }
        };

        fetchSchedules();
    }, []);

    // Go to the next week
    const nextWeek = () => {
        setWeekIndex((prevIndex) => (prevIndex + 1) % weeklySchedules.length);
    };

    // Go to the previous week
    const prevWeek = () => {
        setWeekIndex((prevIndex) => (prevIndex - 1 + weeklySchedules.length) % weeklySchedules.length);
    };

    // Render only if weeklySchedules has data
    if (weeklySchedules.length === 0) return <p>Loading...</p>;

    const currentWeekSchedule = weeklySchedules[weekIndex].days;

    return (
        <div className="weekly-schedule">
            <h2>Week {weekIndex + 1}</h2>
            <table>
                <thead>
                    <tr>
                        <th>Day</th>
                        <th>Breakfast</th>
                        <th>Lunch</th>
                        <th>Snacks</th>
                        <th>Dinner</th>
                    </tr>
                </thead>
                <tbody>
                    {currentWeekSchedule.map((item, index) => (
                        <tr key={index}>
                            <td>{item.day}</td>
                            <td>{item.breakfast}</td>
                            <td>{item.lunch}</td>
                            <td>{item.snacks}</td>
                            <td>{item.dinner}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="navigation-buttons">
                <button onClick={prevWeek} style={{ marginRight: '10px' }}>&lt;</button>
                <button onClick={nextWeek}>&gt;</button>
            </div>
        </div>
    );
};

export default FoodMenu;
