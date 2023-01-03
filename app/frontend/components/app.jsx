import React, {useState} from 'react';
import ReactPlayer from 'react-player';
const App = ({subreddits, occurrences}) => {

  const [listings, setListings] = useState([])
  const [subreddit, setSubreddit] = useState(subreddits[0])
  const [occurrence, setOccurrence] = useState(occurrences[0])

  const getListings = () => {
    fetch(`/reddit?occurrence=${occurrence}&subreddit=${subreddit}`)
    .then((response) => response.json())
    .then((data) => console.log(data));
  }
  return (
    <>
      <select
        value={subreddit}
        onChange={(event) => {setSubreddit(event.target.value); getListings()}}>
        {
          subreddits.map((subreddit, index) => (
            <option key={index} value={subreddit}>{subreddit}</option>
          ))
        }
      </select>
      <select value={occurrence} onChange={(event) => {setOccurrence(event.target.value); getListings()} }>
        {
          occurrences.map((occurrence, index) => (
            <option key={index} value={occurrence}>{occurrence}</option>
          ))
        }
      </select>
      <ReactPlayer />
    </>
  )
}
export default App