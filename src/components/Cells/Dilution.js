import { useRef } from "react";
import { stocksActions } from "../../store/stock-slice";
import { useDispatch } from "react-redux";
import React from "react";

const Dilution = React.memo((props) => {
  const dispatch = useDispatch();
  const dilution = useRef();

  const changeDilutionHandler = () => {
    const value = Number(dilution.current.value);
    dispatch(
      stocksActions.updateProperty({
        ticker: props.ticker,
        propertyValue: value,
        propertyName: "dilution",
      })
    );
    dispatch(stocksActions.calculateParameters(props.ticker));
  };

  return (
    <input
      key={`${props.ticker}/dilution/innerdiv`}
      className="input"
      type="number"
      value={Number(props.dilution?.toFixed(2))}
      ref={dilution}
      onChange={changeDilutionHandler}
    ></input>
  );
});
export default Dilution;
