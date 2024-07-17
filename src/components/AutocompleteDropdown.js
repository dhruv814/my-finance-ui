import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/lab/Autocomplete';

const AutocompleteDropdown = ({
  options,
  selectedValue,
  setSelectedValue,
  onOptionsChange,
  placeholder,
  error,
  helpertext
}) => {

  const [inputValue, setInputValue] = useState(selectedValue ? selectedValue.label : null);

  const handleBlur = () => {
    if (!!inputValue) {
      const newOption = { label: inputValue, value: inputValue.toLowerCase() };

      if (inputValue && !options.some(option => option.label === inputValue)) {
        setSelectedValue(newOption);
        onOptionsChange([...options, newOption]);
      } else {
        const existingOption = options.find(option => option.label === inputValue);
        setSelectedValue(existingOption || null);
      }
    }
  };

  return (
    <Autocomplete
      value={selectedValue}
      onChange={(event, newValue) => {
        setSelectedValue(newValue);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      onBlur={handleBlur}
      options={options}
      getOptionLabel={(option) => option.label}
      renderInput={(params) => (
        <TextField
          {...params}
          error={error}
          helperText={helpertext}
          placeholder={placeholder}
        />
      )}
    />
  );
};

export default AutocompleteDropdown;
