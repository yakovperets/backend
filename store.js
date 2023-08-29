// ////////////////////////
const editCard = (id) => {
  cardEditor(id);
};
const deleteCard = (id) => {
  data.splice(id, 1);
  runOnArray(data);
};
const plus = (element, i) => {
  element.innerHTML++;
  i.rating.count++;
};
const minus = (element, i) => {
  element.innerHTML--;
  i.rating.count--;
};
const CARDSAREA = document.getElementById("cards-area");
const PRODUCT = document.getElementById("xx");

const createImage = (card, item, index) => {
  const DIV = document.createElement("div");
  DIV.setAttribute("class", "white-space");
  const ELEMENT = document.createElement("img");
  ELEMENT.setAttribute("class", "card-img");
  ELEMENT.src = item.image;
  DIV.appendChild(ELEMENT);
  card.appendChild(DIV);
  ELEMENT.addEventListener("click", () => {
    creatCardPage(index);
  });
};
const createText = (card, item) => {
  const ELEMENT = document.createElement("h2");
  ELEMENT.setAttribute("class", "card-h2");
  ELEMENT.innerHTML = item.title;
  const ELEMENT2 = document.createElement("hr");
  ELEMENT2.setAttribute("class", "card-hr");
  ELEMENT.appendChild(ELEMENT2);
  card.appendChild(ELEMENT);
};
const createHr = (card) => {
  const ELEMENT2 = document.createElement("hr");
  ELEMENT2.setAttribute("class", "card-hr");
  card.appendChild(ELEMENT2);
};
const createAmaount = (ccard, item) => {
  const card = document.createElement("div");
  card.setAttribute("class", "amount-div");
  const ELEMENT1 = document.createElement("button");
  ELEMENT1.innerHTML = "+1";
  ELEMENT1.setAttribute("class", "plus-one");

  const ELEMENT2 = document.createElement("h3");
  ELEMENT2.setAttribute("class", "card-amount");
  ELEMENT2.innerHTML = item.rating.count;
  const ELEMENT3 = document.createElement("button");
  ELEMENT3.setAttribute("class", "cons-one");
  ELEMENT3.addEventListener("clic", () => {
    minus(ELEMENT2, item);
  });
  ELEMENT1.addEventListener("click", () => {
    plus(ELEMENT2, item);
  });
  ELEMENT3.innerHTML = "-1";
  card.appendChild(ELEMENT1);
  card.appendChild(ELEMENT2);
  card.appendChild(ELEMENT3);
  ccard.appendChild(card);
};
const createIcons = (card, index) => {
  const ICONSDIV = document.createElement("div");
  ICONSDIV.setAttribute("class", "icon-div");
  const ELEMENT1 = document.createElement("i");
  ELEMENT1.setAttribute("class", "card-icon1");
  ELEMENT1.className = "material-icons";
  ELEMENT1.innerText = "delete";
  const ELEMENT2 = document.createElement("i");
  ELEMENT2.setAttribute("class", "card-icon2");
  ELEMENT2.className = "material-icons";
  ELEMENT2.innerText = "edit";
  ELEMENT1.addEventListener("click", () => {
    deleteCard(index);
  });
  ELEMENT2.addEventListener("click", () => {
    editCard(index);
  });

  ICONSDIV.appendChild(ELEMENT1);
  ICONSDIV.appendChild(ELEMENT2);
  card.appendChild(ICONSDIV);
};
const home = () => {
  runOnArray(data);
};
const createRate = (card, item) => {
  const STARSDIV = document.createElement("div");
  STARSDIV.setAttribute("class", "stars-div");

  let rate = item.rating.rate;
  if (rate > 4.5) {
    const ELEMENT = document.createElement("i");
    ELEMENT.setAttribute("class", "stars");
    ELEMENT.className = "material-icons";
    ELEMENT.innerText = "grade";
    ELEMENT.style.color = "#FFBF9B";
    STARSDIV.appendChild(ELEMENT);
  }

  card.appendChild(STARSDIV);
};
const createCards = (item, id) => {
  PRODUCT.innerText = "Product ";

  const CARD = document.createElement("div");
  CARD.setAttribute("class", "card");
  CARD.setAttribute("id", item.id);
  createImage(CARD, item, id);
  createText(CARD, item);
  createHr(CARD);
  createAmaount(CARD, item);
  const DIV = document.createElement("div");
  DIV.setAttribute("class", "icon-div");
  createIcons(DIV, id);
  createRate(DIV, item);
  CARD.appendChild(DIV);

  CARDSAREA.appendChild(CARD);
};
const runOnArray = (array) => {
  for (let i = 0; i < array.length; i++) {
    createCards(array[i], i);
  }
};
/////דאטא מהשרת
async function fetchDataFromServer() {
  try {
    const response = await fetch(
      "https://my-first-server-on-cloude.onrender.com/product/all"
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

const start = async () => {
  const data = await fetchDataFromServer();
  console.log(data);
  runOnArray(data);
};

// const sssss = document.getElementById("ccccccc");
// sssss.addEventListener("click", (event) => {
//   console.log(event.target);
// });
