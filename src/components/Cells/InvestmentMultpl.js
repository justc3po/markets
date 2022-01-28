import React from "react";

const InvestmentMultpl = React.memo((props) => {
  return (
    <div
      className={`cell ${props.ivestmentMultpl > 3 && "green"}`}
      key={`${props.ticker}/investmentMultpl/innerdiv`}
    >
      <p>{props.ivestmentMultpl?.toFixed(2)}</p>
    </div>
  );
});
export default InvestmentMultpl;
