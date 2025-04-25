import React from 'react';

const DoctorList = ({ doctors }) => {
  return (
    <div>
      {doctors.map((doc, index) => (
        <div key={index} data-testid="doctor-card" style={{ background: 'white', margin: '10px', padding: '10px' }}>
          <div data-testid="doctor-name">{doc.name}</div>
          <div data-testid="doctor-specialty">{doc.speciality.join(', ')}</div>
          <div data-testid="doctor-experience">{doc.experience} years</div>
          <div data-testid="doctor-fee">₹{doc.fees}</div>
        </div>
      ))}
    </div>
  );
};

export default DoctorList;
