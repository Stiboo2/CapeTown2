import classes from "./IdPhotoRound.module.css";
const IdPhotoRound = (props) => {
  const image = props.img;
  return (
    <div className={classes.idPhoto}>
      <article>
        <img src={image} alt="picture" className={classes["person_m-img"]} />
      </article>
    </div>
  );
};
export default IdPhotoRound;
