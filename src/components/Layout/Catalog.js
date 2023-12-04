import classes from "./Catalog.module.css";
const Catalog = ({ categories, filterItems }) => {
  return (
    <div className={classes.btnContainerSc}>
      {categories.map((category, index) => {
        return (
          <button
            type="button"
            className={classes.filterBtn}
            key={index}
            onClick={() => filterItems(category)}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
};

export default Catalog;
