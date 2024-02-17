import './index.css'

const ProjectsListItem = props => {
  const {projectDetails} = props
  const {name, imageUrl} = projectDetails

  return (
    <li className="project-list-item">
      <img src={imageUrl} alt={name} className="project-thumbnail" />
      <p className="project-name">{name}</p>
    </li>
  )
}

export default ProjectsListItem
