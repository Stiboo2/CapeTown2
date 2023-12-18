import classes from "./IdPhoto.module.css";
const IdPhoto = (props) => {
  const image = props.img;
  return (
    <div className={classes.idPhoto}>
      <article>
        <img src={image} alt="picture" className={classes["person_m-img"]} />
      </article>
    </div>
  );
};
export default IdPhoto;
