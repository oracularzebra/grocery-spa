export default function List({list, handleCheckButton, handleDeleteButton}){

    return (
        <div className="list">
            {list.map((item,index)=>{
                return (
                    <div key={item.id}>
                        <input type="checkbox" 
                        checked={item.checked}
                        onChange={()=>handleCheckButton(item.id)}
                        />
                        {item.value.length>0?item.value:'Empty List'}
                        <button
                        onClick={()=>handleDeleteButton(item.id)}>Delete</button>
                    </div>
                )
            })}
        </div>
    )

}