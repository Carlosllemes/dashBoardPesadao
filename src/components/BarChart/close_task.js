import React from "react";
import { Container } from "react-bootstrap";
import Chart from "react-google-charts";

export default function BarChart(props) {

  var options = {
    legend: { position: "bottom" },
    title: "Tarefas fechadas dia",
    fontSize: "18px",
  };

  return (
    <Container>
      <Chart
        chartType={props.chartType}
        data={props.teste}
        options={options}
      />
    </Container>
  );
}
