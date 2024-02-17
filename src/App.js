import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Header from './Components/Header'
import ProjectsListItem from './Components/ProjectsListItem'

import './App.css'

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

class App extends Component {
  state = {
    activeCategoryList: categoriesList[0].id,
    projectsList: [],
    isShowError: false,
    isLoading: false,
  }

  componentDidMount() {
    this.getProjectsList()
  }

  getProjectsList = async () => {
    this.setState({isLoading: true})
    const {activeCategoryList} = this.state
    const apiUrl = `https://apis.ccbp.in/ps/projects?category=${activeCategoryList}`
    const response = await fetch(apiUrl)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.projects.map(eachItem => ({
        id: eachItem.id,
        name: eachItem.name,
        imageUrl: eachItem.image_url,
      }))
      this.setState({
        projectsList: updatedData,
        isLoading: false,
        isShowError: true,
      })
    } else {
      this.setState({isLoading: false, isShowError: true})
    }
  }

  onChangeCategory = event => {
    this.setState(
      {activeCategoryList: event.target.value},
      this.getProjectsList,
    )
  }

  onClickRetry = () => {
    this.getProjectsList()
  }

  render() {
    const {
      activeCategoryList,
      projectsList,
      isLoading,
      isShowError,
    } = this.state
    console.log(projectsList)
    console.log(activeCategoryList)
    return (
      <>
        <Header />
        <div className="projects-select-container">
          <select
            className="select-container"
            onChange={this.onChangeCategory}
            value={activeCategoryList}
          >
            {categoriesList.map(eachItem => (
              <option
                value={eachItem.id}
                key={eachItem.id}
                className="options-container"
              >
                {eachItem.displayText}
              </option>
            ))}
          </select>
          {isLoading && (
            <div data-testid="loader" className="loader-container">
              <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
            </div>
          )}
          <ul className="projects-list-container">
            {projectsList.map(eachItem => (
              <ProjectsListItem key={eachItem.id} projectDetails={eachItem} />
            ))}
          </ul>
          {isShowError && (
            <div className="error-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
                alt="failure view"
                className="error-img"
              />
              <h1 className="error-heading">Oops! Something Went Wrong</h1>
              <p className="error-para">
                We cannot seem to find the page you are looking for
              </p>
              <button
                type="button"
                className="retry-btn"
                onClick={this.onClickRetry}
              >
                Retry
              </button>
            </div>
          )}
        </div>
      </>
    )
  }
}
export default App
