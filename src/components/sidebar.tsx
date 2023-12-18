import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft'
import CastleIcon from '@mui/icons-material/Castle';
import CastleOutlinedIcon from '@mui/icons-material/CastleOutlined';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import MeetingRoomoutlinedIcon from '@mui/icons-material/MeetingRoomOutlined';
import { useState } from 'react'

export default function SideBar(){
    const [monarch,setMonarch] = useState(false)
    const [initiative,setInitiative] = useState(false)
    return(
        <div id="sidebar" className='absolute flex right-0 h-full rounded-l-md bg-neutral-900 side-bar closed'>
            <button 
                className='self-center relative right-8 bg-neutral-900 rounded-l-md'
                onClick={()=>console.log(document.getElementById("sidebar")?.classList.toggle("closed"))}
            >
                <KeyboardDoubleArrowLeftIcon className='hover:text-green-300'/>
            </button>
            <div className="relative left-11 flex top-0 h-fit w-fit cursor-pointer" onClick={()=>{setMonarch(!monarch)}}>
                {monarch?<CastleIcon/>:<CastleOutlinedIcon/>}
                <p>&#160;Monarch</p>
            </div>
            <div className="relative right-10 flex top-10 h-fit w-fit cursor-pointer" onClick={()=>{setInitiative(!initiative)}}>
                {initiative?<MeetingRoomIcon/>:<MeetingRoomoutlinedIcon/>}
                <p>Initiative</p>
            </div>
        </div>
    )
}