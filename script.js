document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('radarChart').getContext('2d');

    const initialData = [50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50]; // Neutral as initial value for all

    // Define CRL arrays for each possible value from 0 to 10
    const crlValues = [
        [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 50, 60], // CRL 0
        [20, 30, 40, 50, 60, 70, 80, 90, 100, 10, 20, 30], // CRL 1
        [30, 40, 50, 60, 70, 80, 90, 100, 10, 20, 30, 40], // CRL 2
        [40, 50, 60, 70, 80, 90, 100, 10, 20, 30, 40, 50], // CRL 3
        [50, 60, 70, 80, 90, 100, 10, 20, 30, 40, 50, 60], // CRL 4
        [60, 70, 80, 90, 100, 10, 20, 30, 40, 50, 60, 70], // CRL 5
        [70, 80, 90, 100, 10, 20, 30, 40, 50, 60, 70, 80], // CRL 6
        [80, 90, 100, 10, 20, 30, 40, 50, 60, 70, 80, 90], // CRL 7
        [90, 100, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100], // CRL 8
        [100, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 10], // CRL 9
        [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 10, 20]  // CRL 10
    ];
    
    const data = {
        labels: ['E1. Market Spaces', 'E2. Proposition Framing', 'E3. Customer Definition', 'E4. Distribution & Sales', 'I1. Tech Development and Depoloyment', 'I2. IP Management', 'I3. Product/Service Synthesis', 'I4. Manufacturing & Deployment', 'I5. Human Capital', 'I6. Financial Capital', 'C1. Strategic Positioning', 'C2. Business Model'],
        datasets: [{
            label: 'My Company',
            data: [...initialData],
            fill: true,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgb(255, 99, 132)',
            pointBackgroundColor: 'rgb(255, 99, 132)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(255, 99, 132)'
        },
        {
            label: 'Successful Company at same Stage',
            data: [...initialData], // Placeholder, will be updated on submit
            fill: true,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgb(54, 162, 235)',
            pointBackgroundColor: 'rgb(54, 162, 235)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(54, 162, 235)'
        }
      ]
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
                        display: true
                    },
                    suggestedMin: 0,
                    suggestedMax: 100
                }
            }
        }
    };

    const radarChart = new Chart(ctx, config);

    const submitButton = document.getElementById('submit');

    submitButton.addEventListener('click', function() {
        const averages = calculateAverages();
        const crlValue = parseInt(document.getElementById('CRL').value); // Get CRL value
        const crlData = crlValues[crlValue]; // Select the corresponding CRL array
        updateChartData(averages, crlData);
    });

    function calculateAverages() {
        const averages = [];
        for (let i = 0; i < 12; i++) {
            const start = i * 3;
            const groupValues = [
                parseInt(document.getElementById(`question${start + 1}`).value),
                parseInt(document.getElementById(`question${start + 2}`).value),
                parseInt(document.getElementById(`question${start + 3}`).value)
            ];
            const average = groupValues.reduce((sum, value) => sum + value, 0) / groupValues.length;
            averages.push(average);
        }
        return averages;
    }

    function updateChartData(averages,crlData) {
        data.datasets[0].data = averages;
        data.datasets[1].data = crlData;
        radarChart.update();
    }
});
