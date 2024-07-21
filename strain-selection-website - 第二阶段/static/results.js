document.addEventListener('DOMContentLoaded', function () {
    const params = new URLSearchParams(window.location.search);
    const temperature = params.get('temperature');
    const humidity = params.get('humidity');
    const soil_ph = params.get('soil_ph');

    fetch(`/api/strains?temperature=${temperature}&humidity=${humidity}&soil_ph=${soil_ph}`)
        .then(response => response.json())
        .then(data => {
            const tbody = document.getElementById('results-body');
            tbody.innerHTML = '';

            const messageDiv = document.getElementById('message');
            messageDiv.innerHTML = '';
            messageDiv.style.display = 'none'; // 默认隐藏提示框

            if (data.length === 0) {
                let message = '没有找到符合条件的菌种。';

                if (temperature < 10 || temperature > 35) {
                    message += '<br>提示：当前温度范围不适宜种植菌种。';
                }
                if (humidity < 30 || humidity > 90) {
                    message += '<br>提示：当前湿度范围不适宜种植菌种。';
                }
                if (soil_ph < 5.5 || soil_ph > 7.5) {
                    message += '<br>提示：当前 pH 范围不适宜种植菌种。';
                }

                if (message !== '没有找到符合条件的菌种。') {
                    messageDiv.innerHTML = message;
                    messageDiv.style.display = 'block'; // 只有当有提示时才显示提示框
                } else {
                    messageDiv.style.display = 'none'; // 没有提示时隐藏提示框
                }
            } else {
                data.forEach(strain => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>${strain.name}</td>
                        <td>${strain.min_temperature}°C - ${strain.max_temperature}°C</td>
                        <td>${strain.min_humidity}% - ${strain.max_humidity}%</td>
                        <td>${strain.min_soil_ph} - ${strain.max_soil_ph}</td>
                    `;
                    tbody.appendChild(tr);
                });
            }
        })
        .catch(error => {
            const tbody = document.getElementById('results-body');
            tbody.innerHTML = '<tr><td colspan="4">发生错误，请稍后重试。</td></tr>';
            console.error('Error:', error);
        });

    document.getElementById('resubmit-button').addEventListener('click', function () {
        window.location.href = '/index.html';
    });

    document.getElementById('home-button').addEventListener('click', function () {
        window.location.href = '/home.html';
    });
});
