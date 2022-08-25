// SELECTORS
const details = document.querySelector(".details");
const imgContainer = document.querySelector(".img-container");
const getUserBtn = document.querySelector(".get-user");

const url = "https://xivapi.com/character";

// Functions
const displayCharacterData = (charData) => {
  const { Avatar } = charData;
  imgContainer.querySelector("img").src = `${Avatar}`;
};

const getCharacterData = async (id) => {
  let response = await fetch(`${url}/${id}?data=MIMO`);
  if (response.ok) {
    let data = await response.json();
    // returns an object with multiple properties
    let character = data.Character;
    // console.log(character);
    // pass character data into function to display
    displayCharacterData(character);
  }
};

// Fetch DATA from FFXIV API
const getUser = async (name) => {
  let response = await fetch(`${url}/search?name=${name}&server=Coeurl`);
  // results property on object is an array - if single result then will just be one object on array
  if (response.ok) {
    let data = await response.json();
    // returns an array of objects - grab first object
    let results = data.Results[0];
    const id = results.ID;
    console.log(id);
    // use lodestone ID to make another fetch request to get detailed character information
    getCharacterData(id);
  }
};

getUserBtn.addEventListener("click", (event) => {
  // grab input value
  let name = document.querySelector("input").value;
  getUser(name.toLowerCase());
});

// {
//   "Avatar": "https://img2.finalfantasyxiv.com/f/9c32f3a0df26a886877e2780a238b78a_284358f8eb4efc9095914e46798c6ab3fc0_96x96.jpg?1661431210",
//   "FeastMatches": 0,
//   "ID": 34397653,
//   "Lang": "EN",
//   "Name": "Maisy Moonwind",
//   "Rank": null,
//   "RankIcon": null,
//   "Server": "Coeurl"
// }
