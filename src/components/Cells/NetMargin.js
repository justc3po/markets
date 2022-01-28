import { useRef } from "react";
import { stocksActions } from "../../store/stock-slice";
import { useDispatch } from "react-redux";
import React from "react";

const NetMargin = React.memo((props) => {
  const dispatch = useDispatch();
  const netMargin = useRef();

  const changeNetMarginHandler = () => {
    const value = Number(netMargin.current.value);
    dispatch(
      stocksActions.updateProperty({
        ticker: props.ticker,
        propertyValue: value,
        propertyName: "netMargin",
      })
    );
    dispatch(stocksActions.calculateParameters(props.ticker));
  };

  return (
    <input
      key={`${props.ticker}/netMargin/innerdiv`}
      className="input"
      type="number"
      value={Number(props.netMargin?.toFixed(2))}
      ref={netMargin}
      onChange={changeNetMarginHandler}
    ></input>
  );
});
export default NetMargin;
