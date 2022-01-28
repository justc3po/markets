import classes from "./Skeleton.module.css";

const Skeleton = () => {
  const divsArray = [];
  for (let i = 0; i < 25; i++) {
    divsArray.push(
      <div className={classes.skeletoncell} key={`skeletonCell/${i}`}>
        <div className={classes.skeletontext}></div>
      </div>
    );
  }
  console.log("Skeleton builded ", divsArray);
  return (
    <div className={classes.wrapper}>
      <div className={classes.skeletoncell}>
        <div className={classes.skeletonbutton}></div>
        <div className={classes.skeletonbutton}></div>
      </div>
      {divsArray}
    </div>
  );
};

export default Skeleton;
