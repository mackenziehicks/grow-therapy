import React, { useEffect } from 'react';

const SelectDropdown = ({ handleCountChange, defaultValue }) => {
  const values = [25, 50, 75, 100, 200];
  return (
    <select defaultValue={defaultValue} onChange={handleCountChange}>
      {values.map((value) => {
        return (
          <option key={value} value={value}>{value}</option>
        )
      })}
    </select>
  )
}

export default SelectDropdown;