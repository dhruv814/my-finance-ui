// src/components/FilterableDropdown.js
import React, { useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';

const FilterableDropdown = ({ options, placeholder, selectedValue,
    onValueChange, onOptionsChange, error, helpertext }) => {

    const handleChange = (selectedOption) => {
        onValueChange(selectedOption);
    };

    const handleCreate = (inputValue) => {
        const newOption = { value: inputValue.toLowerCase(), label: inputValue };
        onOptionsChange([...options, newOption]);
        onValueChange(newOption);
    };

    useEffect(() => {
        if (!!selectedValue && !options.some(option => option.value === selectedValue.value)) {
            console.log(selectedValue);
            onOptionsChange([...options, selectedValue]);
        }
    }, [selectedValue, options, onOptionsChange]);

    return (
        <>
            <CreatableSelect
                options={options}
                value={selectedValue}
                onChange={handleChange}
                onCreateOption={handleCreate}
                isClearable
                placeholder={placeholder}
            />
            <div className="helper-text">{helpertext}</div>
            {error && <div className="error-text">{error}</div>}
        </>
    );
};

export default FilterableDropdown;
