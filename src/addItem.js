import { useRef } from "react"
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function AddItem({newItem, handleClick, handleChange}){

    const inputRef = useRef();

    return (
        <div className="addItem">
            <form className="addForm" onSubmit={handleClick}>
                <label htmlFor="">
                    <TextField type="text"
                    label='Enter task'
                    required
                    ref={inputRef}
                    autoFocus
                    value={newItem}
                    onChange={(e)=>handleChange(e)
                    }
                    />
                <Button variant="contained" size="medium" color="primary" type='submit' onClick={(e)=>inputRef.current.focus()}>Add item</Button>
                </label>
            </form>
        </div>
    )
}