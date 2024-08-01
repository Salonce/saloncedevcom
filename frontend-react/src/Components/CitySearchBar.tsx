import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CitySearchBar.css'; // Custom CSS file

interface City {
    name: string;
    localNames: string | null;
    lat: number;
    lon: number;
    country: string;
    state: string;
}

interface SearchBarProps {
    onSearch: (latitude: number, longitude: number) => void;
}

const CitySearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [query, setQuery] = useState<string>('');
    const [cities, setCities] = useState<City[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

    const handleCitySelect = (latitude: number, longitude: number) => {
        onSearch(latitude, longitude);
        setQuery(''); // Clear the input after selection
        setCities([]); // Clear the dropdown items
        setDropdownOpen(false); // Close the dropdown
    };

    const handleSearch = async () => {
        if (!query) return;

        try {
            const response = await fetch(`/weather/city?city=${query}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data: City[] = await response.json();
            setCities(data);
            setError(null);
            setDropdownOpen(true); // Open dropdown when search results are available
        } catch (err) {
            setError('An error occurred while fetching data.');
            setCities([]);
            setDropdownOpen(false); // Close dropdown if there's an error
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    const handleDropdownClick = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        event.stopPropagation(); // Prevent click event from closing the dropdown
    };

    return (
        <div className="container mt-5">
            <div className="row mb-3">
                <div className="col-md-6 mx-auto position-relative">
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            value={query}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            placeholder="Search for a city..."
                        />
                        <button className="btn btn-primary" onClick={handleSearch}>
                            Search
                        </button>
                    </div>
                    {error && <div className="alert alert-danger mt-3">{error}</div>}
                    {cities.length > 0 && dropdownOpen && (
                        <ul className="dropdown-menu show position-absolute top-100 start-0 mt-1">
                            {cities.map((city, index) => (
                                <li
                                    key={index}
                                    className="dropdown-item"
                                    onClick={() => handleCitySelect(city.lat, city.lon)}
                                    onMouseDown={handleDropdownClick} // Prevent dropdown from closing on item click
                                >
                                    <strong>{city.name}</strong> ({city.state}, {city.country})
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CitySearchBar;