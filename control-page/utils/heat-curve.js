let chart; // Variable para almacenar el gráfico
    
export function chartData() {
    // Crear gráfico vacío al cargar la página
    const ctx = document.getElementById('curve-preview-chart').getContext('2d');
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [0, 1, 2, 3], // Puntos de tiempo predeterminados
            datasets: [{
                label: 'Heat Curve (°C)',
                data: [130, 200, 280, 50], // Curva de calor vacía
                borderColor: 'rgb(3, 136, 219)',
                borderWidth: 2,
                fill: false
            }]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Time'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Temperature (°C)'
                    },
                    beginAtZero: true // Asegura que comience en 0
                }
            }
        }
    });
};

export function updateTemperatureCurve(curveData) {
   if (Array.isArray(curveData) && curveData.length === 4) {
        const times = [0, 1, 2, 3]; // Tiempo predeterminado
        console.log('actualizado', curveData);
        // Actualizar el gráfico con los nuevos datos
        chart.data.labels = times;
        chart.data.datasets[0].data = curveData;
        chart.update(); // Llamar a la actualización del gráfico
    } else {
        document.getElementById('output').value += "Error: Datos de curva inválidos.\n";
    }
}