import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import {
  faDisplay,
  faFileSignature,
  faFileCode,
  faFolder,
} from "@fortawesome/free-solid-svg-icons";
import { Card, Container } from "react-bootstrap";
import DropFilterCard from "../DropFilterCard/";

export default function CardFilterTask(props) {
  const [sites, setSites] = useState([]);
  const [alteration, setAlteration] = useState([]);
  const [filterTask, setFilterTask] = useState([]);

  useEffect(() => {
    countTypeTask(props.tasks, 2, props.typeTask);
    setFilterTask("Hoje");
  }, []);

  function countTypeTask(data, intervalDate, type) {
    try {
      // Count total of interation
      let count = 1;
      // Map data tasks
      data.map((data) => {
        // tasks date closed timestamp
        let dateCloseTask = new Date(data.close_date).getTime();
        let dateFilter = timeTask(intervalDate).getTime();
        // if tasks date close is biggest that date of filter then count +1
        if (dateCloseTask > dateFilter) {
          // paramers alteration
          if (getTypeTask(data.type_name, type) === 1) {
            setAlteration(count++);
          }
          // paramers sites
          if (getTypeTask(data.type_name, type) === 2) {
            setSites(count++);
          }
        }
        return count;
      });
    } catch (err) {
      console.log(err);
    }
  }

  function timeTask(intervalDate) {
    try {
      let today = new Date();
      today.setDate(today.getDate() - intervalDate);
      return today;
    } catch (err) {
      console.log(err);
    }
  }

  function getTypeTask(data, type) {
    try {
      if (type === "1") {
        const regex = /(.Alt*)/;
        let result = regex.test(data);
        if (result) return 1;
      }
      if (type === "2") {
        const regex = /(.Sit*)/;
        let result = regex.test(data);
        if (result) return 2;
      }
    } catch (err) {
      console.log(err);
    }
  }

  const Title = styled.h5`
  font-weight: bold;
  font-size: inherit;
  color: ${({ theme }) => {
    return theme.colors.thirdColor;
  }};
  span {
    color: ${({ theme }) => {
      return theme.colors.fifthColor;
    }};
    font-size: 14px;
    font-weight: bold;
  }
`;

const Amount = styled.h6`
  font-size: 30px;
  margin-bottom: 2px;
`;
const CardGroup = styled.div`
  border: 1px solid #cecece;
  border-radius: 5px;
  box-shadow: ${({ theme }) => {
    return theme.colors.shadown;
  }};
  text-align: center;
  box-sizing: border-box;
  padding-left: 5px;
  padding-right: 5px;
  padding-bottom: 10px;
  padding-top: 5px;
  width: 25%;
  heigth: 300px;
`;

const CardMiddle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  svg {
    margin-left: 10px;
    height: 40px;
    color: ${({ theme }) => {
      return theme.colors.thirdColor;
    }};
    padding: 1px;
    box-sizing: border-box;
  }
`;

const CardHeader = styled.div`
  display: grid;
  grid-template-columns: 5fr 1fr;
  height: 36px;
  padding: 2px;
  div {
    padding: 2px;
  }
  button {
    background-color: transparent !important;
    border: none;
    padding: 0;
  }
  svg {
    color: ${({ theme }) => {
      return theme.colors.firstColor;
    }};
    background-color: ${({ theme }) => {
      return theme.colors.sixtyColor;
    }};
    font-size: 20px;
    padding: 2px;
    border-radius: 5px;
    box-shadow: ${({ theme }) => {
      return theme.colors.shadown;
    }};
  }
`;
 

  return (
    
    <CardGroup>
      <CardHeader>
        <Title>
          {props.title} <span>| {filterTask}</span>
        </Title>

        {props.filterCard && (
          <DropFilterCard
            amountDay={() => {
              countTypeTask(props.tasks, 1, props.typeTask);
              setFilterTask("Hoje");
            }}
            amountWeek={() => {
              countTypeTask(props.tasks, 7, props.typeTask);
              setFilterTask("Semana");
            }}
            amountMonth={() => {
              countTypeTask(props.tasks, 30, props.typeTask);
              setFilterTask("Mês");
            }}
          />
        )}
      </CardHeader>
      <CardMiddle>
        {props.typeTask === "1" && <FontAwesomeIcon icon={faFileSignature} />}
        {props.typeTask === "2" && <FontAwesomeIcon icon={faDisplay} />}
        {props.typeTask === "3" && <FontAwesomeIcon icon={faFileCode} />}
        {props.typeTask === "4" && <FontAwesomeIcon icon={faFolder} />}
        <Container>
          {props.typeTask === "1" && <Amount>{alteration}</Amount>}
          {props.typeTask === "2" && <Amount>{sites}</Amount>}
          {props.typeTask === "3" && <Amount>{props.tasks.length}</Amount>}
          {props.typeTask === "4" && <Amount>{props.tasks.length}</Amount>}
        </Container>
      </CardMiddle>
    </CardGroup>
  );
}
