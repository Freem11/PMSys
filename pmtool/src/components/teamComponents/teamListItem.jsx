import PositionedMenu from '../popUp'
import { useState } from 'react'

const TeamListItem = (props) => {

    const { name } = props

    console.log("made it", name)

    const [modal, setModal] = useState(false)

    const toggleModal = () => {
        setModal(!modal);
    }

    return (
        <li>
            <div>{name}</div> 
            <div>
                <PositionedMenu
                // project={props}
                toggleModalOpen={modal} 
                toggleModalClose={toggleModal}
                />
            </div>
        </li>
    )
} 

export default TeamListItem;