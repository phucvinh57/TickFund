import { useState } from "react";
import { PlusLg } from "react-bootstrap-icons";
import "../scss/fab.scss";

const Fab = ({ actions }) => {
  const [open, setOpen] = useState(false);

  const mouseEnter = () => setOpen(true);

  const mouseLeave = () => setOpen(false);

  return (
      <ul
      className="fab-container"
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
      >
      <li className="fab-button">
          <PlusLg size={25}/>
      </li>
      {actions.map((action, index) => (
          <li
          style={{ transitionDelay: `${index * 25}ms`,backgroundColor: `${action.color}` }}
          className={`fab-action ${open && 'open'}`}
          key={action.label}
          onClick={action.onClick}
          >
          {action.icon}
          <span className="tooltip">{action.label}</span>
          </li>
      ))}
      </ul>
  );
};

export default Fab