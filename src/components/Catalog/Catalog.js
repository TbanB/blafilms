import { useState, useEffect } from 'react';
import '../../styles/Catalog.css';
import CatalogList from './CatalogList'
import { ReactComponent as ChevronLeft } from './../../chevron-left.svg';
import { ReactComponent as ChevronRight } from './../../chevron-right.svg';

const Catalog = (props) => {
  const [searchResult, setSearchResult] = useState();
  const [searchInput, setSearchInput] = useState('air');
  const [pageSelected, setpageSelected] = useState();
  const [loading, setloading] = useState(false);
  const apiPath = 'http://www.omdbapi.com/?apikey=a461e386';
  const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  };

  const createMovieQuery = (search, page) => {
    return apiPath + `&s=${search}&page=${page}`;
  }

  const sendRequest = async (search, page) => {
    setloading(true)
    let query = createMovieQuery(search, page)

    await fetch(query)
    .then((res) => res.json())
    .then((data) => {
      setSearchResult(data);
    })

    await sleep(800);
    setloading(false)
  }

  useEffect(() => {
    const search = async () => {
      if (!searchResult) {
        setloading(true)
        await sendRequest(searchInput, 1);
      }
    }

    search()
  })

  const handleClick = async () => {
    setloading(true);
    setpageSelected(1);
    await sendRequest(searchInput, 1);
  }

  const handleOnChange = (input) => {
    setSearchInput(input.target.value);
  }

  const handleChevronLeftClick = async (value) => {
    let lastPage = pageSelected === undefined ? 1 : pageSelected; 
    if (lastPage > 1 && lastPage < 100) {
      setloading(true);
      let newPage = lastPage - 1;
      setpageSelected(newPage);
      await sendRequest(searchInput, newPage);
    }
  }

  const handleChevronRightClick = async (value) => {
    let lastPage = pageSelected === undefined ? 1 : pageSelected; 
    if (lastPage >= 1 && lastPage <= 100) {
      setloading(true);
      let newPage = lastPage + 1;
      setpageSelected(newPage);
      await sendRequest(searchInput, newPage);
    }
  }

  const onFormSubmit = async (event) => {
    event.preventDefault();
    await sendRequest(searchInput, 1);
  }

  return (
    <div>
      <div className="nav">

        <form onSubmit={onFormSubmit} className="search">
          <input type="text" placeholder="Search..." onChange={handleOnChange} />
          <button type="submit" onClick={handleClick}>Search</button>
        </form>

      </div>
      <div className="search-results">
        <div className="chevron" onClick={handleChevronLeftClick}>
          <ChevronLeft />
        </div>
        <div className="search-results-list">
          <CatalogList isLoading={loading} itemList={searchResult}/>
        </div>
        <div className="chevron" onClick={handleChevronRightClick}>
          <ChevronRight />
        </div>
      </div>
    </div>
  )
}

export default Catalog
