import React from "react";

const EstimatedCAGR = React.memo((props) => {
  return (
    <div className="cell" key={`${props.ticker}/estimatedCAGR/innerdiv`}>
      <p>{`${props.estimatedCAGR?.toFixed(0)} %`}</p>
    </div>
  );
});
export default EstimatedCAGR;
