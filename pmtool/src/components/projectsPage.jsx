import { useContext } from 'react'
import { UserContext } from './userContext'

const ProjectsPage = () => {

    const { user } = useContext(UserContext);

    return(
        <div>{user}</div>
    )

}

export default ProjectsPage;