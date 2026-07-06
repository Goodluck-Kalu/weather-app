const btn= document.getElementById("srchBtn");
API_KEY="85a6ea6c13574c009cc173115260607";
btn.addEventListener("click", async function(){
    btn.textContent = "Searching...";
    const city = document.getElementById("city").value;
    const name=document.getElementById("cityName");
    const description = document.getElementById("description")
    const temperature = document.getElementById("temperature");
    const icon = document.getElementById("icon");

    if(!city){
        description.textContent ="Input city";
        return;
    }

    try{
        const response =await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}` )

        if(!response.ok){
            throw new Error("City not found. Please check your spelling.");
            btn.textContent = "Search";
        }

        const data =await response.json();
        console.log(data);

        name.textContent = data.location.name;
        temperature.textContent = `${data.current.temp_c}°C`;
        description.textContent = data.current.condition.text;
        icon.src = `https:${data.current.condition.icon}`;
        

        const condition = data.current.condition.text.toLowerCase();

        if (condition.includes("rain")) {
             document.body.style.backgroundColor = "#4a5568"; // Rainy gray
        } else if (condition.includes("sunny") || condition.includes("clear")) {
            document.body.style.backgroundColor = "#f6ad55"; // Sunny orange/yellow
        } else {
            document.body.style.backgroundColor = "#2d3748"; // Default dark mode
        }
        btn.textContent = "Search";
    }catch(error){
        console.error("the exact error is: ",error);
        description.textContent="something went wrong";
        name.textContent = "";
        temperature.textContent = "";
        icon.removeAttribute("src");
        btn.textContent = "Search";
    }

})

const input = document.getElementById("city");

input.addEventListener("keydown" ,function(event){
    if(event.key === "Enter"){
        btn.click();

    }
})