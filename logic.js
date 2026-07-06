const btn= document.getElementById("srchBtn");
API_KEY="85a6ea6c13574c009cc173115260607";
btn.addEventListener("click", async function(){
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

        }

        const data =await response.json();
        console.log(data);

        name.textContent = data.location.name;
        temperature.textContent = `${data.current.temp_c}°C`;
        description.textContent = data.current.condition.text;
        icon.src = `https:${data.current.condition.icon}`;

    }catch(error){
        console.error("the exact error is: ",error);
        description.textContent="something went wrong";
        name.textContent = "";
        temperature.textContent = "";
        icon.src = "";
    }

})