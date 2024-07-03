// src/CountryStateSelector.js
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CountryStateSelector = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);

  useEffect(() => {
    // Fetch countries data
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => {
        const countryOptions = data.map(country => ({
          value: country.cca2,
          label: country.name.common,
        }));
        setCountries(countryOptions);
      });
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      // Fetch states data for selected country
      fetch(`https://api.example.com/states?country=${selectedCountry.value}`)
        .then(response => response.json())
        .then(data => {
          const stateOptions = data.map(state => ({
            value: state.code,
            label: state.name,
          }));
          setStates(stateOptions);
        });
    } else {
      setStates([]);
    }
  }, [selectedCountry]);

  const handleStateChange = selectedState => {
    setSelectedState(selectedState);
    if (selectedState) {
      toast(`Selected State: ${selectedState.label}`);
    }
  };

  return (
    <div>
      <Select
        options={countries}
        onChange={setSelectedCountry}
        placeholder="Select a country"
      />
      <Select
        options={states}
        onChange={handleStateChange}
        placeholder="Select a state"
        isDisabled={!selectedCountry}
      />
      <ToastContainer />
    </div>
  );
};

export default CountryStateSelector;
