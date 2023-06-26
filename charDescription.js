fetchCharacterData();

async function fetchCharacterData(){
    const string = window.location.search;
    const urlParams = new URLSearchParams(string); 
    console.log(urlParams);
    const character = urlParams.get('character') 
    console.log(character);
    const URL = `https://gateway.marvel.com:443/v1/public/characters/${character}?&ts=1687172870181&apikey=e79b44c4afe51716826ec1a692abe2ce&hash=2e58ac357ac2eb8962dc12716c15aa43`;
    const response = await fetch(`${URL}`); 
    const output= await response.json();
    console.log(output.data.results);
    handleCharDescription(output.data.results);
}


function handleCharDescription(data){
    const charName = document.getElementById('name')
    charName.innerHTML = data[0].name; 
    const description = document.getElementById('description')
    description.innerHTML = data[0].description;
    const superHeroImage =document.getElementById('image-container');
    const charImage = document.createElement('img');
    charImage.src = data[0].thumbnail.path + "."+ data[0].thumbnail.extension; 
    superHeroImage.appendChild(charImage); 
}

