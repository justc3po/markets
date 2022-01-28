import React from "react";
import classes from "./Row.module.css";
import Year1 from "./Cells/Year1";
import Year2 from "./Cells/Year2";
import Year3 from "./Cells/Year3";
import Year4 from "./Cells/Year4";
import Year5 from "./Cells/Year5";
import PS from "./Cells/PS";
import PE from "./Cells/PE";
import EstimatedCAGR from "./Cells/EstimatedCAGR";
import MarketCap from "./Cells/MarketCap";
import SharesOutstanding from "./Cells/SharesOutstanding";
import NetMargin from "./Cells/NetMargin";
import Sales from "./Cells/Sales";
import YearOfEstimation from "./Cells/YearOfEstimation";
import WorstPS from "./Cells/WorstPS";
import WorstPE from "./Cells/WorstPE";
import CalculatedSalesByCAGR from "./Cells/CalculatedSalesByCAGR";
import Buttons from "./Cells/Buttons";
import Dilution from "./Cells/Dilution";
import InvestmentYieldWorstCase from "./Cells/InvestmentYieldWorstCase";
import InvestmentMultpl from "./Cells/InvestmentMultpl";
import { Link } from "react-router-dom";

const Row = ({ stock: el }) => {
  return (
    <div className={classes.wrapper}>
      <Buttons key={`${el.ticker}/buttons`} ticker={el.ticker} />
      <div key={`${el.ticker}`} className="cell">
        <Link to={`/stock-detail/${el.ticker}`}>
          <p>{el.ticker}</p>
        </Link>
      </div>
      <div key={`${el.ticker}/price`} className="cell">
        <p>{Number(el.price?.toFixed(2))}</p>
      </div>
      <MarketCap key={`${el.ticker}/marketCap`} marketCap={el.marketCap} />
      <Sales key={`${el.ticker}/sales`} ticker={el.ticker} sales={el.sales} />
      <EstimatedCAGR
        key={`${el.ticker}/estimatedCAGR`}
        ticker={el.ticker}
        estimatedCAGR={el.estimatedCAGR}
      />
      <PS key={`${el.ticker}/PS`} PS={el.PS} />
      <PE key={`${el.ticker}/PE`} ticker={el.ticker} PE={el.PE} />
      <Dilution
        key={`${el.ticker}/dilution`}
        ticker={el.ticker}
        dilution={el.dilution}
      />
      <InvestmentMultpl
        key={`${el.ticker}/ivestmentMultpl`}
        ivestmentMultpl={el.ivestmentMultpl}
      />
      <InvestmentYieldWorstCase
        key={`${el.ticker}/investmentYieldWorstCase`}
        ticker={el.ticker}
        investmentYieldWorstCase={el.investmentYieldWorstCase}
      />
      <WorstPS
        key={`${el.ticker}/worstPS`}
        ticker={el.ticker}
        worstPS={el.worstPS}
      />
      <WorstPE
        key={`${el.ticker}/worstPE`}
        ticker={el.ticker}
        worstPE={el.worstPE}
      />
      <Year1 key={`${el.ticker}/year1`} ticker={el.ticker} year1={el.year1} />
      <Year2 key={`${el.ticker}/year2`} ticker={el.ticker} year2={el.year2} />
      <Year3 key={`${el.ticker}/year3`} ticker={el.ticker} year3={el.year3} />
      <Year4 key={`${el.ticker}/year4`} ticker={el.ticker} year4={el.year4} />
      <Year5 key={`${el.ticker}/year5`} ticker={el.ticker} year5={el.year5} />
      <CalculatedSalesByCAGR
        key={`${el.ticker}/calculatedSalesByCAGR`}
        ticker={el.ticker}
        calculatedSalesByCAGR={el.calculatedSalesByCAGR}
      />
      <div key={`${el.ticker}/investmentYieldOptimistic`} className="cell">
        <p>{el.investmentYieldOptimistic}</p>
      </div>
      <div key={`${el.ticker}/optimisticPS`} className="cell">
        <p>{el.optimisticPS}</p>
      </div>
      <div key={`${el.ticker}/optimisticPE`} className="cell">
        <p>{el.optimisticPE}</p>
      </div>
      <NetMargin
        key={`${el.ticker}/netMargin`}
        ticker={el.ticker}
        netMargin={el.netMargin}
      />
      <YearOfEstimation
        key={`${el.ticker}/yearOfEstimation`}
        ticker={el.ticker}
        yearOfEstimation={el.yearOfEstimation}
      />
      <SharesOutstanding
        key={`${el.ticker}/sharesOutstanding`}
        ticker={el.ticker}
        sharesOutstanding={el.sharesOutstanding}
      />
      <div key={`${el.ticker}/grossMargin`} className="cell">
        <p>{el.grossMargin}</p>
      </div>
    </div>
  );
};

export default React.memo(Row);
