import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, useSearchParams } from 'react-router-dom';
import DoctorList from './DoctorList';
import Filters from './Filters';
import SearchBar from './SearchBar';

const API_URL = 'https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json';

const MainApp = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [consultType, setConsultType] = useState(searchParams.get('consultType') || '');
  const [specialties, setSpecialties] = useState(searchParams.getAll('specialties'));
  const [sort, setSort] = useState(searchParams.get('sort') || '');

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        setDoctors(data);
      });
  }, []);

  useEffect(() => {
    let result = [...doctors];

    if (searchTerm) {
      result = result.filter(doc =>
        doc.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (consultType) {
      result = result.filter(doc => doc.consultation_type === consultType);
    }

    if (specialties.length) {
      result = result.filter(doc =>
        specialties.some(spec => doc.speciality.includes(spec))
      );
    }

    if (sort === 'fees') {
      result.sort((a, b) => a.fees - b.fees);
    } else if (sort === 'experience') {
      result.sort((a, b) => b.experience - a.experience);
    }

    setFilteredDoctors(result);
  }, [doctors, searchTerm, consultType, specialties, sort]);

  return (
    <div style={{ display: 'flex', padding: '1rem' }}>
      <div style={{ flex: '1' }}>
        <Filters
          consultType={consultType}
          setConsultType={setConsultType}
          specialties={specialties}
          setSpecialties={setSpecialties}
          sort={sort}
          setSort={setSort}
          setSearchParams={setSearchParams}
        />
      </div>
      <div style={{ flex: '3' }}>
        <SearchBar
          doctors={doctors}
          setSearchTerm={setSearchTerm}
          searchTerm={searchTerm}
          setSearchParams={setSearchParams}
        />
        <DoctorList doctors={filteredDoctors} />
      </div>
    </div>
  );
};

const App = () => (
  <Router>
    <MainApp />
  </Router>
);

export default App;
