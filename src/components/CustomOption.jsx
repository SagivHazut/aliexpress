import React from 'react'
import Select from 'react-select'
import USA from '../image/united-states-flag-icon.png'
import Israel from '../image/israel-flag-icon.png'

const countryOptions = [
  { value: 'USA', label: 'English', icon: USA },
  { value: 'IL', label: 'Hebrew', icon: Israel },
]

const customStyles = {
  control: (provided) => ({
    ...provided,
    width: 120,
  }),
  option: (provided, state) => ({
    ...provided,
    display: 'flex',
    alignItems: 'center',
    height: 30,
    fontSize: 12,
  }),
  singleValue: (provided, state) => ({
    ...provided,
    display: 'flex',
    alignItems: 'center',
    height: 30,
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    padding: 4,
  }),
  indicatorSeparator: () => ({}),
  menu: (provided) => ({
    ...provided,
    display: 'flex',
    justifyContent: 'center',
    height: 70,
  }),
  menuList: (provided) => ({
    ...provided,
    paddingTop: 0,
  }),
}

const LanguageDropdown = ({ country, setCountry }) => {
  const handleChange = (selectedOption) => {
    setCountry(selectedOption.value)
  }

  return (
    <Select
      options={countryOptions}
      value={countryOptions.find((option) => option.value === country)}
      onChange={handleChange}
      styles={customStyles}
      components={{ Option: CustomOption }}
    />
  )
}

const CustomOption = ({ innerProps, label, data }) => (
  <div {...innerProps}>
    {data && (
      <div>
        <img
          src={data.icon}
          alt={label}
          style={{
            width: 40,
            height: 30,
            marginTop: 3,
          }}
        />
      </div>
    )}
  </div>
)

export default LanguageDropdown
