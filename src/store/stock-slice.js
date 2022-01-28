import { createSlice } from "@reduxjs/toolkit";

const template = {
  ticker: "",
  price: 0,
  potential: 0,
  marketCap: 0,
  sales: 0,
  estimatedCAGR: 0,
  PS: 0,
  PE: 0,
  dilution: 0,
  ivestmentMultpl: 0,
  investmentYieldOptimistic: 0,
  optimisticPS: 0,
  optimisticPE: 0,
  investmentYieldWorstCase: 0,
  worstPS: 0,
  worstPE: 0,
  year1: 0,
  year2: 0,
  year3: 0,
  year4: 0,
  year5: 0,
  calculatedSalesByCAGR: 0,
  netMargin: 0,
  sharesOutstanding: 0,
  yearOfEstimation: 0,
  grossMargin: 0,
};

const tickerBase = [
  "AMZN",
  "ACN",
  "TCEHY",
  "INTC",
  "SFTBY",
  "AAPL",
  "MSFT",
  "FB",
  "GOOG",
  "NILSY",
  "",
  "CRM",
  "PYPL",
  "ASML",
  "NFLX",
  "TSLA",
  "NVDA",
  "DIS",
  "ADBE",
  "",
  "SHOP",
  "NOW",
  "INTU",
  "UBER",
  "ABNB",
  "YNDX",
  "CMG",
  "SQ",
  "AMD",
  "SE",
  "MELI",
  "TME",
  "SPOT",
  "PINS",
  "WDAY",
  "PDD",
  "",
  "TEAM",
  "DOCU",
  "TWLO",
  "ZM",
  "NIO",
  "VRM",
  "CVNA",
  "ZNGA",
  "OZON",
  "EPAM",
  "ADSK",
  "ROKU",
  "ADYEY",
  "RBLX",
  "SPLK",
  "DASH",
  "TCS",
  "DASH",
  "TDOC",
  "",
  "CRWD",
  "S",
  "NET",
  "FSLY",
  "OKTA",
  "DDOG",
  "ZS",
  "SNOW",
  "PLTR",
  "AI",
  "MDB",
  "ESTC",
  "AYX",
  "TTD",
  "COUP",
  "APPN",
  "AFRM",
  "CGNX",
  "FUBO",
  "BYND",
  "CURI",
  "ZEN",
  "STNE",
  "OCFT",
  "BASE",
  "SKLZ",
  "CHPT",
  "WIX",
  "PATH",
  "CFLT",
  "DOCS",
  "GRAB",
  "UPST",
  "GLBE",
  "GTLB",
  "FVRR",
  "UPWK",
  "",
  "BILI",
  "HUYA",
  "TME",
  "",
  "SEDG",
  "ENPH",
  "CSIQ",
  "",
  "MP",
  "CRSP",
  "",
  "MILE",
  "LMND",
  "CLOV",
  "OPEN",
  "QS",
  "DM",
  "SPCE",
  "SOFI",
  "SUNL",
  "LATCH",
  "MTTR",
  "BGRY",
  "OTMO",
  "PTRA",
];

const map = new Map([
  ["Price", "price"],
  ["Market Cap, bln", "marketCap"],
  ["Sales, bln", "sales"],
  ["Estimated CAGR", "estimatedCAGR"],
  ["P/S", "PS"],
  ["P/E", "PE"],
  ["Dilution", "dilution"],
  ["Investment Multpl", "ivestmentMultpl"],
  ["Investment Yield Optimistic", "investmentYieldOptimistic"],
  ["best P/S", "optimisticPS"],
  ["best P/E", "optimisticPE"],
  ["Investment Yield Worst Case", "investmentYieldWorstCase"],
  ["Worst P/S", "worstPS"],
  ["Worst P/E", "worstPE"],
  ["Year 1", "year1"],
  ["Year 2", "year2"],
  ["Year 3", "year3"],
  ["Year 4", "year4"],
  ["Year 5", "year5"],
  ["Sales by CAGR, bln", "calculatedSalesByCAGR"],
  ["Net Margin", "netMargin"],
  ["Shares, mln", "sharesOutstanding"],
  ["Estimation Years", "yearOfEstimation"],
  ["Gross Margin", "grossMargin"],
]);

const stocksSlice = createSlice({
  name: "stocks",
  initialState: {
    stocks: [],
    changed: false,
    tickerBase,
    filteredTicker: "",
    isFetchingFinished: true,
    dbFetched: false,
    stocksDeleted: [],
    sort: false,
    sortTicker: "",
  },
  reducers: {
    changeStockPrice(state, action) {
      const stockTicker = action.payload.ticker;
      const stockPrice = action.payload.price;
      state.changed = true;
      console.log("Start to change Stock Price/ state.stocks:", state.stocks);

      const existingStock = state.stocks.find(
        (el) => el.ticker === stockTicker
      );
      if (existingStock) {
        console.log("Stock existed");
        existingStock.price = stockPrice;
      } else {
        console.log("Stock creating");
        state.stocks.push({
          ...template,
          ticker: stockTicker,
          price: stockPrice,
        });
      }
    },
    updateSiteData(state, action) {
      console.log("Starting to update site/ action.payload:", action.payload);
      state.stocks = action.payload.stocks;
      console.log("Finished to update site/ state.stocks:", state.stocks);
    },
    updateProperty(state, action) {
      const stockTicker = action.payload.ticker;
      const propertyValue = action.payload.propertyValue;
      const propertyName = action.payload.propertyName;
      state.changed = true;
      console.log(
        "Starting update property:",
        stockTicker,
        propertyValue,
        propertyName,
        state.changed
      );
      const existingStock = state.stocks.find(
        (el) => el.ticker === stockTicker
      );
      if (existingStock) {
        console.log("Stock existed");
        existingStock[propertyName] = propertyValue;
      }
    },
    filter(state, action) {
      const incomingTicker = action.payload;
      state.filteredTicker = incomingTicker;
    },
    calculateParameters(state, action) {
      const stockTicker = action.payload;
      console.log("Started calculateParameters for : ", stockTicker);
      const existingStock = state.stocks.find(
        (el) => el.ticker === stockTicker
      );

      existingStock.marketCap =
        (existingStock.sharesOutstanding * existingStock.price) / 1000;
      existingStock.estimatedCAGR =
        (Math.pow(
          (existingStock.year1 / 100 + 1) *
            (existingStock.year2 / 100 + 1) *
            (existingStock.year3 / 100 + 1) *
            (existingStock.year4 / 100 + 1) *
            (existingStock.year5 / 100 + 1),
          0.2
        ) -
          1) *
        100;
      existingStock.PS = existingStock.marketCap / existingStock.sales;
      existingStock.PE = (existingStock.PS * 100) / existingStock.netMargin;
      existingStock.calculatedSalesByCAGR =
        existingStock.sales *
        Math.pow(
          existingStock.estimatedCAGR / 100 + 1,
          existingStock.yearOfEstimation
        );
      existingStock.worstPS =
        (existingStock.worstPE * existingStock.netMargin) / 100;
      existingStock.investmentYieldWorstCase =
        (Math.pow(
          (existingStock.calculatedSalesByCAGR * existingStock.worstPS) /
            existingStock.marketCap /
            Math.pow(
              1 + existingStock.dilution / 100,
              existingStock.yearOfEstimation
            ),
          1 / existingStock.yearOfEstimation
        ) -
          1) *
        100;
      existingStock.ivestmentMultpl = Math.pow(
        1 + existingStock.investmentYieldWorstCase / 100,
        existingStock.yearOfEstimation
      );
    },
    isFetchingFinishedHandler(state, action) {
      state.isFetchingFinished = action.payload;
      console.log(" isFetchingFinishedHandler :", state.isFetchingFinished);
    },
    stockChangedHandler(state, action) {
      state.changed = action.payload;
      console.log("changed ", state.changed);
    },
    stockDeleting(state, { payload: ticker }) {
      const deletedStock = state.stocks.find((el) => el.ticker === ticker);
      state.stocksDeleted.push(deletedStock);
      state.tickerBase = state.tickerBase.filter((el) => el !== ticker);
    },
    dbFetchedHandler(state, action) {
      state.dbFetched = action.payload;
      console.log("dbFetched changed to ", state.dbFetched);
    },
    sortHandler(state, { payload: title }) {
      state.sort = !state.sort;
      // if (title !== undefined) {
      //   const property = map.get(title);
      //   console.log("State property ", property);
      //   state.sortTicker = property;
      // }
    },
  },
});

export const stocksActions = stocksSlice.actions;
export default stocksSlice;
