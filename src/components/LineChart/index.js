import React from "react";
import Chart from "react-google-charts";

export default function LineChart(props) {

  const LineColor = props.LineColor?props.LineColor:"#fff"
  const titleColor = props.TitleColor?props.TitleColor:"#2c5d8c"
  const fontSize = props.FontSize?props.FontSize:20
  const chartColor = props.ChartColor?props.ChartColor:"#2c5d8c"

  var options = {
    pointsVisible: true,
    title: props.titleChart,
    colors: [LineColor, "#fff"],
    pointSize: 6,
    curveType: "function",
    focusTarget: "category",
    backgroundColor: {
      stroke: "#cece",
      strokeWidth: 1,
      rx: 9,
    },
    legend: {
      position: "none",
    },
    titleTextStyle: {
      color: titleColor,
      fontSize: fontSize,
    },
    chartArea: {
      backgroundColor: chartColor,
      width: "90%",
    },
    hAxis: {
      direction: props.hAxisDirection,
      textStyle: {
        color: "#000",
        fontSize: 11,
      },
    },
    vAxis: {
      format: "",
    },
  };

  return <Chart chartType="LineChart" data={props.groupBy} options={options} />;
}
