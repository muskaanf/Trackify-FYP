import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var CanvasJS = CanvasJSReact.CanvasJS;
 
class BarChart extends Component {
	addSymbols(e){
		var suffixes = ["", "K", "M", "B"];
		var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
		if(order > suffixes.length - 1)
			order = suffixes.length - 1;
		var suffix = suffixes[order];
		return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
	}
	render() {
		const options = {
			animationEnabled: true,
			theme: "light2",
			title:{
				text: "Weekly crowd peaks"
			},
			axisX: {
				// title: "Social Network",
				reversed: true,
			},
            width: 180, // Set width here
			height: 200, // Set height here
			axisY: {
				title: "People Count",
				labelFormatter: this.addSymbols
			},
			data: [{
				type: "bar",
				dataPoints: [
					{ y:  220000, label: "Mon", color: "#009193" },
					{ y:  180000, label: "Tue", color: "#007779" },
					{ y:  80000, label: "Wed", color: "#005e61" },
					{ y:  56300, label: "Thu", color: "#004649" },
					{ y:  37600, label: "Fri", color: "#002e32" },
					{ y:  33600, label: "Sat", color: "#00191d" },
					{ y:  33000, label: "Sun", color: "#000002" }
				]
			}]
		}
		
		return (
		<div>
			{/* <h1>React Bar Chart</h1> */}
			<CanvasJSChart options = {options} 
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}

export default BarChart;