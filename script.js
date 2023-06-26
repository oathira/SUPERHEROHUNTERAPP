// API= https://developer.marvel.com/docs 
// let ts='1687172870181';
// let publicKey='e79b44c4afe51716826ec1a692abe2ce';
// let hashVal='2e58ac357ac2eb8962dc12716c15aa43';
const searchBox = document.getElementById('search-box');
const searchList = document.getElementById('search-list');

//fetch characters from API
async function fetchData(data){
    const URL =`https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${data}&ts=1687172870181&apikey=e79b44c4afe51716826ec1a692abe2ce&hash=2e58ac357ac2eb8962dc12716c15aa43`;   
    const response = await fetch(`${URL}`);
    const output = await response.json();
    handleDisplayList(output.data.results);

}
 
 function fetchChars(){
    let char = searchBox.value.trim();
    console.log(char);
    if(char.length>0){
    searchList.classList.remove('display-list-none');
    fetchData(char)
 }
 else{
    searchList.classList.add('display-list-none');
 }
}
//function to display the searching character list 
function handleDisplayList(items){
   //  console.log(items)
    searchList.innerHTML="";
    for(let i=0;i<items.length;i++){
       const listItem = document.createElement("div");
       listItem.dataset.id = items[i].id;
      //  create class attribte with the name search-list-item
       listItem.className="search-list-item"
       listItem.innerHTML =`
          <div class="item-left" >
          
             <img src="${items[i].thumbnail.path + "." + items[i].thumbnail.extension}"/>
          </div>
          <div class="item-right">
             <a href= ${ "charDescription.html?character=" + items[i].id }>${items[i].name}</a>
             <button onClick="handleFavourite()">Favourite</button>
          </div>
       `;
       searchList.append(  listItem);}
       handleCharDescription();
   }

function handleCharDescription(){
    const list = searchList.querySelectorAll('.search-list-item');
        list.forEach(character =>{
        console.log(character);
        character.addEventListener('click' ,async()=>{
            list.className = ("display-list-none");
            searchBox.value = "";
            const result = await fetch(`https://gateway.marvel.com:443/v1/public/characters/${character.dataset.id}?&ts=1687172870181&apikey=e79b44c4afe51716826ec1a692abe2ce&hash=2e58ac357ac2eb8962dc12716c15aa43`)    
            const charDetails = await result.json();
            console.log(charDetails);
            handleFavourite(charDetails);
        })
    })
}
function handleFavourite(charDetails){
      let id = charDetails.data.results[0].id;
      let favourites = getFavouriteFromLocalStorage();
      if(!favourites.includes(id)){
        favourites.push(id);
       }
       //Set favourite charcter ids in local storage
      localStorage.setItem('favouriteHeros',JSON.stringify(favourites));
 }

//function to get favourite charcter ids from localstorage
function getFavouriteFromLocalStorage(){
      let favourites;
      if(localStorage.getItem('favouriteHeros')===null){
        favourites=[];
      }
      else{
        favourites=JSON.parse(localStorage.getItem('favouriteHeros'));
      }
      return favourites;
}


