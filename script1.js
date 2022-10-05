

function areaSelectorHandler() {
  const areaButton = document.getElementById("area-button");
  const areaSelector = document.getElementById("area-selector");
  function clickAreaButton() {
    areaSelector.classList.toggle("area-selector-show");
  }
  areaButton.addEventListener("click", clickAreaButton);
}

document.addEventListener("DOMContentLoaded", starter);

function starter() {
  areaSelectorHandler();
  areaRequest();
  // copiText()
  clickButtonSave()
}

function createChips(text) {
  let div = document.createElement('div');
  let p = document.createElement('p');
  let button = document.createElement('button');
  div.className = "select-city";
  button.className = "btn1";
  div.append(p);
  div.append(button);
  p.textContent = text;
  button.textContent = String.fromCharCode(10006);
  function closeSelectCity() {
    div.parentNode.removeChild(div);
  }
  button.addEventListener("click", closeSelectCity);
  return div;
}


function areaItemClick(event) {//'это событие, элемент находится в event.currentTarget
  let nameCity = event.currentTarget.firstChild.textContent;
  let chips = createChips(nameCity);
  let div = document.querySelector(".select");
  div.append(chips);
}
function copiText(nameCity) {
  
  nameCity = name.textСontent 
  console.log(name)
}

function clickButtonSave() {
const div = document.querySelector(".save")
function click () {
  let name = document.querySelectorAll(".select-city p");
  console.log(name)
}
div.addEventListener("click", click)

}

// function array() {
//   let arrayItem = document.querySelectorAll(".city1");
// arrayItem.forEach(function (item) {
// item.addEventListener("click", areaItemClick)
// })  
//   arrayItem.forEach((item) => { item.addEventListener("click", areaItemClick); })
// }


// function areaRequest(){
//   let promise = fetch("https://studika.ru/api/areas", {method: "POST"})
//   promise.then(function data(response){
//     console.log(response)
//     return response.json()    
//   })
//   .then(function (json){
//     console.log(json)
//   })  
// }

async function areaRequest() {
  let response = await fetch("https://studika.ru/api/areas", { method: "POST" });
  let content = await response.json();
  let areaList = document.getElementById("area-list");
  content.forEach(function (item) {
    let li = creatLi(item.name);//через точку т.к это объект
    areaList.appendChild(li);
    // console.log(item)
    if (item.cities) {
      item.cities.forEach(function (city) {
        let p = creatLi(city.name, item.name)
        areaList.appendChild(p);
        // console.log(p)
      })
    }
  })
}


function creatLi(itemName, cityName) {
  let li = document.createElement("li");
  let p2 = document.createElement("p");
  let p1 = document.createElement("p");
  li.className = "city1";
  p2.className = "city-taitle";
  p1.className = "citis"
  p1.textContent = itemName;
  p2.textContent = cityName;
  li.append(p1);
  if (cityName) {
    li.append(p2);
  }
  li.addEventListener("click", areaItemClick);
  return li;
}
