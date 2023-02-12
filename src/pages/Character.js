import { useLocation } from "react-router-dom";
import ListOfComics from "../components/ListOfComics";

const Character = () => {
  const location = useLocation();

  const character = location.state.character;

  const sizeMaxPicture = "/portrait_fantastic.";
  //   const sizeMaxPicture = "/standard_fantastic.";

  return (
    <div className="character-page">
      <div className="container">
        <div className="character-detail">
          <img
            src={
              character.thumbnail.path +
              sizeMaxPicture +
              character.thumbnail.extension
            }
            alt="character"
          />
          <div>
            <div>
              <h2> {character.name} </h2>
            </div>
            {character.description && <p> Description</p>}
            <p className="character-description">{character.description}</p>
          </div>
        </div>
        <div className="details-comics">
          <p> Comics </p>
          <div className="character-right">
            <ListOfComics characterID={character._id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Character;
