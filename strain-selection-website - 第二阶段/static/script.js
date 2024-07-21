document.getElementById('filter-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const temperature = document.getElementById('temperature').value;
    const humidity = document.getElementById('humidity').value;
    const soil_ph = document.getElementById('soil_ph').value;

    window.location.href = `/results.html?temperature=${temperature}&humidity=${humidity}&soil_ph=${soil_ph}`;
});
