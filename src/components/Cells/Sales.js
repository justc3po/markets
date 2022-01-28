import { useRef } from "react";
import { stocksActions } from "../../store/stock-slice";
import { useDispatch } from "react-redux";
import React from "react";

const Sales = React.memo((props) => {
  const dispatch = useDispatch();
  const sales = useRef();

  const changeSalesHandler = () => {
    const value = Number(sales.current.value);
    dispatch(
      stocksActions.updateProperty({
        ticker: props.ticker,
        propertyValue: value,
        propertyName: "sales",
      })
    );
    dispatch(stocksActions.calculateParameters(props.ticker));
  };

  return (
    <input
      key={`${props.ticker}/sales/innerdiv`}
      className="input"
      type="number"
      value={Number(props.sales?.toFixed(2))}
      ref={sales}
      onChange={changeSalesHandler}
    ></input>
  );
});
export default Sales;
