import React from "react";
import Chart from "react-google-charts";

export default function BarChart(props) {

  const LineColor = props.LineColor?props.LineColor:"#fff"
  const titleColor = props.TitleColor?props.TitleColor:"#2c5d8c"
  const fontSize = props.FontSize?props.FontSize:20
  const chartColor = props.ChartColor?props.ChartColor:"#2c5d8c"

  var options = {
    posotiom:"bottom",
    is3D:true,
    isStacked: true,
    chart: {
      title: 'Tarefas Fechadas por tipo',
      bars: 'vertical', // Required for Material Bar Charts.
    },
    backgroundColor: {
      strokeColor: "#cece",
      strokeWidth: 1,
      rx: 9,
    },
  };

  return <Chart chartType="PieChart" data={props.groupBy} options={options} />;
}
