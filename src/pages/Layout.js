import Row from "../components/Row";
import classes from "./Layout.module.css";
import { useSelector } from "react-redux";
import React from "react";
import Skeleton from "../components/UI/Skeleton";
import { useLocation } from "react-router-dom";

let filteredStocks = [];

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

const Layout = () => {
  const stocks = useSelector((state) => state.stocks);
  const filteredTicker = stocks.filteredTicker;
  const location = useLocation();

  console.log("RERENDER Layout");

  const tickerExisted =
    stocks.stocks.find((el) => el.ticker === filteredTicker) !== undefined;
  let propertyTitle;

  // const sortingOn = stocks.sort;

  const queryParams = new URLSearchParams(location.search);
  const propertyClicked = queryParams.get("sort");
  if (propertyClicked !== null) {
    propertyTitle = map.get(propertyClicked);
  }
  const sortingOn = stocks.sort;
  console.log(
    "Layout component - sortingOn & propertyTitle",
    sortingOn,
    propertyTitle
  );

  if (tickerExisted) {
    if (filteredTicker === "") {
      if (sortingOn) {
        console.log("starting sortering");
        // const sortTicker = stocks.sortTicker;
        const sortTicker = propertyTitle;
        console.log(sortTicker);
        const stocksForFiltering = [...stocks.stocks];
        filteredStocks = stocksForFiltering.sort((a, b) => {
          const index = b[sortTicker] - a[sortTicker];
          if (typeof index === "number") return b[sortTicker] - a[sortTicker];
          return 0;
        });
        console.log("filtered stocks sortered = ", filteredStocks);
      } else {
        filteredStocks = stocks.stocks;
        console.log("filtered stocks = ", filteredStocks);
      }
    } else {
      filteredStocks = stocks.stocks.filter(
        (el) => el.ticker === filteredTicker
      );
      console.log("filtered stocks = ", filteredStocks);
    }
  }
  const isFetchingFinished = stocks.isFetchingFinished;
  const skeletonArray = [];

  for (let i = 0; i < 13; i++) {
    skeletonArray.push(<Skeleton key={`skeleton/${i}`} />);
  }

  console.log("Skeleton Array builded ", skeletonArray);

  if (isFetchingFinished) {
    return (
      <div className={classes.layout}>
        {filteredStocks?.map((stock, index) => {
          if (stock.ticker !== "") {
            return <Row stock={stock} key={`${stock}/${index}`} />;
          } else {
            return (
              <div
                className={classes.emptyLine}
                key={`${stock}/${index}`}
              ></div>
            );
          }
        })}
      </div>
    );
  } else {
    return <div className={classes.wrapper}>{skeletonArray}</div>;
  }
};

export default Layout;

// const fetchingPrice = async (stockTicker) => {
//   const response = await fetch(
//     `https://finnhub.io/api/v1/quote?symbol=${stockTicker}&token=c6f5m8qad3idclgq5sug`
//   );
//   if (!response.ok) throw new Error("1 st stage of fetching failed");
//   const data = await response.json();
//   console.log(stockTicker, data["c"]);
//   return { stockTicker: stockTicker, stockPrice: data["c"] };
// };

// if (isFetchingFinished) {
//   if (sortingOn && filteredStocks.length !== 1) {
//     return (
//       <div className={classes.layout}>
//         {sorteredStocks?.map((stock, index) => {
//           if (stock.ticker !== "") {
//             return <Row stock={stock} key={`${stock}/${index}`} />;
//           } else {
//             return (
//               <div
//                 className={classes.emptyLine}
//                 key={`${stock}/${index}`}
//               ></div>
//             );
//           }
//         })}
//       </div>
//     );
//   } else {
//     return (
//       <div className={classes.layout}>
//         {filteredStocks?.map((stock, index) => {
//           if (stock.ticker !== "") {
//             return <Row stock={stock} key={`${stock}/${index}`} />;
//           } else {
//             return (
//               <div
//                 className={classes.emptyLine}
//                 key={`${stock}/${index}`}
//               ></div>
//             );
//           }
//         })}
//       </div>
//     );
//   }
// } else {
//   return <div className={classes.wrapper}>{skeletonArray}</div>;
// }
