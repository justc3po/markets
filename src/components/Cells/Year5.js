import { useRef } from "react";
import { stocksActions } from "../../store/stock-slice";
import { useDispatch } from "react-redux";
import React from "react";

const Year5 = React.memo((props) => {
  const dispatch = useDispatch();
  const year5 = useRef();

  const changeYear5Handler = () => {
    const value = Number(year5.current.value);
    dispatch(
      stocksActions.updateProperty({
        ticker: props.ticker,
        propertyValue: value,
        propertyName: "year5",
      })
    );
    dispatch(stocksActions.calculateParameters(props.ticker));
  };

  return (
    <input
      key={`${props.ticker}/year5/innerdiv`}
      className="input"
      type="number"
      value={Number(props.year5?.toFixed(2))}
      ref={year5}
      onChange={changeYear5Handler}
    ></input>
  );
});
export default Year5;
