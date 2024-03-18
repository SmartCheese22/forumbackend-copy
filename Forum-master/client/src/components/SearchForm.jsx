import React, { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import Button from 'react-bootstrap/Button';
import './SearchForm.css'; // Import custom CSS for SearchForm

const SearchForm = ({ onSearch }) => {
  const [college, setCollege] = useState('');
  const [major, setMajor] = useState('');

  // Define options for colleges and branches
  const collegeOptions = [
    'IIT Bombay',
    'IIT Delhi',
    'IIT Madras',
    'IIT Kanpur',
    'IIT Kharagpur',
    'IIT Roorkee',
    'IIT Guwahati',
    'IIT Hyderabad',
    'IIT Varanasi',
    'IIT Indore',
    'IIT Gandhinagar',
    'IIT Patna',
    'IIT Bhubaneswar',
    'IIT Ropar',
    'IIT Mandi'
  ];

  const branchOptions = ['CSE', 'EE', 'ME', 'CE', 'CHE', 'PHY','CHM', 'AE', 'BSBE'];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ college, major });
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <div className="input-group">
        <select
          className="form-control"
          value={college}
          onChange={(e) => setCollege(e.target.value)}
        >
          <option value="">Select College</option>
          {collegeOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        <select
          className="form-control"
          value={major}
          onChange={(e) => setMajor(e.target.value)}
        >
          <option value="">Select Major</option>
          {branchOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        <Button variant="primary" type="submit" className="search-btn">
          <BsSearch />
          Search
        </Button>
      </div>
    </form>
  );
};

export default SearchForm;
