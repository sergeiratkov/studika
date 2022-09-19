function areaSelector() {
  const x = document.querySelector("#area-selector");
  console.log(x);
  // x.style.display = "block";
  const areaButton = document.querySelector("#area-button");
  areaButton.addEventListener("click", () => {
    x.style.display = x.style.display === "block" ? "none" : "block";
  })
}


document.addEventListener("DOMContentLoaded", areaSelector);

