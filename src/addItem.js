import { useRef } from "react"
export default function AddItem({newItem, handleClick, handleChange}){

    const inputRef = useRef();

    return (
        <div className="addItem">
            <form className="addForm" onSubmit={handleClick}>
                <label htmlFor="">
                    <input type="text"
                    ref={inputRef}
                    autoFocus
                    value={newItem}
                    placeholder='Input item'
                    onChange={(e)=>handleChange(e)
                    }
                    />
                <button type='submit' onClick={(e)=>inputRef.current.focus()}>Add item</button>
                </label>
            </form>
        </div>
    )
}