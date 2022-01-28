import { useRef } from "react";
import { stocksActions } from "../../store/stock-slice";
import { useDispatch } from "react-redux";
import React from "react";

const SharesOutstanding = React.memo((props) => {
  const dispatch = useDispatch();
  const sharesOutstanding = useRef();

  const changeSharesOutstandingHandler = () => {
    const value = Number(sharesOutstanding.current.value);
    dispatch(
      stocksActions.updateProperty({
        ticker: props.ticker,
        propertyValue: value,
        propertyName: "sharesOutstanding",
      })
    );
    dispatch(stocksActions.calculateParameters(props.ticker));
  };

  return (
    <input
      key={`${props.ticker}/sharesOutstanding/innerdiv`}
      className="input"
      type="number"
      value={Number(props.sharesOutstanding?.toFixed(2))}
      ref={sharesOutstanding}
      onChange={changeSharesOutstandingHandler}
    ></input>
  );
});
export default SharesOutstanding;
