var jsonArray;
function loadData(load) {
  fetch("/data/giathien.json")
    .then((res) => res.json())
    .then(load);
}
function changeSection() {
  let select = document.getElementById("chuong");
  let reading = document.getElementById("reading");
  reading.innerHTML = `<h3> ${jsonArray[select.value].title} </h3>`;
  jsonArray[select.value].content.forEach((value) => {
    reading.innerHTML += `<p>${value}</p>`;
  });
}
function loadOption(json) {
  let select = document.getElementById("chuong");
  json.forEach((element, index) => {
    let newOption = document.createElement("option");
    let optionText = document.createTextNode(element.title);
    newOption.appendChild(optionText);
    newOption.setAttribute("value", index);
    select.appendChild(newOption);
  });
  jsonArray = json;
  changeSection();
}
function loadList(json) {
  json.forEach((element) => {
    let select = document.getElementById("chuong");
    let link = document.createElement("a");
    link.innerText = element.title;
    link.setAttribute(
      "class",
      "text-decoration-none list-group-item-action list-group-item"
    );
    select.appendChild(link);
  });
}
function moveSection(i) {
  let select = document.getElementById("chuong");
  let index = parseInt(select.value);
  if ((i > 0 && index < jsonArray.length - 1) || (i < 0 && index > 0)) {
    select.value = index + i;
    changeSection();
  }
}
let darkmode = document.getElementById("darkmode");
darkmode.addEventListener("change", function () {
  let root = document.querySelector("html");
  if (darkmode.checked) {
    root.setAttribute("data-bs-theme", "dark");
  } else {
    root.setAttribute("data-bs-theme", "light");
  }
});
