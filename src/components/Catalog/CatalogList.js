import '../../styles/Spinner.css';
import { CircularProgress } from '@material-ui/core';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import placeholderImg from './../../placeholder.png';

const CatalogList = (props) => {
  const searchResult = props.itemList;
  let elements = undefined;

  if (props.isLoading || searchResult === undefined) {
    elements = (
      <div className="centerSpinner">
        <CircularProgress 
        size={80}
        thickness={5}
        color="secondary"/>
      </div>
    )
  } else {
    try {
      elements = searchResult.Search.map(result => (
        <div key={result.imdbID} className="search-item">
          <img
            src={result.Poster === 'N/A' ? placeholderImg : result.Poster}
            alt="poster"
          />
          <div className="search-item-data">
            <div className="title">{result.Title}</div>
            <div className="meta">{`${result.Type} | ${result.Year}`}</div>
          </div>
        </div>
      ));
    } catch (e) {
      elements = (
        <div className="centerSpinner">
          <SentimentVeryDissatisfiedIcon style={{ fontSize: 70 }} /> <span style={{ fontSize: 30, margin: 40 }}>Sorry, I couldn't found any result</span>
        </div>
      );
    }
  }
  
  return elements  
}

export default CatalogList