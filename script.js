document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('radarChart').getContext('2d');

    const initialData = [20, 10, 4, 2, 6];
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
                    suggestedMax: 20
                }
            }
        }
    };

    const radarChart = new Chart(ctx, config);

    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    checkboxes.forEach((checkbox, index) => {
        checkbox.addEventListener('change', function() {
            updateChartData(index, this.checked ? initialData[index] : 0);
        });
    });

    function updateChartData(index, value) {
        data.datasets[0].data[index] = value;
        radarChart.update();
    }

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
});
