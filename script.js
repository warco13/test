document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('radarChart').getContext('2d');

    const initialData = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]; // Neutral as initial value for all
    const data = {
        labels: ['E1. Market Spaces', 'E2. Proposition Framing', 'E3. Customer Definition', 'E4. Distribution & Sales', 'I1. Tech Development and Depoloyment', 'I2. IP Management', 'I3. Product/Service Synthesis', 'I4. Manufacturing & Deployment', 'I5. Human Capital', 'I6. Financial Capital', 'C1. Strategic Positioning', 'C2. Business Model'],
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

    const submitButton = document.getElementById('submit');

    submitButton.addEventListener('click', function() {
        const selects = document.querySelectorAll('select');
        selects.forEach((select, index) => {
            data.datasets[0].data[index] = parseInt(select.value);
        });
        radarChart.update();
    });
});
