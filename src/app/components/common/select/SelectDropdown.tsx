const SelectDropdown = ({ handleSelectChange, defaultValue, title, options }) => {
  return (
    <label className="tw-text-sm tw-flex tw-flex-col">
      {title}
      <select defaultValue={defaultValue} onChange={handleSelectChange}>
        {options.map((value) => {
          return (
            <option key={value} value={value}>{value}</option>
          )
        })}
      </select>
    </label>
  )
}

export default SelectDropdown;