import PositionedMenuTeam from './teamPopUp'
import { useState } from 'react'
import "./teamList.scss";

const TeamListItem = (props) => {

    const { key, name } = props

    console.log("made it", name)

    const [modal, setModal] = useState(false)

    const toggleModal = () => {
        setModal(!modal);
    }

    return (
        <li id={key} className='teamL'>
            <div id='teamBox'>
            <div id='listItems'>{name}</div> 
            <div id='teamTog'>
                <PositionedMenuTeam
                user={key}
                toggleModalOpen={modal} 
                toggleModalClose={toggleModal}
                />
            </div>
            </div>
        </li>
    )
} 

export default TeamListItem;