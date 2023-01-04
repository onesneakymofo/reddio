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
  const [listing, setListing] = useState(null)
  const [subreddit, setSubreddit] = useState(subreddits[2])
  const [occurrence, setOccurrence] = useState(occurrences[2])
  const mediaRegex =  /https?:\/\/(?:www\.)?(?:youtube\.com|youtu\.be|soundcloud\.com)\//;

  const getListings = () => {
    fetch(`/reddit?occurrence=${occurrence}&subreddit=${subreddit}`)
    .then((response) => response.json())
    .then((data) => data['data']['children'].filter(listing => {
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
      <div class="flex flex-row h-screen text-white">
        <aside class="w-52 bg-zinc-800 overflow-y border-r border-zinc-700 h-screen">
          <div class="text-center border-b border-zinc-800 p-3">
            <h3>Reddio</h3>
            <i className="text-sm text-zinc-500">Curated by Redditors</i>
          </div>

          <div class="text-center border-y border-zinc-700 p-3">
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
          {
            subreddits.map((subreddit, index) => (
              <div className="p-2 text-neutral-400 text-sm">
                r/<button key={index} value={subreddit} onClick={()=> setSubreddit(subreddit)}>{subreddit}</button>
              </div>
            ))
          }

          <div className="fixed bottom-20 left-0 h-52 w-52">
            <ReactPlayer
            ref={playerRef}
            playing={playing}
            url={listing?.data?.url}
            muted={muted}
            width='100%'
            height='100%'
            onProgress={progressHandler}/>
          </div>
        </aside>
        <main class="p-3 flex-1 mx-auto flex flex-col w-full">
          <div class="w-full">
            <ul className="flex flex-col w-full">
              {
                listings.map((listing, index) => (
                  <li className="flex justify-between items-center flex-row p-3 gap-4">
                    {console.log(listing)}
                    <div className="flex-none">{index + 1}</div>
                    <div className="flex-none">{listing.data.score}</div>
                    <div className="flex-none"><img className="h-10 w-10" src={listing.data.thumbnail} /></div>
                    <div className="flex-1"><button onClick={() => setListing(listing)}>{listing['data']['title']}</button></div>
                  </li>
                ))
              }
            </ul>
          </div>
        </main>
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