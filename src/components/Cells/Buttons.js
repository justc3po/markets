import { useDispatch } from "react-redux";
import {
  deleteStockFromDB,
  fetchOnly1StockPrice,
} from "../../store/stocks-actions";

const Buttons = (props) => {
  const dispatch = useDispatch();

  const onDeleteHandler = () => {
    dispatch(deleteStockFromDB(props.ticker));
  };

  const onPriceHandler = () => {
    dispatch(fetchOnly1StockPrice(props.ticker));
  };
  return (
    <div className="cell" key={`${props.ticker}/bittons/innerdiv`}>
      <button onClick={onPriceHandler}>Price</button>
      <button
        onClick={() =>
          window.confirm("Are you sure you wish to delete this item?") &&
          onDeleteHandler()
        }
      >
        Delete
      </button>
    </div>
  );
};

export default Buttons;
