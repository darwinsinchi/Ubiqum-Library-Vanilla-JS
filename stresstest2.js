fetch("https://api.myjson.com/bins/1h3vb3", {
  method: "GET"
})
  .then(function(response) {
    console.log(response);
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  })
  .then(function(json) {
    console.log(json.books);
    stressBooks2 = json.books;

    document.getElementById("search50").addEventListener("keyup", function() {
      setTimeout(function() {
        searchBox(stressBooks2);
      }, 300);
    });

    document
      .getElementById("lookupButton")
      .addEventListener("click", function() {
        searchBox(stressBooks2);
      });

    bookInformation(stressBooks2);
  })
  .catch(function(error) {
    console.log("Request failed:" + error.message);
  });

function bookInformation(bookArray) {
  var giveMeImage = document.getElementById("cartas");
  for (var i = 0; i < bookArray.length; i++) {
    var mainDiv = document.createElement("div");
    mainDiv.setAttribute("class", "card50");
    giveMeImage.append(mainDiv);

    var mainDiv2 = document.createElement("div");
    mainDiv2.setAttribute("class", "card60");
    mainDiv.append(mainDiv2);

    var front = document.createElement("div");
    front.setAttribute("class", "front10");
    mainDiv2.append(front);

    var back = document.createElement("div");
    back.setAttribute("class", "back10");
    mainDiv2.append(back);

    var pictures = bookArray[i].portada;
    front.style.backgroundImage = "url(" + pictures + ")";
    front.style.backgroundSize = "cover";

    //

    var mainTitle = document.createElement("h4");
    mainTitle.textContent = bookArray[i].titulo;
    back.append(mainTitle);

    var mainDescription = document.createElement("p");
    mainDescription.textContent = bookArray[i].descripcion;
    back.append(mainDescription);

    var buttonInf = document.createElement("button");
    back.append(buttonInf);

    var button100 = document.createElement("a");
    var moreText = document.createTextNode("Mas Info");
    button100.appendChild(moreText);

    button100.href = bookArray[i].detalle;
    buttonInf.append(button100);

    button100.setAttribute("data-fancybox", "fancybox");
  }
}

function searchBox(bookArray) {
  document.getElementById("cartas").innerHTML = "";
  var enterSearch = document.getElementById("search50").value;
  var chooseBook = [];
  for (var i = 0; i < bookArray.length; i++) {
    if (
      bookArray[i].titulo.toLowerCase().includes(enterSearch.toLowerCase()) ||
      bookArray[i].descripcion.toLowerCase().includes(enterSearch.toLowerCase())
    ) {
      chooseBook.push(bookArray[i]);
    }
  }
  bookInformation(chooseBook);
}
