import { useRef } from "react";
import { stocksActions } from "../../store/stock-slice";
import { useDispatch } from "react-redux";
import React from "react";

const Year1 = React.memo((props) => {
  const dispatch = useDispatch();
  const year1 = useRef();

  const changeYear1Handler = () => {
    const value = Number(year1.current.value);
    dispatch(
      stocksActions.updateProperty({
        ticker: props.ticker,
        propertyValue: value,
        propertyName: "year1",
      })
    );
    dispatch(stocksActions.calculateParameters(props.ticker));
  };

  return (
    <input
      key={`${props.ticker}/year1/innerdiv`}
      className="input"
      type="number"
      value={Number(props.year1?.toFixed(2))}
      ref={year1}
      onChange={changeYear1Handler}
    ></input>
  );
});
export default Year1;
