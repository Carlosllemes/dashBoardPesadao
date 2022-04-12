import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";

export default function DropFilterCard(props) {
  return (
    <Dropdown>
      <Dropdown.Toggle id="dropdown-basic">
        <FontAwesomeIcon icon={faEllipsis} />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={props.amountDay}>Hoje</Dropdown.Item>
        <Dropdown.Item onClick={props.amountWeek}>Semana</Dropdown.Item>
        <Dropdown.Item onClick={props.amountMonth}>Mês</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
