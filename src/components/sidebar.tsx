import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft'
import CastleIcon from '@mui/icons-material/Castle';
import CastleOutlinedIcon from '@mui/icons-material/CastleOutlined';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import MeetingRoomoutlinedIcon from '@mui/icons-material/MeetingRoomOutlined';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import CasinoIcon from '@mui/icons-material/Casino';
import CasinoOutlinedIcon from '@mui/icons-material/CasinoOutlined';
import { useEffect, useRef, useState } from 'react'
import useClient from '@/hooks/use-client';

type dungeon = {
    name: string,
    image: string,
    room: number,
}

export default function SideBar(){
    const [monarch,setMonarch] = useState(false)
    const [initiative,setInitiative] = useState(false)
    const [day,setDay] = useState(true)
    const [nightDay,setNightDay] = useState(false) //This is if night/day has been activated, should only change once
    const [dungeon,setDungeon] = useState(false)
    const [open,setOpen] = useState(false)
    const client = useClient();
    const defaulDungeons : dungeon[] = []
    const [dungeons,setDungeons] = useState(defaulDungeons)
    const [showDungeons,setShowDungeons] = useState(false)
    //@ts-ignore
    const defaultDungeon : dungeon = {name:undefined,image:undefined,room:0}
    const [enteredDungeon,setEnteredDungeon] = useState(defaultDungeon)
    const dungeonRef = useRef(null)
    const handleOutsideClick = (e : Event) => {
        // @ts-ignore
        if(dungeonRef.current && !dungeonRef.current.contains(e.target)){
            setShowDungeons(false);
        }
    }
    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);
        return (() => {
            document.removeEventListener("mousedown",handleOutsideClick)
        })
    })
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
                <div className="grid h-fit w-full cursor-pointer pb-1" 
                    onClick={()=>{
                        setInitiative(!initiative)
                        if(!initiative && enteredDungeon.name===undefined){
                            setEnteredDungeon({
                                name: "Undercity",
                                image: "https://cards.scryfall.io/border_crop/back/2/c/2c65185b-6cf0-451d-985e-56aa45d9a57d.jpg?1676232820",
                                room: 0
                            })
                            setDungeon(true)
                        }
                    }}>
                    <p className='justify-self-center pb-1'>{initiative?<CasinoIcon/>:<CasinoOutlinedIcon/>} Initiative</p>
                    <img className='justify-self-center rounded-md w-[75%]' src={initiative?"https://cards.scryfall.io/border_crop/front/2/c/2c65185b-6cf0-451d-985e-56aa45d9a57d.jpg?1676232820g":""}/>
                </div>
                <div className='grid w-full pb-1'>
                    <p onClick={()=>setDungeon(!dungeon)} onAuxClick={()=>{setEnteredDungeon(defaultDungeon);setDungeon(false)}} className='cursor-pointer justify-self-center pb-1'>{dungeon?<MeetingRoomIcon/>:<MeetingRoomoutlinedIcon/>}Dungeon {enteredDungeon.name!==undefined?"| " + enteredDungeon.room:""}</p>
                    {dungeon?
                        ((enteredDungeon.name === undefined)?
                            <div ref={dungeonRef} className={`justify-self-center grid rounded-lg border-2 w-[75%] h-[250px] ${showDungeons?"":"hover:text-green-300"} hover:border-green-300 cursor-pointer`}
                                onClick={()=>{
                                    if (dungeons.length === 0){
                                        client.get("https://api.scryfall.com/cards/search?q=t%3Adungeon")
                                            .then(response =>{
                                                if(response.status == 200){
                                                    console.log(response.data.data)
                                                    var element;
                                                    var list = [];
                                                    for(var i in response.data.data){
                                                        element = response.data.data[i]
                                                        if(element.card_faces){
                                                            element = element.card_faces[1]
                                                        }
                                                        list.push({
                                                            name: element.name,
                                                            image: element.image_uris?.border_crop,
                                                            room: 0
                                                        });
                                                    }
                                                    setDungeons(list);
                                                }
                                            })
                                    }
                                    setShowDungeons(true)
                                }}
                            >
                            {showDungeons?dungeons.map(el => <p key={el.name} className='text-center hover:text-green-300' onClick={()=>setEnteredDungeon(el)}>{el.name}</p>):<p className='self-center justify-self-center text-[35px]'>+</p>}
                            </div>:<img className="justify-self-center rounded-md w-[75%]" src={enteredDungeon.image} onClick={()=>setEnteredDungeon({...enteredDungeon,room:(enteredDungeon.room+1)})} onAuxClick={()=>setEnteredDungeon(defaultDungeon)}></img>
                        ):<></>
                    }
                </div>
                <div className='grid w-full cursor-pointer pb-10' 
                    onClick={()=>{
                        if(nightDay) setDay(!day)
                        else setNightDay(true)
                    }}
                    onAuxClick={()=>{
                        setNightDay(false)
                        setDay(true)
                    }}
                >
                    {!nightDay?<p className='justify-self-center'><WbSunnyOutlinedIcon/> Day/Night <DarkModeOutlinedIcon/></p>:<p className='justify-self-center'>{day?<WbSunnyIcon/>:<DarkModeIcon/>}{day?" Day":" Night"}</p>}
                    <img className="w-[75%] rounded-md justify-self-center" src={!nightDay?"":(!day?"https://cards.scryfall.io/border_crop/back/9/c/9c0f7843-4cbb-4d0f-8887-ec823a9238da.jpg?1644880530":"https://cards.scryfall.io/border_crop/front/9/c/9c0f7843-4cbb-4d0f-8887-ec823a9238da.jpg?1644880530")}></img>
                </div>
            </div>
        </div>
    )
}