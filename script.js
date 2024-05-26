document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('radarChart').getContext('2d');

    const initialData = [2, 2, 2, 2, 2]; // Neutral as initial value for all
    const data = {
        labels: ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'],
        datasets: [{
            label: 'My Dataset',
            data: [...initialData],
            fill: true,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgb(255, 99, 132)',
            pointBackgroundColor: 'rgb(255, 99, 132)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(255, 99, 132)'
        }]
    };

    const config = {
        type: 'radar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: true,
            elements: {
                line: {
                    borderWidth: 3
                }
            },
            scales: {
                r: {
                    angleLines: {
                        display: false
                    },
                    suggestedMin: 0,
                    suggestedMax: 4
                }
            }
        }
    };

    const radarChart = new Chart(ctx, config);

    const selects = document.querySelectorAll('select');

    selects.forEach((select, index) => {
        select.addEventListener('change', function() {
            updateChartData(index, parseInt(this.value));
        });
    });

    function updateChartData(index, value) {
        data.datasets[0].data[index] = value;
        radarChart.update();
    }
});
