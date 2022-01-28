import React from "react";

const WorstPS = React.memo((props) => {
  return (
    <div className="cell" key={`${props.ticker}/worstPS/innerdiv`}>
      <p>{props.worstPS?.toFixed(0)}</p>
    </div>
  );
});
export default WorstPS;
