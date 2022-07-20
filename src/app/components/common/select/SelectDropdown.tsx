const SelectDropdown = ({ handleSelectChange, defaultValue, title, options }) => {
  return (
    <label className="tw-text-sm tw-flex tw-flex-col tw-text-left">
      {title}
      <select defaultValue={defaultValue} onChange={handleSelectChange}>
        {options.map((option) => {
          return (
            <option key={option.value} value={option.value}>{option.label}</option>
          )
        })}
      </select>
    </label>
  )
}

export default SelectDropdown;