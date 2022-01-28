import { useRef } from "react";
import { stocksActions } from "../../store/stock-slice";
import { useDispatch } from "react-redux";
import React from "react";

const YearOfEstimation = React.memo((props) => {
  const dispatch = useDispatch();
  const yearOfEstimation = useRef();

  const changeYearOfEstimationHandler = () => {
    const value = Number(yearOfEstimation.current.value);
    dispatch(
      stocksActions.updateProperty({
        ticker: props.ticker,
        propertyValue: value,
        propertyName: "yearOfEstimation",
      })
    );
    dispatch(stocksActions.calculateParameters(props.ticker));
  };

  return (
    <input
      className="input"
      type="number"
      value={Number(props.yearOfEstimation?.toFixed(2))}
      ref={yearOfEstimation}
      onChange={changeYearOfEstimationHandler}
    ></input>
  );
});
export default YearOfEstimation;
