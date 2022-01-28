import React from "react";

const InvestmentYieldWorstCase = React.memo((props) => {
  return (
    <div
      className={`cell ${props.investmentYieldWorstCase > 0 && "green"}`}
      key={`${props.ticker}/investmentYieldWorstCase/innerdiv`}
    >
      <p>{`${props.investmentYieldWorstCase?.toFixed(0)} %`}</p>
    </div>
  );
});
export default InvestmentYieldWorstCase;
