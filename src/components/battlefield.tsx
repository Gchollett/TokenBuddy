'use client'

import battlefield from "@/utilities/types"

type Props = {
    battlefield : battlefield
}

export default function Battlefield(props:Props){
      const imageClass = "w-1/6 h-fit p-5"
    return(
        <>
            {props.battlefield.map((card,i) => (
                <img key={i} id={card.name} onClick={()=> {
                    const image = document.getElementById(card.name)
                    if(image?.getAttribute("class") === `${imageClass} rotate-90`){
                        image?.setAttribute("class",`${imageClass} rotate-0`)
                    }else{
                        image?.setAttribute("class",`${imageClass} rotate-90`)
                    }
            }} className={`${imageClass} rotate-0`} src={card.image}></img>
        ))}
        </>
    )
}