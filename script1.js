

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
  inputSearchStart()
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
  let elements = div.childNodes
  let nashliElement = false;
  let delCips = undefined;
  // let result = Array.prototype.find.call(elements, function (child) {
  //       return (child.firstChild.textContent === nameCity)
  //     })
  elements.forEach(function (child) {
    if (child.firstChild.textContent === nameCity) {
      nashliElement = true
      delCips = child
    }
  })
  if (nashliElement === true) {
    div.removeChild(delCips)
  } else {
    div.append(chips);
  }
}



function clickButtonSave() {
  const div = document.querySelector(".save")
  function click() {
    let name = document.querySelectorAll(".select-city p");
    let div = document.querySelector(".area-button .m");
    let result = "";
    name.forEach(function (node) {
      let p = node.textContent;
      if (result === "") { result = p } else { result = result + ", " + p }
    })
    if (result === "") { result = "Любой регион" }
    div.textContent = result
    const areaSelector = document.getElementById("area-selector");
    areaSelector.classList.toggle("area-selector-show");
  }
  div.addEventListener("click", click);
}

function search() {
  let list = document.querySelectorAll(".city1")
  let input = document.querySelector(".input-search input")
  let filter = input.value.toUpperCase();
  console.log(filter)
  list.forEach(function (li) {
    if (li.textContent.toUpperCase().indexOf(filter) > -1) {
      li.style.display = "";
    } else {
      li.style.display = "none";
    }
    console.log()
  })
}

function inputSearchStart() {
  let input = document.querySelector(".input-search")
  input.addEventListener('keyup', search)
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
