const mylocation = () => {
    const status = document.querySelector(".status");
    const succses = (position) => {
        console.log(position);
    }
    const error = () => {
        status.textContent = "misamarti araa"
    }
    navigator.geolocation.getCurrentPosition(succses, error);
}
document.querySelector("#getlocation").addEventListener("click", mylocation)