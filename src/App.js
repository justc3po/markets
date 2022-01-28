import classes from "./App.module.css";
import Top from "./pages/Top";
import Layout from "./pages/Layout";
import { Route, Switch, Redirect } from "react-router-dom";
import StockDetail from "./pages/StockDetail";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { stocksActions } from "./store/stock-slice";
import { sendStocksData, fetchStocksDataBase } from "./store/stocks-actions";
import Skeleton from "./components/UI/Skeleton";

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const stocksChanged = useSelector((state) => state.stocks.changed);
  const stocksDeleted = useSelector((state) => state.stocks.stocksDeleted);
  const dbFetched = useSelector((state) => state.stocks.dbFetched);

  console.log("App component rendered");

  useEffect(() => {
    console.log("UseEffect 1 with dependencies");
    dispatch(fetchStocksDataBase());
  }, [stocksDeleted, dispatch, dbFetched]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    if (stocksChanged) {
      dispatch(sendStocksData());
      dispatch(stocksActions.stockChangedHandler(false));
      console.log("Sent Data to DB");
    }
    console.log("STOCKS STATE CHANGEDSTOCKS STATE CHANGEDSTOCKS STATE CHANGED");
  }, [stocksChanged, dispatch]);

  console.log("dbFetched ", dbFetched);

  const skeletonArray = [];

  for (let i = 0; i < 13; i++) {
    skeletonArray.push(<Skeleton />);
  }

  if (dbFetched) {
    return (
      <>
        <Top />
        <Switch>
          <Route path="/" exact>
            <Redirect to="/main" />
          </Route>
          <Route path="/main">
            <Layout />
          </Route>
          <Route path="/stock-detail/:stockTicker">
            <StockDetail />
          </Route>
        </Switch>
      </>
    );
  } else {
    return (
      <>
        <Top />
        <div className={classes.wrapper}>
          <Skeleton />
        </div>
      </>
    );
  }
}

export default App;
