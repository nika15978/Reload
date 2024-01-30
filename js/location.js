const mylocation = () => {
    const status = document.querySelector(".status");
    const succses = (position) => {
        console.log(position.coords.latitude, position.coords.longitude);
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude
        initMap(latitude, longitude);
    }
    const error = () => {
        status.textContent = "misamarti araa"
    }
    navigator.geolocation.getCurrentPosition(succses, error);
}
mylocation();
// let map;

// async function initMap() {
//     const { Map } = await google.maps.importLibrary("maps");

//     map = new Map(document.getElementById("map"), {
//         center: { lat: 41.71513770, lng: 44.82709600 },
//         zoom: 8,
//     });
//     const marker = new AdvancedMarkerElement({
//         map,
//         position: { lat: 41.94427360, lng: 42.04580910 },
//     });
// }
// initMap();
async function initMap(lat, lng) {
    // Request needed libraries.
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    const map = new Map(document.getElementById("map"), {
        center: { lat: 41.73162, lng: 44.7538 },
        zoom: 14,
        mapId: "4504f8b37365c3d0",
    });
    let marker = new AdvancedMarkerElement({
        map,
        position: { lat: lat, lng: lng },
    });

}

