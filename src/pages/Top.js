import { useDispatch } from "react-redux";
import classes from "./Top.module.css";
import {
  sendStocksData,
  fetchStockPrice,
  repackingStocksDataBase,
} from "../store/stocks-actions";
import { useRef } from "react";
import { stocksActions } from "../store/stock-slice";
import React from "react";
import { useHistory, useLocation } from "react-router-dom";

const titles = [
  "Price",
  "Market Cap, bln",
  "Sales, bln",
  "Estimated CAGR",
  "P/S",
  "P/E",
  "Dilution",
  "Investment Multpl",
  "Investment Yield Worst Case",
  "Worst P/S",
  "Worst P/E",
  "Year 1",
  "Year 2",
  "Year 3",
  "Year 4",
  "Year 5",
  "Sales by CAGR, bln",
  "Investment Yield Optimistic",
  "best P/S",
  "best P/E",
  "Net Margin",
  "Estimation Years",
  "Shares, mln",
  "Gross Margin",
];

const Top = () => {
  const dispatch = useDispatch();
  const filterInputRef = useRef();
  const history = useHistory();
  console.log("Top component rendered");

  const FetchToDBHandler = () => {
    dispatch(sendStocksData());
    console.log("Sent Data to DB");
  };
  const FetchPricesHandler = () => {
    // dispatch(repackingStocksDataBase());
    dispatch(fetchStockPrice());
  };

  const filterHandler = () => {
    const tickerFilter = filterInputRef.current.value.toUpperCase();
    dispatch(stocksActions.filter(tickerFilter));
  };

  const sortingHandler = (el) => {
    const title = el;
    history.push(`/main?sort=${title}`);
    dispatch(stocksActions.sortHandler(title));
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.cell}>
        <button onClick={FetchToDBHandler}>Send to DB</button>
        <button onClick={FetchPricesHandler}>Fetch Prices</button>
      </div>

      <input
        className={classes.cell}
        type="text"
        onChange={filterHandler}
        ref={filterInputRef}
        value={filterInputRef.current?.value.toUpperCase()}
      />

      {titles.map((el, index) => (
        <div
          className={`${classes.cellTop} hand`}
          key={`${el}*${index}`}
          id={el}
          onClick={() => sortingHandler(el)}
        >
          <p>{el}</p>
        </div>
      ))}
    </div>
  );
};

export default React.memo(Top);
