import { useRef } from "react";
import { useEffect, useState } from "react";
import { PlusLg } from "react-bootstrap-icons";

const Fab = ({ actions }) => {
  const ref = useRef()
  const [open, setOpen] = useState(false);
  
  useEffect(() => {
    const checkIfClickedOutside = e => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (open && ref.current && !ref.current.contains(e.target)) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", checkIfClickedOutside)

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
  }, [open])


  const mouseEnter = () => setOpen(!open);

  return (
    <ul
      className="fab-container"
      onClick={mouseEnter}
      ref={ref}
    >
      <li className="fab-button">
        <PlusLg size={25} />
      </li>
      {actions.map((action, index) => (
        <li
          style={{ transitionDelay: `${index * 25}ms`, backgroundColor: `${action.color}` }}
          className={`fab-action ${open && ' open'} text-white`}
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