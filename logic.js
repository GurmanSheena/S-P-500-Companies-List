let url = 'https://en.wikipedia.org/w/api.php?action=parse&format=json&origin=*&page=List_of_S%26P_500_companies';
let tables;
let sp500_JSON = [];

fetch(url)
  .then(function(response) {
    return response.json();
  })
  .then(function(response) {
    html_code = response["parse"]["text"]["*"];
    parser = new DOMParser();
    html = parser.parseFromString(html_code, "text/html");
    tables = html.querySelectorAll(".wikitable");

    //Provides a list of all S&P 500 Company Tickers
    let tickers = tables[0];

    //individual ticker - need to loop through 500 times at least
    let i;
    for (i = 1; i < tickers.rows.length; i++) {
      let ticker = tickers.rows.item(i);

      parseTickerInformation(ticker);
    }
    quick(sp500_JSON);
    createList(sp500_JSON);
    //quick(JSON.stringify(sp500_JSON));
    //createTableFromJSON(sp500_JSON);
  });

//get the core info about the company
function parseTickerInformation(ticker) {
  let symbol = ticker.cells[0].innerText.trim();
  let name = ticker.cells[1].innerText;
  let exchange = ((ticker.cells[0].innerHTML).includes("nasdaq")) ? "NASDAQ" : "NYSE";
  let industry = ticker.cells[3].innerText;
  let sector = ticker.cells[4].innerText;
  let founded = ticker.cells[8].innerText.trim();
  let headquarters = ticker.cells[5].innerText;
  let date_first_added = ticker.cells[6].innerText;
  let cik = ticker.cells[7].innerText;
  let sec_filings = "https://www.sec.gov/cgi-bin/browse-edgar?CIK=" + symbol + "&action=getcompany";
  let exchange_profile = (exchange.includes("NASDAQ")) ? "https://www.nasdaq.com/market-activity/stocks/" + symbol : "https://www.nyse.com/quote/XNYS:" + symbol;
  let yahoo_finance_profile = "https://finance.yahoo.com/quote/" + symbol;
  let seekingalpha_profile = "https://seekingalpha.com/symbol/" + symbol + "/dividends";
  let dividends = {
    "scorecard": seekingalpha_profile + "/scorecard",
    "history": seekingalpha_profile + "/history"
  };


  let company = {
    "symbol": symbol,
    "name": name,
    "exchange": exchange,
    "industry": industry,
    "sector": sector,
    "founded": founded,
    "headquarters": headquarters,
    "date_first_added": date_first_added,
    "cik": cik,
    "sec_filings": sec_filings,
    "exchange_profile": exchange_profile,
    "yahoo_finance_profile": yahoo_finance_profile,
    "divideds": dividends
  };

  sp500_JSON.push(company);
}

function createList(data) {
  let list = document.getElementById("companiesList");

  let i;
  for (i = 0; i < data.length; i++) {
    var listItem = document.createElement('li');
    listItem.style.class = "listItem";
    listItem.innerHTML = data[i].name;
    list.appendChild(listItem);
  }
}

let searchInput = document.getElementById("search");
searchInput.addEventListener('keyup', search);

function search() {
  let list = document.getElementById("companiesList");
  let searchValue = searchInput.value.toLowerCase();
  quick("" + searchInput.value);
  let listItems = list.querySelectorAll('li');

  let i;
  for (i = 0; i < listItems.length; i++) {
    quick("" + listItems[i].innerHTML.toLowerCase());

    let match = listItems[i].innerHTML.toLowerCase().indexOf(searchValue);
    quick(match);
    if (match > -1) {
      listItems[i].style.display = '';
      quick("yes");
    } else {
      listItems[i].style.display = 'none';
      quick("no");
    }
  }

}

//quick console
function quick(input) {
  console.log(input);
}

function createTableFromJSON(data) {
  let sp500_JSON = data;
  let col = [];
  for (let i = 0; i < sp500_JSON.length; i++) {
    for (let key in sp500_JSON[i]) {
      if (col.indexOf(key) === -1) {
        col.push(key);
      }
    }
  }

  let table = document.createElement("table");
  let tr = table.insertRow(-1);

  for (let i = 0; i < col.length; i++) {
    let th = document.createElement("th");
    th.innerHTML = col[i].toUpperCase();
    tr.appendChild(th);
  }

  for (let i = 0; i < sp500_JSON.length; i++) {
    tr = table.insertRow(-1);

    for (let j = 0; j < col.length; j++) {
      let tabCell = tr.insertCell(-1);
      tabCell.innerHTML = sp500_JSON[i][col[j]];
    }
  }

  let div = document.getElementById("companieslist");
  div.innerHTML = "";
  div.appendChild(table);
}

/*
Help docs:
https://stackoverflow.com/questions/53127383/how-to-pull-data-from-wikipedia-page
https://www.encodedna.com/javascript/populate-json-data-to-html-table-using-javascript.htm
*/