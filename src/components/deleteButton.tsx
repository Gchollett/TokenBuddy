import { BattlefieldUpdaterContext } from '@/hooks/useBattlefield';
import DeleteIcon from '@mui/icons-material/Delete';
import { useContext } from 'react';

export default function DeleteButton(){
    const setBattlefield = useContext(BattlefieldUpdaterContext)
    return (
        <>
            <button className='absolute right-[30px] top-[30px]'
                onClick={() => setBattlefield([])}
            >
                <DeleteIcon/>
            </button>
        </>
    )
}