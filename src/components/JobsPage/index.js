import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import {BsSearch} from 'react-icons/bs'

import Header from '../Header'
import FiltersGroup from '../FiltersGroup'
import JobCard from '../JobCard'

import './index.css'

// These are the lists used in the application. You can move them to any component needed.
const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const locationsList = [
  {locationName: 'Hyderabad', locationId: 'HYB'},
  {locationName: 'Bangalore', locationId: 'BNG'},
  {locationName: 'Chennai', locationId: 'CHNI'},
  {locationName: 'Delhi', locationId: 'DEH'},
  {locationName: 'Mumbai', locationId: 'MI'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobsPage extends Component {
  state = {
    jobListData: {},
    apiStatus: apiStatusConstants.initial,
    searchInput: '',
    employmentType: [],
    salaryRange: '',
    locations: [],
  }

  componentDidMount() {
    this.getJobList()
  }

  getJobList = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {employmentType, salaryRange, searchInput} = this.state
    const jobsApiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentType.join()}&minimum_package=${salaryRange}&search=${searchInput}`
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(jobsApiUrl, options)
    const data = await response.json()
    // console.log(data)
    // console.log(response)
    if (response.ok === true) {
      const updatedJobsJistData = data.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))

      this.setState({
        jobListData: updatedJobsJistData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="jobs-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onClickRetry = () => {
    // console.log("Retry Btn Clicked")
    this.getJobList()
  }

  renderFailureView = () => (
    <div className="jobs-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="jobs-failure-img"
      />
      <h1 className="jobs-failure-heading-text">Oops! Something Went Wrong</h1>
      <p className="jobs-failure-description">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="jobs-failure-button"
        data-testid="button"
        onClick={this.onClickRetry}
      >
        Retry
      </button>
    </div>
  )

  renderJobsList = () => {
    const {jobListData, locations} = this.state
    // const {apiStatus, jobsList, loactions} = this.state
    // console.log(loactions)
    const filtredJobList = jobListData.filter(each => {
      if (locations.length === 0) {
        return each
      }
      if (locations.includes(each.location)) {
        return each
      }
      return null
    })
    // console.log(filtredJobList)
    return (
      /** Using Shorthand or fragment syntax --- (<>...</>) */
      <>
        {filtredJobList.length > 0 ? (
          <div className="jobs-list-container">
            <ul className="jobs-list">
              {filtredJobList.map(eachJob => (
                <JobCard jobData={eachJob} key={eachJob.id} />
              ))}
            </ul>
          </div>
        ) : (
          <div className="no-jobs-view">
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
              className="no-jobs-img"
              alt="no jobs"
            />
            <h1 className="no-jobs-heading">No Jobs Found</h1>
            <p className="no-jobs-description">
              We could not find any jobs. Try other filters.
            </p>
          </div>
        )}
      </>
    )
  }

  renderJobsListStatus = () => {
    const {apiStatus} = this.state
    /** Using Switch Case */
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderJobsList()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  changeLocationType = location => {
    // console.log(locationId)
    const {locations} = this.state
    let updatedLocations = locations
    if (locations.includes(location)) {
      updatedLocations = locations.filter(
        eachLocation => eachLocation !== location,
      )
    } else {
      updatedLocations = [...updatedLocations, location]
    }
    this.setState({locations: updatedLocations})
  }

  updateSalaryRangeId = salaryRange => {
    // console.log(salaryRange)
    this.setState({salaryRange}, this.getJobList)
  }

  changeEmployeeList = typeId => {
    // console.log(typeId)
    const {employmentType} = this.state
    let updatedList = employmentType
    if (employmentType.includes(typeId)) {
      updatedList = employmentType.filter(eachType => eachType !== typeId)
    } else {
      updatedList = [...updatedList, typeId]
    }

    this.setState({employmentType: updatedList}, this.getJobList)
  }

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.getJobList()
    }
  }

  changeSearchInput = event => {
    // console.log(event.target.value)
    this.setState({searchInput: event.target.value})
  }

  render() {
    const {searchInput, salaryRange} = this.state
    return (
      /** Using Shorthand or fragment syntax --- (<>...</>) */
      <>
        <Header />
        <div className="jobs-page-container">
          <div className="jobs-page-content">
            <FiltersGroup
              employmentTypesList={employmentTypesList}
              salaryRangesList={salaryRangesList}
              searchInput={searchInput}
              changeSearchInput={this.changeSearchInput}
              getJobList={this.getJobList}
              changeEmployeeList={this.changeEmployeeList}
              salaryRange={salaryRange}
              updateSalaryRangeId={this.updateSalaryRangeId}
              locationsList={locationsList}
              changeLocationType={this.changeLocationType}
            />
            <div className="search-input-jobs-list-container">
              <div className="search-input-desktop-container">
                <input
                  type="search"
                  className="search-input"
                  placeholder="Search"
                  value={searchInput}
                  onChange={this.changeSearchInput}
                  onKeyDown={this.onEnterSearchInput}
                />
                <button
                  label="text"
                  type="button"
                  className="search-button"
                  data-testid="searchButton"
                  onClick={this.getJobList}
                >
                  <BsSearch className="search-icon" />
                </button>
              </div>
              {this.renderJobsListStatus()}
            </div>
          </div>
        </div>
      </>
    )
  }
}
export default JobsPage
