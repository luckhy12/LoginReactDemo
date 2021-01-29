import React, { useState } from 'react'
import unsplash from '../api/unsplash'
import SearchBar from './SearchBar'
import ImageList from './ImageList'
import ImageCard from './ImageCard'


function App(props) {
  const [images, setImages] = useState([]);

  const onSubmit = async (term) => {
    const response = await unsplash.get('/search/photos', {
      params: { query: term }
    });

    setImages(response.data.results)
  }

  return (
    <div className="ui container">
      {props.token ? <React.Fragment>
        <SearchBar onSubmit={onSubmit} />
      <ImageList>
        {
          images.map(image =>
            <ImageCard key={image.id} image={image} />)
        }
      </ImageList>
      </React.Fragment>: <p>You not logged in</p>}
      
    </div>
  )
}
export default App;
