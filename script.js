// SELECTORS
const details = document.querySelector(".details");
const imgContainer = document.querySelector(".img-container");
const getUserBtn = document.querySelector(".get-user");
const errorMsg = document.querySelector("#error-msg");

const url = "https://xivapi.com/character";
const serverList = [
  "Adamantoise",
  "Aegis",
  "Alexander",
  "Anima",
  "Asura",
  "Atomos",
  "Bahamut",
  "Balmung",
  "Behemoth",
  "Belias",
  "Brynhildr",
  "Cactuar",
  "Carbuncle",
  "Cerberus",
  "Chocobo",
  "Coeurl",
  "Diabolos",
  "Durandal",
  "Excalibur",
  "Exodus",
  "Faerie",
  "Famfrit",
  "Fenrir",
  "Garuda",
  "Gilgamesh",
  "Goblin",
  "Gungnir",
  "Hades",
  "Hyperion",
  "Ifrit",
  "Ixion",
  "Jenova",
  "Kujata",
  "Lamia",
  "Leviathan",
  "Lich",
  "Louisoix",
  "Malboro",
  "Mandragora",
  "Masamune",
  "Mateus",
  "Midgardsormr",
  "Moogle",
  "Odin",
  "Omega",
  "Pandaemonium",
  "Phoenix",
  "Ragnarok",
  "Ramuh",
  "Ridill",
  "Sargatanas",
  "Shinryu",
  "Shiva",
  "Siren",
  "Tiamat",
  "Titan",
  "Tonberry",
  "Typhon",
  "Ultima",
  "Ultros",
  "Unicorn",
  "Valefor",
  "Yojimbo",
  "Zalera",
  "Zeromus",
  "Zodiark",
  "Spriggan",
  "Twintania",
  "Bismarck",
  "Ravana",
  "Sephirot",
  "Sophia",
  "Zurvan",
  "HongYuHai",
  "ShenYiZhiDi",
  "LaNuoXiYa",
  "HuanYingQunDao",
  "MengYaChi",
  "YuZhouHeYin",
  "WoXianXiRan",
  "ChenXiWangZuo",
  "BaiYinXiang",
  "BaiJinHuanXiang",
  "ShenQuanHen",
  "ChaoFengTing",
  "LvRenZhanQiao",
  "FuXiaoZhiJian",
  "Longchaoshendian",
  "MengYuBaoJing",
  "ZiShuiZhanQiao",
  "YanXia",
  "JingYuZhuangYuan",
  "MoDuNa",
  "HaiMaoChaWu",
  "RouFengHaiWan",
  "HuPoYuan",
  "ShuiJingTa2",
  "YinLeiHu2",
  "TaiYangHaiAn2",
  "YiXiuJiaDe2",
  "HongChaChuan2",
  "Alpha",
  "Phantom",
  "Raiden",
  "Sagittarius",
];

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
const getUser = async (name, server) => {
  let response = await fetch(`${url}/search?name=${name}&server=${server}`);
  // results property on object is an array - if single result then will just be one object on array
  console.log(response);
  if (response.ok) {
    let data = await response.json();
    // returns an array of objects - grab first object
    let results = data.Results[0];
    const id = results.ID;
    console.log(id);
    // use lodestone ID to make another fetch request to get detailed character information
    getCharacterData(id);
  } else {
    errorMsg.textContent = "Something wrong with your information";
  }
};

getUserBtn.addEventListener("click", (event) => {
  // grab input value
  let name = document.querySelector("#character").value;
  let server = document.querySelector("#server").value;
  if (!serverList.includes(server.toUpperCase())) {
    errorMsg.style.display = "block";
    // server does not exist then display error message
    errorMsg.textContent = "Please enter an actual server of FFXIV";
  } else {
    getUser(name.toLowerCase(), server.toLowerCase());
  }
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
