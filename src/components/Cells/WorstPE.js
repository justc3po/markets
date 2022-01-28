import { useRef } from "react";
import { stocksActions } from "../../store/stock-slice";
import { useDispatch } from "react-redux";
import React from "react";

const WorstPE = React.memo((props) => {
  const dispatch = useDispatch();
  const worstPE = useRef();

  const changeWorstPEHandler = () => {
    const value = Number(worstPE.current.value);
    dispatch(
      stocksActions.updateProperty({
        ticker: props.ticker,
        propertyValue: value,
        propertyName: "worstPE",
      })
    );
    dispatch(stocksActions.calculateParameters(props.ticker));
  };

  return (
    <input
      key={`${props.ticker}/worstPE/innerdiv`}
      className="input"
      type="number"
      value={Number(props.worstPE?.toFixed(0))}
      ref={worstPE}
      onChange={changeWorstPEHandler}
    ></input>
  );
});
export default WorstPE;
