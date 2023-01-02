import React, {useState} from 'react';
import ReactPlayer from 'react-player';
const App = () => {
  const [url, setUrl] = useState('')

  return (
    <>
      <input onChange={(event) => setUrl(event.target.value) } />
      <ReactPlayer url={url} />
    </>
  )
}
export default App