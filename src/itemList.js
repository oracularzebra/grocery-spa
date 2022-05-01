import Checkbox from "@mui/material/Checkbox";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import FlipMove from 'react-flip-move';

export default function ItemList({ list, handleCheckButton, handleDeleteButton }) {
  
  return (
    <FlipMove className="list">
          {list.map((item) => {
        return (
          <div
            key={item.id}
            style={
              item.checked
                ? {
                    transition:'border 500ms ease-in 0ms',
                    border:'4px dashed lightgreen',
                    marginBottom:'5px',
                  }
                : {
                    border: "4px solid grey",
                    borderRadius: "5px",
                    marginBottom:'5px'
                  }
            }
          >
            <nav>
            <Checkbox
              size="medium"
              checked={item.checked}
              onChange={() => handleCheckButton(item.id)}
            />
            {item.value}
            <button onClick={() => handleDeleteButton(item.id)}>
              <DeleteForeverIcon fontSize="medium" />
            </button>
            </nav>
          </div>
        );
      })}
    </FlipMove>
  );
}
