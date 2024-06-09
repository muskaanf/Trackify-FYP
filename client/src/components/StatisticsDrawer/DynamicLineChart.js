// import React, { useEffect, useRef } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import { useEffect, useRef } from 'react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const DynamicLineChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.render();
    }
  }, [data]);

  const dataPoints = data.map(item => ({
    x: new Date(item.time),
    y: item.value,
  }));

  const options = {
    title: {
      text: "Average Crowd Density"
    },
    axisX: {
      title: "Time",
      valueFormatString: "HH:mm:ss",
      labelAngle: -50
    },
    axisY: {
      title: "Crowd Density"
    },
    width: 400, 
    height: 200, 
    data: [{
      type: "area",
      color: "#009193",
      fillOpacity: 0.3,
      dataPoints: dataPoints
    }]
  };

  return (
    <div>
      <CanvasJSChart options={options} onRef={ref => chartRef.current = ref} />
    </div>
  );
}

export default DynamicLineChart;
