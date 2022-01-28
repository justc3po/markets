import { useRef } from "react";
import { stocksActions } from "../../store/stock-slice";
import { useDispatch } from "react-redux";
import React from "react";

const Year3 = React.memo((props) => {
  const dispatch = useDispatch();
  const year3 = useRef();

  const changeYear3Handler = () => {
    const value = Number(year3.current.value);
    dispatch(
      stocksActions.updateProperty({
        ticker: props.ticker,
        propertyValue: value,
        propertyName: "year3",
      })
    );
    dispatch(stocksActions.calculateParameters(props.ticker));
  };

  return (
    <input
      key={`${props.ticker}/year3/innerdiv`}
      className="input"
      type="number"
      value={Number(props.year3?.toFixed(2))}
      ref={year3}
      onChange={changeYear3Handler}
    ></input>
  );
});
export default Year3;
