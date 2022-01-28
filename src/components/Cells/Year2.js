import { useRef } from "react";
import { stocksActions } from "../../store/stock-slice";
import { useDispatch } from "react-redux";
import React from "react";

const Year2 = React.memo((props) => {
  const dispatch = useDispatch();
  const year2 = useRef();

  const changeYear2Handler = () => {
    const value = Number(year2.current.value);
    dispatch(
      stocksActions.updateProperty({
        ticker: props.ticker,
        propertyValue: value,
        propertyName: "year2",
      })
    );
    dispatch(stocksActions.calculateParameters(props.ticker));
  };

  return (
    <input
      key={`${props.ticker}/year2/innerdiv`}
      className="input"
      type="number"
      value={Number(props.year2?.toFixed(2))}
      ref={year2}
      onChange={changeYear2Handler}
    ></input>
  );
});
export default Year2;
