var url = 'https://en.wikipedia.org/w/api.php?action=parse&format=json&origin=*&page=List_of_S%26P_500_companies';
var tables;
var sp500_JSON = [];

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
    var tickers = tables[0];

    //individual ticker - need to loop through 500 times at least
    var i;
    for (i = 0; i < tickers.rows.length; i++) {
      var ticker = tickers.rows.item(i);

      parseTickerInformation(ticker);
    }
    quick(sp500_JSON);
    createCompaniesList();

  });



//get the core info about the company
function parseTickerInformation(ticker) {
  var tickerSymbol = ticker.cells[0].innerText;
  var exchangeString = ticker.cells[0].innerHTML;
  var exchange = (exchangeString.includes("nasdaq")) ? "NASDAQ" : "NYSE";
  var companyName = ticker.cells[1].innerText;
  var company = {
    ticker: tickerSymbol,
    exchange: exchange,
    name: companyName
  };

  sp500_JSON.push(company);

}



function createCompaniesList() {

  let table = document.getElementById("list");
  let row = document.createElement("tr");
  createTableData();




}

function createTableData() {

}
//quick console
function quick(input) {
  console.log(input);
}



/*
Help doc: https://stackoverflow.com/questions/53127383/how-to-pull-data-from-wikipedia-page
*/