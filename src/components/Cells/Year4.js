import { useRef } from "react";
import { stocksActions } from "../../store/stock-slice";
import { useDispatch } from "react-redux";
import React from "react";

const Year4 = React.memo((props) => {
  const dispatch = useDispatch();
  const year4 = useRef();

  const changeYear4Handler = () => {
    const value = Number(year4.current.value);
    dispatch(
      stocksActions.updateProperty({
        ticker: props.ticker,
        propertyValue: value,
        propertyName: "year4",
      })
    );
    dispatch(stocksActions.calculateParameters(props.ticker));
  };

  return (
    <input
      key={`${props.ticker}/year4/innerdiv`}
      className="input"
      type="number"
      value={Number(props.year4?.toFixed(2))}
      ref={year4}
      onChange={changeYear4Handler}
    ></input>
  );
});
export default Year4;
