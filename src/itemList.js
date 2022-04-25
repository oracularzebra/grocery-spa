import Checkbox from '@mui/material/Checkbox';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export default function List({list, handleCheckButton, handleDeleteButton}){

    return (
        <div className="list">
            {list.map((item,index)=>{
                return (
                    <nav key={item.id} style={
                        item.checked ? {
                        border:'4px dashed lightGreen'
                    }:{
                        border:'4px solid grey',
                        borderRadius:'5px'
                    }}
                    >
                        <Checkbox size='medium' value={item.checked} onChange={()=>handleCheckButton(item.id)}/>
                        {item.value.length>0?item.value:'Empty List'}
                        <button
                        onClick={()=>handleDeleteButton(item.id)}>
                        <DeleteForeverIcon fontSize='medium'/>
                        </button>
                    </nav>
                )
            })}
        </div>
    )

}