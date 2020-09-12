import React from 'react';
import { Line } from 'react-chartjs-2';
import StyledElementContainer from '../../../shared/StyledElementContainer/StyledElementContainer';

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      pointBackgroundColor: 'transparent',
      pointBorderColor: 'transparent',
      lineTension: 0.4,
      showLine: true,
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};

const Chart: React.FC = () => {
  return (
    <StyledElementContainer className="chart">
      <Line
        data={data}
        options={{
          maintainAspectRatio: false,
          scales: { xAxes: [{ gridLines: { color: 'transparent' } }], yAxes: [{ gridLines: { color: 'transparent' } }] }
        }}
        legend={{ display: false }}
      />
    </StyledElementContainer>
  );
};

export default Chart;

// options: {
//     scales: {
//         xAxes: [{
//             ticks: {
//                 display: false
//             }
//         }]
//     }
// }
