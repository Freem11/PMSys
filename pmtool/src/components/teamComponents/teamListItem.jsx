import PositionedMenuTeam from './teamPopUp'
import { useState } from 'react'
import "./teamList.scss";

const TeamListItem = (props) => {

    const { id, name } = props

    const [modal, setModal] = useState(false)

    const toggleModal = () => {
        setModal(!modal);
    }

    return (
        <li id={id} className='teamL'>
            <div id='teamBox'>
            <div id='listItems'>{name}</div> 
            <div id='teamTog'>
                <PositionedMenuTeam
                user1={id}
                toggleModalOpen={modal} 
                toggleModalClose={toggleModal}
                />
            </div>
            </div>
        </li>
    )
} 

export default TeamListItem;