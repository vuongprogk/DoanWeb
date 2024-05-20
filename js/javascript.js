let root = document.querySelector("html");
let theme = localStorage.getItem("theme");
if (theme !== null) {
  root.setAttribute("data-bs-theme", theme);
  document.getElementById("darkmode").checked = theme === "dark" ? true : false;
}

var jsonArray;

// read data from json file
function loadData(load) {
  fetch(".././data/giathien.json")
    .then((response) => response.json())
    .then(load);
}

// option change reload
function changeSection() {
  let select = document.getElementById("chuong");
  let reading = document.getElementById("reading");
  localStorage.setItem("chuong", select.value);
  reading.innerHTML = `<h3> ${jsonArray[select.value].title} </h3>`;
  jsonArray[select.value].content.forEach((value) => {
    reading.innerHTML += `<p>${value}</p>`;
  });
}

// Load option for reading_view.html
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

  // Load section from params
  let textSearch = window.location.search;
  if (textSearch.length !== 0) {
    let search = new URLSearchParams(textSearch);
    let index = search.get("chuong");
    if (index > -1 && index < json.length) {
      localStorage.setItem("chuong", index - 1);
    }
    window.history.replaceState(null, "", window.location.pathname);
  }
  let chuong = localStorage.getItem("chuong");
  if (chuong !== null && chuong > 0 && chuong < json.length) {
    select.value = chuong;
  }
  changeSection();
}
function loadList(json) {
  json.forEach((element, index) => {
    let select = document.getElementById("chuong");
    let link = document.createElement("a");
    link.innerText = element.title;
    link.setAttribute(
      "class",
      "text-decoration-none list-group-item-action list-group-item"
    );
    link.setAttribute(
      "href",
      `.././giathien/reading_view.html` + `?chuong=${index + 1}`
    );
    select.appendChild(link);
  });
}
function moveSection(i) {
  let select = document.getElementById("chuong");
  let index = parseInt(select.value);
  if ((i > 0 && index < jsonArray.length - 1) || (i < 0 && index > 0)) {
    select.value = index + i;
    localStorage.setItem("chuong", index + 1);
    changeSection();
  }
}

//load theme
let darkmode = document.getElementById("darkmode");
darkmode.addEventListener("change", function () {
  let root = document.querySelector("html");
  if (darkmode.checked) {
    root.setAttribute("data-bs-theme", "dark");
    localStorage.setItem("theme", "dark");
  } else {
    root.setAttribute("data-bs-theme", "light");
    localStorage.setItem("theme", "light");
  }
});
