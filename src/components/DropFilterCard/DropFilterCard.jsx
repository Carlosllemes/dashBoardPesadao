import { Component } from "react";
import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";

class DropFilterCard extends Component{
  constructor(props) {
    super(props);
  }
    render(){
        return(
            <Dropdown>
            <Dropdown.Toggle id="dropdown-basic">
              <FontAwesomeIcon icon={faEllipsis} />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={this.props.amountDay}>Hoje</Dropdown.Item>
              <Dropdown.Item onClick={this.props.amountWeek} >Semana</Dropdown.Item>
              <Dropdown.Item onClick={this.props.amounMounth} >Mês</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )
    }
}

export default DropFilterCard;