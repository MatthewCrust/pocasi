import React, { useState, useContext } from 'react';
import './HomePage.css';
import Card from './card';
import { AuthContext } from './AuthContext';

function HomePage() {
    const [city, setCity] = useState('');
    const [cards, setCards] = useState([]);
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

    const handleAddCard = () => {
        if (city !== '') {
            setCards([...cards, city]);
            setCity('');
        }
    };

    if (!isLoggedIn) {
        return null; 
    }

    return (
        <div className="HomePage">
            <div className="navbar">
                <div className="nav-input-container">
                    <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Zadejte město"
                    />
                    <button onClick={handleAddCard}>Přidat</button>
                </div>
            </div>
            {cards.map((mesto, index) => (
                    <Card key={index} mesto={mesto} />
                ))}
        </div>

    );
}

export default HomePage;
