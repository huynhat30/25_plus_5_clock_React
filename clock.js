
const App = () => {
    const sessionT = 'Session'
    const breakT = 'Break'

    const [getBreakTime, setBreakTime] = React.useState(5)
    const [getSessionTime, setSessionTime] = React.useState(25)
    const [getTimerTime, setTimerTime] = React.useState(25*60)
    const [getTitle, setTitle] = React.useState(sessionT)
    const [onPlay, setOnPlay] = React.useState(false);

    const title = getTitle === sessionT ? sessionT : breakT

    const varNameToString = (varObj) => {
        Object.keys(varObj)[0]
    }

    const setTimeFormat = (time) => {
        const mins = Math.floor(time/60);
        const secs = time % 60;
        return (mins < 10 ? '0' + mins : mins) + ":" + (secs < 10 ? '0' + secs : secs)
    }

    const handleBreakUp = () => {
        if (getBreakTime < 60) {
            setBreakTime(getBreakTime + 1);
        }
    }

    const handleBreakDown = () => {
        if (getBreakTime > 1) {
            setBreakTime(getBreakTime - 1);
        }
    }

    const handleSessionUp = () => {
        if (getSessionTime < 60) {
            setSessionTime(getSessionTime + 1);
            setTimerTime(getSessionTime*60 + 60)
        }
    }

    const handleSessionDown = () => {
        if (getSessionTime > 1) {
            setSessionTime(getSessionTime - 1);
            setTimerTime(getSessionTime*60 - 60)
        }
    }

    function handleUp(lengthd){

            setTitle(varNameToString( {lengthd} ));
    }

    const timeout = setTimeout(() => {
        if(getTimerTime > 0 && onPlay) {
            setTimerTime(getTimerTime - 1)
        }
    }, 1000)

    const handlePlayStop = () => {
        clearTimeout(timeout)
        setOnPlay(!onPlay)
    }

    const handleReset = () => {
        clearTimeout(timeout)
        setOnPlay(false);
        setBreakTime(5);
        setSessionTime(25);
        setTimerTime(25*60);
        setTitle(sessionT);
        const audio = document.getElementById("beep");
        audio.pause()
        audio.currentTime = 0;
    }

    const resetTimer = () => {
        const audio = document.getElementById("beep");
        if(getTimerTime === 0 && getTitle === sessionT){
            setTimerTime(getBreakTime * 60)
            setTitle(breakT)
            audio.play()
        }
        if(getTimerTime === 0 && getTitle === breakT){
            setTimerTime(getSessionTime * 60)
            setTitle(sessionT)
            audio.pause()
            audio.currentTime = 0;
        }
      }
      
      const clock = () => {
        if(onPlay){
          timeout
          resetTimer()
        }else {
          clearTimeout(timeout)
        }
      }
      
      React.useEffect(() => {
        clock()
      }, [onPlay, getTimerTime, timeout])

    return (
        <div id="container">
            <div id="lengths">
                <div id="break-time">
                    <h3 id="break-label">Break Length</h3>
                    <button disabled={onPlay} id="break-decrement" onClick={handleBreakDown}>Down</button>
                    <strong id="break-length">{getBreakTime}</strong>
                    <button disabled={onPlay} id="break-increment" onClick={handleBreakUp}>Up</button>
                </div>
                <div id="between"></div>
                <div id="session-time">
                    <h3 id="session-label">Session Length</h3>
                    <button disabled={onPlay} id="session-decrement" onClick={handleSessionDown}>Down</button>
                    <strong id="session-length">{getSessionTime}</strong>
                    <button disabled={onPlay} id="session-increment" onClick={handleSessionUp}>Up</button>
                </div>
            </div>

            <div id="timer">
                <div className="display-time">
                    <h2 id="timer-label">{title}</h2>
                    <h3 id="time-left">{setTimeFormat(getTimerTime)}</h3>
                </div>
                <button id="start_stop" onClick={handlePlayStop}>Start/Stop</button>
                <button id="reset" onClick={handleReset}>Reset</button>
            </div>

            <audio id="beep" preload="auto"
                src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"/>
        <div id="footer">By <a href="https://github.com/huynhat30">Huy Giang <i class="fa fa-github"></i></a></div>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('app'));