import React from "react";

const MarketCap = React.memo((props) => {
  return (
    <div className="cell" key={`${props.ticker}/marketCap/innerdiv`}>
      <p>{props.marketCap?.toFixed(2)}</p>
    </div>
  );
});
export default MarketCap;
