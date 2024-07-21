document.addEventListener('DOMContentLoaded', function () {
    fetch('/api/strains') // 假设有一个端点可以获取所有菌种数据
        .then(response => response.json())
        .then(data => {
            const tbody = document.getElementById('library-body');
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
            const tbody = document.getElementById('library-body');
            tbody.innerHTML = '<tr><td colspan="4">发生错误，请稍后重试。</td></tr>';
            console.error('Error:', error);
        });

    document.getElementById('home-button').addEventListener('click', function () {
        window.location.href = '/home.html'; // 确保主页路径正确
    });
});
