import {BsSearch} from 'react-icons/bs'

import ProfileDetails from '../ProfileDetails'
import './index.css'

const FiltersGroup = props => {
  const renderSalaryRangesList = () => {
    // console.log(props)
    const {salaryRangesList, updateSalaryRangeId, salaryRange} = props
    return salaryRangesList.map(eachRange => {
      const onChangeRange = () => updateSalaryRangeId(eachRange.salaryRangeId)

      const isChecked = eachRange.salaryRangeId === salaryRange

      return (
        <li className="salary-item" key={eachRange.salaryRangeId}>
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
    <div className="salary-range-container">
      <h1 className="salary-range-heading">Salary Range</h1>
      <ul className="filters-list">{renderSalaryRangesList()}</ul>
    </div>
  )

  const renderEmploymentTypesList = () => {
    // console.log(props)
    const {employmentTypesList, changeEmployeeList} = props
    return employmentTypesList.map(eachType => {
      const onSelectEmployeeType = () =>
        changeEmployeeList(eachType.employmentTypeId)

      return (
        <li className="employee-item" key={eachType.employmentTypeId}>
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
    <div className="employment-type-container">
      <h1 className="employment-type-heading">Type of Employment</h1>
      <ul className="filters-list">{renderEmploymentTypesList()}</ul>
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
    </div>
  )
}
export default FiltersGroup
