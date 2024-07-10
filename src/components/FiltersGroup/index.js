import {BsSearch} from 'react-icons/bs'

import ProfileDetails from '../ProfileDetails'
import './index.css'

const FiltersGroup = props => {
  const renderLocationsList = () => {
    // console.log(props)
    const {locationsList, changeLocationType} = props
    return locationsList.map(eachType => {
      const onSelectLocationType = () => {
        changeLocationType(eachType.locationName)
      }
      return (
        <li className="filter-item" key={eachType.locationId}>
          <input
            type="checkbox"
            className="check-input"
            id={eachType.locationId}
            onChange={onSelectLocationType}
          />
          <label htmlFor={eachType.locationId} className="check-label">
            {eachType.locationName}
          </label>
        </li>
      )
    })
  }

  const renderLocations = () => (
    <div className="filters-container">
      <h1 className="filters-heading">Locations</h1>
      <ul className="filters-list-container">{renderLocationsList()}</ul>
    </div>
  )

  const renderSalaryRangesList = () => {
    // console.log(props)
    const {salaryRangesList, updateSalaryRangeId, salaryRange} = props
    return salaryRangesList.map(eachRange => {
      const onChangeRange = () => updateSalaryRangeId(eachRange.salaryRangeId)

      const isChecked = eachRange.salaryRangeId === salaryRange

      return (
        <li className="filter-item" key={eachRange.salaryRangeId}>
          <input
            type="radio"
            className="checkbox-input"
            id={eachRange.salaryRangeId}
            name="salary ranges"
            onChange={onChangeRange}
            checked={isChecked}
          />
          <label htmlFor={eachRange.salaryRangeId} className="check-label">
            {eachRange.label}
          </label>
        </li>
      )
    })
  }

  const renderSalaryRange = () => (
    <div className="filters-container">
      <h1 className="filters-heading">Salary Range</h1>
      <ul className="filters-list-container">{renderSalaryRangesList()}</ul>
    </div>
  )

  const renderEmploymentTypesList = () => {
    // console.log(props)
    const {employmentTypesList, changeEmployeeList} = props
    return employmentTypesList.map(eachType => {
      const onSelectEmployeeType = () =>
        changeEmployeeList(eachType.employmentTypeId)

      return (
        <li className="filter-item" key={eachType.employmentTypeId}>
          <input
            type="checkbox"
            className="check-input"
            id={eachType.employmentTypeId}
            onChange={onSelectEmployeeType}
          />
          <label htmlFor={eachType.employmentTypeId} className="check-label">
            {eachType.label}
          </label>
        </li>
      )
    })
  }

  const renderEmploymentTypes = () => (
    <div className="filters-container">
      <h1 className="filters-heading">Type of Employment</h1>
      <ul className="filters-list-container">{renderEmploymentTypesList()}</ul>
    </div>
  )

  const onChangeSearchInput = event => {
    // console.log(props)
    const {changeSearchInput} = props
    changeSearchInput(event)
  }

  const onEnterSearchInput = event => {
    // console.log(props)
    const {getJobList} = props
    if (event.key === 'Enter') {
      getJobList()
    }
  }

  const renderSearchInput = () => {
    // console.log(props)
    const {searchInput, getJobList} = props
    return (
      <div className="search-input-container">
        <input
          type="search"
          className="search-input"
          placeholder="Search"
          value={searchInput}
          onChange={onChangeSearchInput}
          onKeyDown={onEnterSearchInput}
        />
        <button
          label="text"
          type="button"
          id="searchButton"
          className="search-button-container"
          onClick={getJobList}
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }
  return (
    <div className="filters-group-container">
      {renderSearchInput()}
      <ProfileDetails />
      <hr className="separator" />
      {renderEmploymentTypes()}
      <hr className="separator" />
      {renderSalaryRange()}
      <hr className="separator" />
      {renderLocations()}
    </div>
  )
}
export default FiltersGroup
