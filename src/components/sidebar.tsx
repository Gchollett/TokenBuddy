import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft'
import CastleIcon from '@mui/icons-material/Castle';
import CastleOutlinedIcon from '@mui/icons-material/CastleOutlined';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import MeetingRoomoutlinedIcon from '@mui/icons-material/MeetingRoomOutlined';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import CasinoIcon from '@mui/icons-material/Casino';
import CasinoOutlinedIcon from '@mui/icons-material/CasinoOutlined';
import { useState } from 'react'

export default function SideBar(){
    const [monarch,setMonarch] = useState(false)
    const [initiative,setInitiative] = useState(false)
    const [day,setDay] = useState(true)
    const [nightDay,setNightDay] = useState(false) //This is if night/day has been activated, should only change once
    const [dungeon,setDungeon] = useState(false)
    const [open,setOpen] = useState(false)
    return(
        <div id="sidebar" className='absolute right-0 h-full rounded-l-md bg-neutral-900 side-bar closed'>
            <button 
                className='absolute right-[250px] bg-neutral-900 rounded-l-md hover:text-green-300'
                onClick={()=>{
                    document.getElementById("sidebar")?.classList.toggle("closed")
                    setOpen(!open)
                }}
            >
                {!open?<KeyboardDoubleArrowLeftIcon/>:<KeyboardDoubleArrowRightIcon/>}
            </button>
            <div className="grid max-h-full h-fit overflow-y-scroll pt-1">
                <div className="grid h-fit pb-1 cursor-pointer" onClick={()=>{setMonarch(!monarch)}}>
                    <p className='justify-self-center pb-1'>{monarch?<CastleIcon/>:<CastleOutlinedIcon/>} Monarch</p>
                    <img className="justify-self-center rounded-md w-[75%] top-10" src={monarch?"https://cards.scryfall.io/border_crop/front/0/c/0cd9c491-6ba0-4484-822c-73bcbe9b0c49.jpg?1689612352":""}/>
                </div>
                <div className="grid h-fit w-full cursor-pointer pb-1" onClick={()=>{setInitiative(!initiative)}}>
                    <p className='justify-self-center pb-1'>{initiative?<CasinoIcon/>:<CasinoOutlinedIcon/>} Initiative</p>
                    <img className='justify-self-center rounded-md w-[75%]' src={initiative?"https://cards.scryfall.io/border_crop/front/2/c/2c65185b-6cf0-451d-985e-56aa45d9a57d.jpg?1676232820g":""}/>
                </div>
                <div className='grid w-full pb-1'>
                    <p onClick={()=>setDungeon(!dungeon)} className='cursor-pointer justify-self-center pb-1'>{dungeon?<MeetingRoomIcon/>:<MeetingRoomoutlinedIcon/>}Dungeon</p>
                    {dungeon?
                    <div className='justify-self-center grid rounded-lg border-2 w-[75%] h-[250px] hover:text-green-300 hover:border-green-300 cursor-pointer'>
                        <p className='self-center justify-self-center text-[35px]'>+</p>
                    </div>
                    :
                    <>
                    </>
                    }
                </div>
                <div className='grid w-full cursor-pointer' 
                    onClick={()=>{
                        if(nightDay) setDay(!day)
                        else setNightDay(true)
                    }}
                    onAuxClick={()=>{
                        setNightDay(false)
                    }}
                >
                    {!nightDay?<p className='justify-self-center'><WbSunnyIcon/> Day/Night <DarkModeIcon/></p>:<p className='justify-self-center'>{day?<WbSunnyIcon/>:<DarkModeIcon/>}{day?" Day":" Night"}</p>}
                    <img className="w-[75%] rounded-md justify-self-center" src={!nightDay?"":(!day?"https://cards.scryfall.io/border_crop/back/9/c/9c0f7843-4cbb-4d0f-8887-ec823a9238da.jpg?1644880530":"https://cards.scryfall.io/border_crop/front/9/c/9c0f7843-4cbb-4d0f-8887-ec823a9238da.jpg?1644880530")}></img>
                </div>
            </div>
        </div>
    )
}