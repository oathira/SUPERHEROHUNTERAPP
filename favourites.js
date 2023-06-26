let favList = document.getElementById('fav-list-ul');    
let heading = document.getElementById('heading');

let favouriteListIds = getFavouriteFromLocalStorage();

function getFavouriteFromLocalStorage(){
  let favourites;
  if(localStorage.getItem('favouriteHeros')===null){
     favourites=[];
  }
  else{
    favourites=JSON.parse(  localStorage.getItem('favouriteHeros'));
  }
  return favourites;
}

if(favouriteListIds.length == 0){
  let EmptyMessage = document.createElement('div');
  EmptyMessage.className = 'empty-message';
  EmptyMessage.innerHTML = "Add favourites...";
  heading.appendChild(EmptyMessage);
}

fetchFavourites();

function fetchFavourites() {
  for(let i = 0 ; i < favouriteListIds.length ; i++)
    {
      let query=favouriteListIds[i];
        fetchDetails(query);
     async function fetchDetails(query){
          const URL = `https://gateway.marvel.com:443/v1/public/characters/${query}?&ts=1687172870181&apikey=e79b44c4afe51716826ec1a692abe2ce&hash=2e58ac357ac2eb8962dc12716c15aa43`;
          const response = await fetch(`${URL}`);
          console.log(response);
          const output = await response.json();
          console.log(output);
          handleDisplayFavourites(output.data.results)
      }
     function  handleDisplayFavourites(data){
        //console.log(data[0].name);
        //console.log("inside update")
        let listItem = document.createElement('div');
        listItem.dataset.id = data[0].id;
        listItem.id = 'fav-list-li';
       listItem.innerHTML = 
        `<li id="super-hero">
          <div id="super-hero-data">
            <div id="top">
                <img src="${data[0].thumbnail.path + "." + data[0].thumbnail.extension }"></img>
            </div>
            <div id="bottom">
                <p id="super-hero-name"> ${ data[0].name }</p>
      
            </div>
          </div>
        </li>`

        let removeItem = document.createElement("button");
        removeItem.id = data[0].id;
       
        removeItem.innerHTML="Remove";
        removeItem.addEventListener('click',handleremoveFavourite);
        listItem.appendChild(removeItem);

        favList.appendChild(listItem);
      
      }   
  }

}
async function handleremoveFavourite(e){ 
    let removeItemId = e.target.id;
    let favouritesId = getFavouriteFromLocalStorage();
    let updatedFavouritesIds = favouritesId.filter((favouriteId)=>{
     return favouriteId != removeItemId ;
    })
    localStorage.setItem('favouriteHeros', JSON.stringify(updatedFavouritesIds));
    location.reload(); 
}




