import React from "react";

const PS = React.memo((props) => {
  return (
    <div className="cell" key={`${props.ticker}/PS/innerdiv`}>
      <p>{props.PS?.toFixed(0)}</p>
    </div>
  );
});
export default PS;
