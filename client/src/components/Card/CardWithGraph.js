import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import CanvasJSReact from '@canvasjs/react-charts';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const CardWithGraph = ({ title, crowdValue, data }) => {
  const chartOptions = {
    animationEnabled: true,
    theme: "light2",
    title: {
      text: ""
    },
    height: 150,
    axisX: {
      title: "Time",
      labelFontSize: 8,
      interval: 1,
      labelFormatter: function (e) {
        return new Date(e.value).toLocaleTimeString();
      }
    },
    axisY: {
      title: "Crowd Value",
      includeZero: false
    },
    toolTip: {
      shared: true,
      contentFormatter: function (e) {
        var content = "";
        for (var i = 0; i < e.entries.length; i++) {
          content += new Date(e.entries[i].dataPoint.x).toLocaleString() + ": ";
          content += e.entries[i].dataPoint.y;
        }
        return content;
      }
    },
    data: [{
      type: "line",
      dataPoints: data.map((entry, index) => ({ x: new Date(entry.time), y: entry.number }))
    }]
  };

  return (
    <Card style={{ borderColor: '#009193', borderWidth: '1px', borderStyle: 'solid', height: 'auto' }}>
      <CardContent>
        <Typography variant='h6' component='div' style={{ fontWeight: 'bold', fontSize: '12px' }}>
          {title}
        </Typography>
        <Typography variant='body2' component='div' style={{ display: 'flex', fontSize: '12px', height: '40px', alignItems: 'center' }}>
          Crowd: <div style={{ fontWeight: 'bold', fontSize: '20px', marginLeft: "5px" }}>{crowdValue}</div>
        </Typography>
        <div style={{ height: '150px' }}>
          <CanvasJSChart options={chartOptions} />
        </div>
      </CardContent>
    </Card>
  );
};

export default CardWithGraph;
