import { stocksActions } from "./stock-slice";

export const fetchStockPrice = () => {
  return async (dispatch, getState) => {
    const tickerBase = getState().stocks.tickerBase;
    const fetchingPrice = async (stockTicker) => {
      const response = await fetch(
        `https://finnhub.io/api/v1/quote?symbol=${stockTicker}&token=XXX`
      );
      if (!response.ok) throw new Error("1 st stage of fetching failed");
      const data = await response.json();
      console.log(stockTicker, data);
      return { stockTicker: stockTicker, stockPrice: data["c"] };
    };

    function timeout() {
      return new Promise((resolve) => setTimeout(resolve, 31000));
    }

    try {
      dispatch(dispatch(stocksActions.isFetchingFinishedHandler(false)));
      const tickerBase029 = tickerBase.slice(0, 28);
      const tickerBase2857 = tickerBase.slice(28, 57);
      const tickerBase5785 = tickerBase.slice(57, 85);
      const tickerBase85113 = tickerBase.slice(85, 113);
      const tickerBase113end = tickerBase.slice(113, tickerBase.length);

      const batch1 = await Promise.all(
        tickerBase029.map(async (ticker) => fetchingPrice(ticker))
      );

      await timeout();

      const batch2 = await Promise.all(
        tickerBase2857.map(async (ticker) => fetchingPrice(ticker))
      );

      await timeout();

      const batch3 = await Promise.all(
        tickerBase5785.map(async (ticker) => fetchingPrice(ticker))
      );

      await timeout();

      const batch4 = await Promise.all(
        tickerBase85113.map(async (ticker) => fetchingPrice(ticker))
      );

      await timeout();

      const batch5 = await Promise.all(
        tickerBase113end.map(async (ticker) => fetchingPrice(ticker))
      );

      batch1.forEach((el) =>
        dispatch(
          stocksActions.changeStockPrice({
            ticker: el.stockTicker,
            price: el.stockPrice,
          })
        )
      );
      batch2.forEach((el) =>
        dispatch(
          stocksActions.changeStockPrice({
            ticker: el.stockTicker,
            price: el.stockPrice,
          })
        )
      );
      batch3.forEach((el) =>
        dispatch(
          stocksActions.changeStockPrice({
            ticker: el.stockTicker,
            price: el.stockPrice,
          })
        )
      );
      batch4.forEach((el) =>
        dispatch(
          stocksActions.changeStockPrice({
            ticker: el.stockTicker,
            price: el.stockPrice,
          })
        )
      );
      batch5.forEach((el) =>
        dispatch(
          stocksActions.changeStockPrice({
            ticker: el.stockTicker,
            price: el.stockPrice,
          })
        )
      );
      dispatch(dispatch(stocksActions.isFetchingFinishedHandler(true)));
      console.log("fetching price done");
    } catch (error) {
      console.log("2nd stage of fetching failed");
    }
  };
};

export const sendStocksData = () => {
  return async (dispatch, getState) => {
    const sendingData = getState().stocks.stocks;
    const uploadDeletedStocksData = async () => {
      console.log("Sending data / sendingData:", sendingData);
      const response = await fetch(
        "https://XXXX.europe-west1.firebasedatabase.app/stocks.json",
        {
          method: "PUT",
          body: JSON.stringify({
            stocks: sendingData,
          }),
        }
      );
      if (!response.ok) throw new Error("1st stage Sending data failed");
    };
    try {
      if (sendingData && sendingData.length > 2)
        await uploadDeletedStocksData();
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchStocksDataBase = () => {
  return async (dispatch) => {
    const fetchingData = async () => {
      const response = await fetch(
        "https://XXXX.europe-west1.firebasedatabase.app/stocks.json"
      );
      if (!response.ok)
        throw new Error("1 st stage of fetching from DB failed");
      const data = await response.json();
      return data;
    };
    try {
      console.log("Started fetching from DataBase");
      dispatch(dispatch(stocksActions.isFetchingFinishedHandler(false)));
      const stocksData = await fetchingData();
      console.log("dispatching UpdateSite", stocksData);
      const deletedStockIndex = stocksData.stocks.indexOf(null);

      if (deletedStockIndex > -1 && stocksData !== null) {
        const clearedStocks = stocksData.stocks.filter((el) => el !== null);
        const finalStocksData = { stocks: clearedStocks };
        console.log("clearedStocks : ", clearedStocks);
        dispatch(stocksActions.updateSiteData(finalStocksData));
        dispatch(stocksActions.stockChangedHandler(true));
      } else {
        dispatch(stocksActions.updateSiteData(stocksData));
        dispatch(stocksActions.dbFetchedHandler(true));
      }

      dispatch(stocksActions.filter(""));
      dispatch(dispatch(stocksActions.isFetchingFinishedHandler(true)));
    } catch (error) {
      console.log("2nd stage of fetching from DB failed");
    }
  };
};

export const deleteStockFromDB = (ticker) => {
  return async (dispatch, getState) => {
    const stocks = getState().stocks.stocks;
    const index = stocks.findIndex((el) => el.ticker === ticker);
    const deletedStock = stocks.find((el) => el.ticker === ticker);
    const sendingData = [...getState().stocks.stocksDeleted, deletedStock];

    const deletingStock = async () => {
      console.log(
        " index ",
        index,
        " ticker: ",
        ticker,
        "stocks[3].ticker : ",
        stocks[3].ticker
      );
      const response = await fetch(
        `https://XXXXX.europe-west1.firebasedatabase.app/stocks/stocks/${index}.json`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) throw new Error("1st stage deleting data failed");
    };

    const uploadDeletedStocksData = async () => {
      console.log("Sending Deleted Stocks data / sendingData:", sendingData);
      const response = await fetch(
        "https://XXXX.europe-west1.firebasedatabase.app/stocksDeleted.json",
        {
          method: "PUT",
          body: JSON.stringify({
            stocksDeleted: sendingData,
          }),
        }
      );
      if (!response.ok)
        throw new Error("1st stage Sending Deleted Stocks data failed");
    };

    try {
      dispatch(dispatch(stocksActions.isFetchingFinishedHandler(false)));
      await deletingStock();
      if (sendingData !== null && sendingData.length > 0)
        await uploadDeletedStocksData();
      dispatch(dispatch(stocksActions.stockDeleting(ticker)));
      dispatch(dispatch(stocksActions.isFetchingFinishedHandler(true)));
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchOnly1StockPrice = (ticker) => {
  return async (dispatch) => {
    const fetchingPrice = async (stockTicker) => {
      const response = await fetch(
        `https://finnhub.io/api/v1/quote?symbol=${stockTicker}&token=XXXX`
      );
      if (!response.ok) throw new Error("1 st stage of fetching failed");
      const data = await response.json();
      console.log(data["c"]);
      return data["c"];
    };
    try {
      const stockPrice = await fetchingPrice(ticker);
      dispatch(
        stocksActions.changeStockPrice({
          ticker: ticker,
          price: stockPrice,
        })
      );
    } catch (error) {
      console.log("2nd stage of fetching failed");
    }
  };
};

// export const repackingStocksDataBase = () => {
//   return (dispatch, getState) => {
//     const stocks = getState().stocks.stocks;
//     const newStocks = [];
//     stocks.forEach((el) => {
//       newStocks.push({ [el.ticker]: el });
//     });
//     console.log("new stocks ", newStocks);
//   };
// };
