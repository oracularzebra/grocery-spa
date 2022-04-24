export default function List({list, handleCheckButton, handleDeleteButton}){

    return (
        <div className="list">
            {list.map((item,index)=>{
                return (
                    <nav key={item.id} style={
                        item.checked ? {
                        border:'4px dashed green'
                    }:{
                        border:'4px solid grey',
                        borderRadius:'5px'
                    }}
                    >
                        <input type="checkbox" 
                        checked={item.checked}
                        onChange={()=>handleCheckButton(item.id)}
                        />
                        {item.value.length>0?item.value:'Empty List'}
                        <button
                        onClick={()=>handleDeleteButton(item.id)}>Delete</button>
                    </nav>
                )
            })}
        </div>
    )

}