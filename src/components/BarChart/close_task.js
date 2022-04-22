import React from "react";
import {Col } from "react-bootstrap";
import Chart from "react-google-charts";

export default function BarChart(props) {
  var options = {
    legend: { position: "bottom" },
    title: "Tarefas fechadas dia",
    colors: ["#fff"],
    pointsVisible: true,
    pointSize: 6,
    pointColor: "red",
    curveType: "function",
    focusTarget: "category",
    backgroundColor: "#e9ecef",
    legend: {
      position: "none",
    },
    titleTextStyle: {
      color: "#2c5d8c",
      fontSize: 20,
      bold: true,
      italic: false,
      textPosition: "center",
    },
    chartArea: {
      backgroundColor: "#2c5d8c",
    },
    hAxis: {
      direction: -1,
      textStyle: {
        color: "#000",
        fontSize: 11,
      },
    },
    vAxis: {
      format: "",
    },
  };

  return (
    
      <Col>
        <Chart
          chartType={props.chartType}
          data={props.groupBy}
          options={options}
          width={"100%"}
        />
      </Col>
    
  );
}
