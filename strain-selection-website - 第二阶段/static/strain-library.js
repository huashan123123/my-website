document.addEventListener('DOMContentLoaded', function () {
    fetch('/api/strain-library')  // 假设你有一个这样的 API 来获取菌种库数据
        .then(response => response.json())
        .then(data => {
            const tbody = document.querySelector('#strain-library-table tbody');
            tbody.innerHTML = '';

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
        })
        .catch(error => {
            console.error('Error:', error);
        });
});
