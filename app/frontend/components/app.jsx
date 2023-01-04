import React, {useState, useRef} from 'react';
import ReactPlayer from 'react-player';

const App = ({subreddits, occurrences}) => {

  const [videoState, setVideoState] = useState({
     playing: true,
     muted: false,
     volume: 0.5,
     played: 0,
     seeking: false,
     Buffer : true
   });


 const playerRef = useRef(null);

  const {playing, muted, volume, playbackRate, played, seeking, buffer} = videoState

  const [listings, setListings] = useState([])
  const [url, setUrl] = useState([])
  const [subreddit, setSubreddit] = useState(subreddits[0])
  const [occurrence, setOccurrence] = useState(occurrences[0])
  const mediaRegex =  /https?:\/\/(?:www\.)?(?:youtube\.com|youtu\.be|soundcloud\.com)\//;

  const getListings = () => {
    fetch(`/reddit?occurrence=${occurrence}&subreddit=${subreddit}`)
    .then((response) => response.json())
    .then((data) => data['data']['children'].filter(listing => {
      console.log(listing['data']['url'])
      return mediaRegex.test(listing['data']['url'])
    }))
    .then((filteredListings) => (
      setListings(filteredListings)
    ))
  }


  const handleRewind = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() - 15);
  }

  const handlePlayPause = () => {
    setVideoState({ ...videoState, playing: !playing })
  }

  const handleSeekMouseDown = (event) => {
    console.log('hey')
    setVideoState({ ...videoState, seeking: true })
  }

  const handleSeekChange = (event) => {
    console.log(event.target.value)
    setVideoState({ ...videoState, played: parseFloat(event.target.value) })
  }

  const progressHandler = (state) => {
  console.log(seeking)
   if (!seeking) {
    setVideoState({ ...videoState, ...state });
   }
 };

  const handleSeekMouseUp = (event) => {
    setVideoState({ ...videoState, seeking: false })
    playerRef.current.seekTo(parseFloat(event.target.value))
  }

  const formatTime = (time) => {
     //formarting duration of video
     if (isNaN(time)) {
       return "00:00";
     }

     const date = new Date(time * 1000);
     const hours = date.getUTCHours();
     const minutes = date.getUTCMinutes();
     const seconds = date.getUTCSeconds().toString().padStart(2, "0");
     if (hours) {
       //if video have hours
       return `${hours}:${minutes.toString().padStart(2, "0")} `;
     } else return `${minutes}:${seconds}`;
   }

  const PlayerApp = () => {
    console.log(played * 100)
    return (
      <>
        <div class="basis-1/3">

        </div>
        <div className=" basis-1/3 flex flex-col items-center w-full">
          <div className="flex flex-row items-center">
            <div class="text-xs mr-1 text-white">
              {formatTime(playerRef?.current?.getCurrentTime())}
            </div>

            <div class="grow bg-indigo-500 rounded-full h-1.5 w-80">
              <div class="bg-white h-1.5 rounded-full" style={{width: `${played * 100}%`}}></div>
            </div>
            <div class="text-xs ml-1 text-white">
              {formatTime(playerRef?.current?.getDuration())}
            </div>
          </div>
          <div class="text-white">
            <button onClick={()=> handleRewind() }>Rewind</button>
            <button onClick={()=> handlePlayPause() }>Play / Pause</button>
          </div>
        </div>
        <div class="basis-1/3">
          <div class="flex justify-end mr-2">
            <div class="bg-indigo-500 rounded-full h-1.5 w-28">
              <div class="bg-white h-1.5 rounded-full" style={{width: `${volume * 100}%`}}></div>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <div class="flex flex-col h-screen text-white">
        <main class="container flex-1 mx-auto flex flex-col">
          <div className="flex flex-col container max-w-md w-full items-center rounded-lg">

            <h3>Reddio</h3>
            <i className="text-sm text-zinc-500">Curated by Redditors</i>
            <div class="mb-3"></div>
            <div class="flex flex-row w-full justify-between mb-3">
              <div>
                r/<select
                  value={subreddit}
                  className="text-black"
                  onChange={(event) => {setSubreddit(event.target.value); getListings()}}>
                  {
                    subreddits.map((subreddit, index) => (
                      <option key={index} value={subreddit}>{subreddit}</option>
                    ))
                  }
                </select>
              </div>
              <div>
                Top of this &nbsp;
                <select
                  value={occurrence}
                  className="text-black"
                  onChange={(event) => {setOccurrence(event.target.value); getListings()} }>
                  {
                    occurrences.map((occurrence, index) => (
                      <option key={index} value={occurrence}>{occurrence}</option>
                    ))
                  }
                </select>
              </div>
            </div>
            <div>
              <ul className="flex flex-col w-full">
                {
                  listings.map((listing, index) => (
                    <li className="flex flex-row p-3">
                      <button onClick={() => setUrl(listing['data']['url'])}>{listing['data']['title']}</button>
                    </li>
                  ))
                }
              </ul>
            </div>
          </div>
        </main>
      </div>
      <div className="fixed bottom-20 left-0 h-52 w-52">
        <ReactPlayer
        ref={playerRef}
        playing={playing}
        url={url}
        muted={muted}
        width='100%'
        height='100%'
        onProgress={progressHandler}/>
      </div>
      <div class="fixed bottom-0 h-20 bg-indigo-700 w-full">
        <div className="flex justify-between items-center h-full w-50">
          <PlayerApp />
        </div>
      </div>
    </>
  )
}
export default App