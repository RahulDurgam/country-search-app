import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, ListGroup, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [query, setQuery] = useState('');
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch countries data from the API
  const fetchCountries = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://restcountries.com/v3.1/all');
      setCountries(response.data);
    } catch (error) {
      console.error('Error fetching countries data:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  // Handle the input change
  const handleChange = (event) => {
    const { value } = event.target;
    setQuery(value);

    // Filter countries based on user input
    if (value) {
      const filtered = countries.filter(country => 
        country.name.common.toLowerCase().includes(value.toLowerCase()) ||
        (country.capital && country.capital[0].toLowerCase().includes(value.toLowerCase()))
      );
      setFilteredCountries(filtered);
    } else {
      setFilteredCountries([]);
    }
  };

  return (
    <Container>
      <h1 className="mt-4 mb-4">Country Search Engine</h1>
      <Form.Control
        type="text"
        placeholder="Search by country name"
        value={query}
        onChange={handleChange}
      />
      {loading && <Spinner animation="border" className="mt-3" />}
      <ListGroup className="mt-3">
        {filteredCountries.map((country, index) => (
          <ListGroup.Item key={index}>
            <strong>{country.name.common}</strong> - {country.capital ? country.capital[0] : 'No Capital'}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default App;