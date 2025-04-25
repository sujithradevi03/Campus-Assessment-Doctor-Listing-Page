document.addEventListener('DOMContentLoaded', () => {
    const autocompleteInput = document.getElementById('autocomplete-input');
    const suggestionsList = document.getElementById('suggestions');
    const doctorListContainer = document.getElementById('doctor-list');
    const consultationFilters = document.querySelectorAll('input[name="consultation-type"]');
    const specialtyCheckboxes = document.querySelectorAll('input[type="checkbox"][data-testid^="filter-specialty-"]');
    const sortRadios = document.querySelectorAll('input[name="sort-by"]');

    let allDoctors = [];
    let filteredDoctors = [];

    async function fetchDoctors() {
        try {
            const response = await fetch('https://sujithradevi03.github.io/campus-api-mock/SRM-C1-25.json');
            const data = await response.json();
            allDoctors = data;
            applyFiltersAndSearch();
        } catch (error) {
            console.error('Error fetching data:', error);
            doctorListContainer.innerHTML = '<p>Failed to load doctors.</p>';
        }
    }

    function renderDoctors(doctors) {
        doctorListContainer.innerHTML = '';
        if (doctors.length === 0) {
            doctorListContainer.innerHTML = '<p>No doctors found matching your criteria.</p>';
            return;
        }

        doctors.forEach(doctor => {
            const card = document.createElement('div');
            card.classList.add('doctor-card');
            card.setAttribute('data-testid', 'doctor-card');

            card.innerHTML = `
                <h3 class="doctor-name" data-testid="doctor-name">${doctor.name}</h3>
                <p class="doctor-specialty" data-testid="doctor-specialty">${doctor.specialty.join(', ')}</p>
                <p class="doctor-experience" data-testid="doctor-experience">Experience: ${doctor.experience} years</p>
                <p class="doctor-fee" data-testid="doctor-fee">Fees: ₹${doctor.fees}</p>
            `;

            doctorListContainer.appendChild(card);
        });
    }

    function filterDoctors(doctors, filters) {
        return doctors.filter(doctor => {
            const consultationMatch = !filters.consultationType || doctor.consultation_type === filters.consultationType;
            const specialtyMatch = filters.specialties.length === 0 || filters.specialties.some(spec => doctor.specialty.includes(spec));
            const nameMatch = !filters.searchTerm || doctor.name.toLowerCase().includes(filters.searchTerm.toLowerCase());
            return consultationMatch && specialtyMatch && nameMatch;
        });
    }

    function sortDoctors(doctors, sortBy) {
        if (sortBy === 'fees') {
            return [...doctors].sort((a, b) => a.fees - b.fees);
        } else if (sortBy === 'experience') {
            return [...doctors].sort((a, b) => b.experience - a.experience);
        }
        return doctors;
    }

    function applyFiltersAndSearch() {
        const searchTerm = autocompleteInput.value.trim();
        const consultationType = Array.from(consultationFilters).find(radio => radio.checked)?.value;
        const selectedSpecialties = Array.from(specialtyCheckboxes).filter(c => c.checked).map(c => c.value);
        const sortBy = Array.from(sortRadios).find(r => r.checked)?.value;

        const filters = {
            searchTerm,
            consultationType,
            specialties: selectedSpecialties
        };

        filteredDoctors = filterDoctors(allDoctors, filters);
        filteredDoctors = sortDoctors(filteredDoctors, sortBy);
        renderDoctors(filteredDoctors);
    }

    autocompleteInput.addEventListener('input', () => {
        const searchText = autocompleteInput.value.toLowerCase().trim();
        suggestionsList.innerHTML = '';
        if (searchText.length > 0) {
            const suggestions = allDoctors.filter(doc => doc.name.toLowerCase().includes(searchText)).slice(0, 5);
            suggestions.forEach(doc => {
                const li = document.createElement('li');
                li.classList.add('suggestion-item');
                li.textContent = doc.name;
                li.addEventListener('click', () => {
                    autocompleteInput.value = doc.name;
                    suggestionsList.innerHTML = '';
                    applyFiltersAndSearch();
                });
                suggestionsList.appendChild(li);
            });
        }
    });

    [...consultationFilters, ...specialtyCheckboxes, ...sortRadios].forEach(input => {
        input.addEventListener('change', applyFiltersAndSearch);
    });

    fetchDoctors();
});
