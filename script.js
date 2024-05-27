document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('radarChart').getContext('2d');

    const initialData = [50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50]; // Neutral as initial value for all

    // Define CRL arrays for each possible value from 0 to 10
    const crlValues = [
        [33, 15, 13, 5, 80, 30, 20, 0, 15, 22, 10, 0], // CRL 0
        [42, 32, 18, 5, 90, 38, 28, 5, 28, 31, 20, 0], // CRL 1
        [43, 49, 22, 13, 92, 50, 36, 7, 32, 37, 32, 4], // CRL 2
        [49, 52, 32, 24, 93, 63, 50, 10, 40, 40, 40, 8], // CRL 3
        [53, 65, 46, 32, 77, 70, 52, 20, 53, 62, 60, 29], // CRL 4
        [69, 71, 65, 36, 77, 74, 69, 32, 62, 88, 77, 67], // CRL 5
        [77, 77, 88, 73, 70, 74, 87, 50, 79, 92, 90, 90], // CRL 6
        [73, 76, 90, 90, 50, 60, 87, 75, 90, 90, 89, 98], // CRL 7
        [68, 60, 92, 92, 27, 50, 75, 87, 90, 80, 89, 99], // CRL 8
        [71, 50, 93, 93, 18, 38, 60, 89, 92, 65, 80, 90], // CRL 9
        [64, 27, 96, 96, 16, 18, 40, 80, 91, 18, 60, 72]  // CRL 10
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
            label: 'Average successful company at same CRL',
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
            layout: {
                padding: {
                    top: 10, // Reduce the top padding
                    bottom: 10 // Adjust the bottom padding if needed
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'right' // Change position to 'left', 'right', 'top', or 'bottom'
                }
            },
            scales: {
                r: {
                    angleLines: {
                        display: true
                    },
                    suggestedMin: 0,
                    suggestedMax: 100,
                    pointLabels: {
                        font: {
                            size: 12, // Adjust the font size if necessary
                            family: 'Arial', // Font family
                            weight: 'bold', // Font weight
                        }
                    }
                }
            }
        }
    };

    const radarChart = new Chart(ctx, config);

    const submitButton = document.getElementById('submit');

    submitButton.addEventListener('click', function() {
        const averages = calculateAverages();
        const crlValue = document.querySelector('input[name="CRL"]:checked').value; // Get CRL value
        const crlData = crlValues[crlValue]; // Select the corresponding CRL array
        updateChartData(averages, crlData);
        sendToGoogleSheets(averages, crlValue);
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

    function sendToGoogleSheets(averages, crlValue) {
        const url = "https://script.google.com/macros/s/AKfycbwE9Mz-ZjS4_lbwo4yGPaD3DIfWqJLw0bgLknx4M-5zEoReTS91g1Y32MDcKCtz63yj/exec"; // Replace with your Google Apps Script Web App URL
        const payload = {
            crlValue: crlValue,
            averages: averages
        };

        fetch(url, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
    
});
