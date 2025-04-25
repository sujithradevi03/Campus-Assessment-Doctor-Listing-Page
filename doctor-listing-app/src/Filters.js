import React from 'react';

const specialtiesList = [
  "General Physician", "Dentist", "Dermatologist", "Paediatrician", "Gynaecologist",
  "ENT", "Diabetologist", "Cardiologist", "Physiotherapist", "Endocrinologist",
  "Orthopaedic", "Ophthalmologist", "Gastroenterologist", "Pulmonologist", "Psychiatrist",
  "Urologist", "Dietitian/Nutritionist", "Psychologist", "Sexologist", "Nephrologist",
  "Neurologist", "Oncologist", "Ayurveda", "Homeopath"
];

const Filters = ({ consultType, setConsultType, specialties, setSpecialties, sort, setSort, setSearchParams }) => {
  const handleConsultChange = (value) => {
    setConsultType(value);
    updateParams({ consultType: value });
  };

  const handleSpecialtyChange = (value) => {
    const updated = specialties.includes(value)
      ? specialties.filter(s => s !== value)
      : [...specialties, value];
    setSpecialties(updated);
    updateParams({ specialties: updated });
  };

  const handleSortChange = (value) => {
    setSort(value);
    updateParams({ sort: value });
  };

  const updateParams = (updated) => {
    const params = new URLSearchParams();
    if (updated.consultType !== undefined) params.set('consultType', updated.consultType);
    if (updated.sort !== undefined) params.set('sort', updated.sort);
    if (updated.specialties !== undefined) {
      updated.specialties.forEach(s => params.append('specialties', s));
    } else {
      specialties.forEach(s => params.append('specialties', s));
    }
    setSearchParams(params);
  };

  return (
    <div>
      <h4 data-testid="filter-header-moc">Consultation Mode</h4>
      <label>
        <input type="radio" name="consult" checked={consultType === "Video Consult"} onChange={() => handleConsultChange("Video Consult")} data-testid="filter-video-consult" />
        Video Consult
      </label><br />
      <label>
        <input type="radio" name="consult" checked={consultType === "In Clinic"} onChange={() => handleConsultChange("In Clinic")} data-testid="filter-in-clinic" />
        In Clinic
      </label>

      <h4 data-testid="filter-header-speciality">Speciality</h4>
      {specialtiesList.map(spec => (
        <div key={spec}>
          <input
            type="checkbox"
            checked={specialties.includes(spec)}
            onChange={() => handleSpecialtyChange(spec)}
            data-testid={`filter-specialty-${spec.replace(/\s/g, '-').replace('/', '-')}`}
          />
          {spec}
        </div>
      ))}

      <h4 data-testid="filter-header-sort">Sort</h4>
      <label>
        <input type="radio" name="sort" checked={sort === "fees"} onChange={() => handleSortChange("fees")} data-testid="sort-fees" />
        Fees (Low to High)
      </label><br />
      <label>
        <input type="radio" name="sort" checked={sort === "experience"} onChange={() => handleSortChange("experience")} data-testid="sort-experience" />
        Experience (High to Low)
      </label>
    </div>
  );
};

export default Filters;
