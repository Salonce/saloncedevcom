import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported

interface SearchBarProps {
  onSearch: (latitude: number, longitude: number) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [latitude, setLatitude] = useState<string>('');
  const [longitude, setLongitude] = useState<string>('');

  const handleSearch = () => {
    // Convert to number and validate
    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);

    if (!isNaN(lat) && !isNaN(lon)) {
      onSearch(lat, lon);
    } else {
      // Handle invalid input (e.g., show an error message)
      alert('Please enter valid numeric values for latitude and longitude.');
    }
  };

  return (
<div className="container mt-5">
  <div className="row justify-content-center mb-3 align-items-center">
    <div className="col-6 col-md-3 mb-2 mb-md-0">
      <input
        type="text"
        className="form-control"
        placeholder="Latitude e.g. 5.643"
        value={latitude}
        onChange={(e) => setLatitude(e.target.value)}
      />
    </div>
    <div className="col-6 col-md-3 mb-2 mb-md-0">
      <input
        type="text"
        className="form-control"
        placeholder="Longitude e.g. -73.935"
        value={longitude}
        onChange={(e) => setLongitude(e.target.value)}
      />
    </div>
    <div className="col-12 col-md-2">
      <button className="btn btn-primary w-100" onClick={handleSearch}>
        Search
      </button>
    </div>
  </div>
</div>
  );
};

export default SearchBar;