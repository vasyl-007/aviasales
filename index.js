// get elements from html-page
const formSearch = document.querySelector(".form-search");
const inputCitiesFrom = document.querySelector(".input__cities-from");
const inputCitiesTo = document.querySelector(".input__cities-to");
const dropdownCitiesFrom = document.querySelector(".dropdown__cities-from");
const dropdownCitiesTo = document.querySelector(".dropdown__cities-to");
const inputDateDepart = document.querySelector(".input__date-depart");
const cheapestTicket = document.getElementById("cheapest-ticket");
const otherCheapTickets = document.getElementById("other-cheap-tickets");

// data
const citiesApi = "http://api.travelpayouts.com/data/ru/cities.json";
const proxy = "https://cors-anywhere.herokuapp.com";
const API_KEY = "4cd88cac72f7bf1405921eb58af981ae";
const calendar = "http://min-prices.aviasales.ru/calendar_preload";

let city = [];

// functions
const getData = (url, callback) => {
  const request = new XMLHttpRequest();

  request.open("GET", url);

  request.addEventListener("readystatechange", () => {
    if (request.readyState !== 4) return;
    if (request.status === 200) {
      callback(request.response);
    } else {
      console.error(request.status);
    }
  });

  request.send();
};

const showCity = (input, list) => {
  list.textContent = "";

  if (input.value !== "") {
    const filterCity = city.filter((item) => {
      const fixItem = item.name.toLowerCase();
      return fixItem.startsWith(input.value.toLowerCase());
    });

    filterCity.forEach((item) => {
      const li = document.createElement("li");
      li.classList.add("dropdown__city");
      li.textContent = item.name;
      list.append(li);
    });
  }
};

const selectCity = (event, input, list) => {
  const target = event.target;
  if (target.tagName.toLowerCase() === "li") {
    input.value = target.textContent;
    list.textContent = "";
  }
};

const getNameCity = (code) => {
  const objCity = city.find((item) => item.code === code);
};

const getChanges = (n) => {
  if (n) {
    return n === 1 ? "С одной пересадкой" : "С двумя пересадками";
  } else {
    return "Без пересадок";
  }
};

const createCard = (data) => {
  const ticket = document.createElement("article");
  ticket.classList.add("ticket");

  let deep = "";

  if (data) {
    deep = `
        <h3 class="agent" >${data.gate}</h3>
        <div class="ticket__wrapper">
            <div class="left-side">
                <a href="https://www.aviasales.ua/search/SVX2905KGD1" class="button button__buy">Купить за ${data.value} UAH</a>
            </div>

            <div class="right-side">
                <div class="block-left">
                    <div class="city__from">Вылет из города
                        <span class="city__name">${data.origin}</span>
                    </div>
                    <div class="date">${data.depart_date}</div>
                </div>

                <div class="block-right">
                    <div class="changes">Без пересадок</div>
                    <div class="city__to">Город назначения:
                        <span class="city__name">${data.destination}</span>
                    </div>
                </div>
            </div>
        </div>
        `;
  } else {
    deep = "<h3>К сожалению, на текущую дату билетов не нашлось!</h3>";
  }

  ticket.insertAdjacentHTML("afterbegin", deep);

  return ticket;
};

const renderCheapDay = (cheapTicket) => {
  const ticket = createCard(cheapTicket[0]);
  cheapestTicket.append(ticket);
  console.log(ticket);
};

const renderCheapYear = (cheapTickets) => {
  cheapTickets.sort((a, b) => a.value - b.value);
  console.log(cheapTickets);
};
