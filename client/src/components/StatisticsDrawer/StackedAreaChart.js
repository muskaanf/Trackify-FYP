import React from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const StackedAreaChart = ({ data }) => {
    const dataSeries = data.map((item) => ({
        type: "stackedArea",
        name: item.name,
        showInLegend: true,
        xValueFormatString: "YYYY",
        dataPoints: item.data.map(entry => ({
            x: new Date(entry.time),
            y: entry.number
        }))
    }));

    const options = {
        theme: "light2",
        animationEnabled: true,
        title: {
            text: "Across Different zones"
        },
        height: 200,
        axisY: {
            title: "Crowd peaks"
        },
        axisX: {
            title: "Time",
            labelFontSize: 10,
            labelFormatter: function (e) {
                return new Date(e.value).toLocaleTimeString();
            }
        },
        toolTip: {
            shared: true,
            contentFormatter: function (e) {
                var content = " ";
				content += new Date(e.entries[0].dataPoint.x).toLocaleString() + "<br/>";
                for (var i = 0; i < e.entries.length; i++) {
                    
                    content += e.entries[i].dataSeries.name + ": " + e.entries[i].dataPoint.y + "<br/>";
                }
                return content;
            }
        },
        legend: {
            verticalAlign: "center",
            horizontalAlign: "right",
            reversed: true,
            cursor: "pointer",
        },
        data: dataSeries
    };

    return (
        <div>
            <CanvasJSChart options={options} />
        </div>
    );
}

export default StackedAreaChart;
