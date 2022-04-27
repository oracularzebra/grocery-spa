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
            sx={
              item.checked
                ? {
                    border: "4px dashed lightGreen",
                  }
                : {
                    border: "4px solid grey",
                    borderRadius: "5px",
                  }
            }
            style={{
              margin:'4px',
            }}
          >
            <nav style={{
              display:'flex',
              justifyContent:'space-between',
              alignItems:'center',
              padding:'1.5vh'
            }}>
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
