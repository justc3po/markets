import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Row from "../components/Row";
import classes from "./StockDetail.module.css";
import React from "react";
import { stocksActions } from "../store/stock-slice";

const StockDetail = () => {
  //   const dispatch = useDispatch();
  const params = useParams();
  const ticker = params.stockTicker;
  const stocks = useSelector((state) => state.stocks.stocks);
  const stockForRendering = stocks.find((el) => el.ticker === ticker);
  //   dispatch(stocksActions.sortHandler());
  console.log(stockForRendering);

  return (
    <div className={classes.layout}>
      <div className={classes.row}>
        <Row stock={stockForRendering} key={`${ticker}/stock-detail`} />
      </div>

      <ul>
        <li key="revenue">
          <a
            href={`https://www.macrotrends.net/stocks/charts/${ticker}/gitlab/revenue`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Revenues
          </a>
        </li>
        <li key="Shares-outstanding">
          <a
            href={`https://www.macrotrends.net/stocks/charts/${ticker}/gitlab/shares-outstanding`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Shares-outstanding
          </a>
        </li>
        <li key="Price-sales">
          <a
            href={`https://www.macrotrends.net/stocks/charts/${ticker}/gitlab/price-sales`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Price-sales
          </a>
        </li>
        <li key="Net-profit-margin">
          <a
            href={`https://www.macrotrends.net/stocks/charts/${ticker}/gitlab/net-profit-margin`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Net-profit-margin
          </a>
        </li>
        <li key="Market cap">
          <a
            href={`https://www.macrotrends.net/stocks/charts/${ticker}/gitlab/market-cap`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Market cap
          </a>
        </li>
      </ul>
    </div>
  );
};

export default React.memo(StockDetail);
