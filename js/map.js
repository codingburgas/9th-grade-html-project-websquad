// Данни за инциденти и пожарни
const incidents = [
    { type: "fire", address: "ул. Александровска 15", coords: [42.6977, 23.3219], status: "active", description: "Пожар в жилищна сграда" },
    { type: "accident", address: "бул. Витоша 125", coords: [42.6851, 23.3148], status: "resolved", description: "ПТП с пострадали" },
    { type: "rescue", address: "парк Борисова градина", coords: [42.6734, 23.3388], status: "resolved", description: "Спасяване на котка от дърво" }
];

const stations = [
    { name: "Централна пожарна", coords: [42.6977, 23.3219] },
    { name: "Източна пожарна", coords: [42.7077, 23.3419] }
];

// Функция за избор на икона според типа инцидент
function getIncidentIcon(type) {
    switch(type) {
        case "fire": return "fa-fire";
        case "accident": return "fa-car-crash";
        case "rescue": return "fa-life-ring";
        default: return "fa-question-circle";
    }
}
function getIncidentTypeName(type) {
    switch(type) {
        case "fire": return "Пожар";
        case "accident": return "Катастрофа";
        case "rescue": return "Спасяване";
        default: return "Друго";
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Инициализация на Leaflet картата
    const map = L.map('map').setView([42.6977, 23.3219], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: ' © OpenStreetMap contributors'
    }).addTo(map);

    // Маркери за инциденти
    incidents.forEach(incident => {
        const color = incident.status === 'active' ? 'red' : 'green';
        const iconHtml = `<i class="fas ${getIncidentIcon(incident.type)}" style="color:${color};font-size:20px"></i>`;
        const marker = L.marker(incident.coords).addTo(map);
        marker.bindPopup(`
            <div style="min-width: 200px;">
                <h4>${iconHtml} ${getIncidentTypeName(incident.type)}</h4>
                <p><strong>Адрес:</strong> ${incident.address}</p>
                <p><strong>Състояние:</strong> <span style="color:${color}">${incident.status === 'active' ? 'Активен' : 'Решен'}</span></p>
                <p><strong>Описание:</strong> ${incident.description}</p>
            </div>
        `);
    });

    // Маркери за пожарни
    stations.forEach(station => {
        const stationIcon = L.divIcon({
            html: '<i class="fas fa-fire-extinguisher" style="color: blue; font-size: 20px;"></i>',
            iconSize: [20, 20],
            className: 'custom-div-icon'
        });
        L.marker(station.coords, { icon: stationIcon }).addTo(map)
            .bindPopup(`<strong>${station.name}</strong>`);
    });
});