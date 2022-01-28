import React from "react";

const PE = React.memo((props) => {
  return (
    <div className="cell" key={`${props.ticker}/PE/innerdiv`}>
      <p>{props.PE?.toFixed(0)}</p>
    </div>
  );
});
export default PE;
