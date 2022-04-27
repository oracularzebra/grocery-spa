import Checkbox from "@mui/material/Checkbox";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import List from '@mui/material/List'
import { TransitionGroup } from 'react-transition-group'
import { Collapse } from "@mui/material";

export default function ItemList({ list, handleCheckButton, handleDeleteButton }) {
  
  return (
    <div className="list">
      <List>
        <TransitionGroup>
          {list.map((item) => {
        return (
          <Collapse
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
          </Collapse>
        );
      })}
        </TransitionGroup>
      </List>
    </div>
  );
}
