import { useRef } from "react"
import Button from "@mui/material/Button";

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
                <Button variant="contained" size="medium" color="primary" type='submit' onClick={(e)=>inputRef.current.focus()}>Add item</Button>
                </label>
            </form>
        </div>
    )
}