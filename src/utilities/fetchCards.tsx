import useClient from "@/hooks/use-client"
import { card } from "./types";
/**
 * @param page - Scryfall api string
 * @returns - list of all cards in the database with the given page parameters
 */
const fetchData = async (page : string) => {
    const client = useClient();
    var cards : card[] = [];
    await client.get(page).then(async res => {
        // console.log(res.data.data)
        cards = res.data.data.map((card : any)=>{
          if(card.card_faces){
            const front = card.card_faces[0]
            const back = card.card_faces[1]
            return {
              name: card.name,
              multiFaced: true,
              id: card.id,
              faces: [
                    {
                      name: front.name,
                      power: front.power,
                      toughness: front.toughness,
                      image: front.image_uris?.border_crop
                    },
                    {
                      name: back.name,
                      power: back.power,
                      toughness: back.toughness,
                      image: back.image_uris?.border_crop
                    }
                ]
              }   
            }
            return {
                id: card.id,
                name: card.name,
                multiFaced: false,
                power: card.power,
                toughness: card.toughness,
                image: card.image_uris?.border_crop
            }
        })
        //@ts-ignore
        if(res.has_more){
            //@ts-ignore
            return cards.concat(fetchData(res.next_page));
        }
    })
    .catch(()=> console.log("Network Error"))
    return cards
}

export default fetchData