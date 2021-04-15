export const backgroundColors = [ // background colors used in bar graph
  'rgba(255, 99, 132, 0.2)',
  'rgba(255, 159, 64, 0.2)',
  'rgba(255, 205, 86, 0.2)',
  'rgba(75, 192, 192, 0.2)',
  'rgba(54, 162, 235, 0.2)',
  'rgba(153, 102, 200, 0.15)',
  'rgba(100, 0, 255, 0.2)',
  'rgba(150, 203, 207, 0.2)',
  'rgba(255, 0, 207, 0.15)',
];

export const borderColors = [ // border colors used in bar graph
  'rgba(255, 99, 132)',
  'rgba(255, 159, 64)',
  'rgba(255, 205, 86)',
  'rgba(75, 192, 192)',
  'rgba(54, 162, 235)',
  'rgba(153, 102, 255, 0.65)',
  'rgba(100, 100, 255)',
  'rgba(150, 203, 207)',
  'rgba(255, 0, 207, 0.65)',
];

export const graphOptions = {
  scales: {
    xAxes: [{
      scaleLabel: {
        display: true,
      }, 
      ticks: {
        fontSize: 16
      }
    }],
    yAxes: [{
      scaleLabel: {
        display: true,
        labelString: 'Song Count ',
        fontSize: 20,
      },
      ticks: {
          beginAtZero: true,
          fontSize: 20
      }
    }],
  },  
  legend: {
    display: false
  },
  title: {
    display: true,
    fontSize: 20,
    text: 'Song Count on Featured Playlists'
  },

  maintainAspectRatio: true 
}

export const buttonStyles = {
  width: '30%',
  height: '45px',
  margin: '2%',
  fontSize: '24px',
  backgroundColor: 'rgba(255, 99, 132, 0.5)',
  border: '3px solid rgba(255, 99, 132)'
}