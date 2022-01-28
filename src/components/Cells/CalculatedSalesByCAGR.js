import React from "react";

const CalculatedSalesByCAGR = React.memo((props) => {
  return (
    <div
      className="cell"
      key={`${props.ticker}/calculatedSalesByCAGR/innerdiv`}
    >
      <p>{props.calculatedSalesByCAGR?.toFixed(2)} </p>
    </div>
  );
});
export default CalculatedSalesByCAGR;
