import React, { useState, useEffect } from 'react';

const SearchBar = ({ doctors, setSearchTerm, searchTerm, setSearchParams }) => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (searchTerm.length > 0) {
      const matches = doctors.filter(doc =>
        doc.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(matches.slice(0, 3));
    } else {
      setSuggestions([]);
    }
  }, [searchTerm, doctors]);

  const handleInput = (e) => {
    setSearchTerm(e.target.value);
    setSearchParams(prev => {
      prev.set('search', e.target.value);
      return prev;
    });
  };

  const selectSuggestion = (name) => {
    setSearchTerm(name);
    setSuggestions([]);
    setSearchParams(prev => {
      prev.set('search', name);
      return prev;
    });
  };

  return (
    <div>
      <input
        data-testid="autocomplete-input"
        type="text"
        value={searchTerm}
        onChange={handleInput}
        placeholder="Search Doctor by Name"
      />
      {suggestions.length > 0 && (
        <ul>
          {suggestions.map((doc, idx) => (
            <li
              key={idx}
              data-testid="suggestion-item"
              onClick={() => selectSuggestion(doc.name)}
            >
              {doc.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
