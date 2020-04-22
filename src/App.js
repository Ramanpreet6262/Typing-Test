import React, { useState, useEffect } from 'react';
import './App.css';
import generateWords from './utils/generateWords';
import useKeyPress from './hooks/useKeyPress';
import currentTime from './utils/time';
import ResultModal from './Components/Modal/Modal';
import UIfx from 'uifx';
import keyPressAudio from './keypress.mp3';

const keyAudio = new UIfx(keyPressAudio);

const words = generateWords();

const App = () => {
  // const [leftPadding, setLeftPadding] = useState(
  //   new Array(20).fill(' ').join('')
  // );
  // const [outgoingChars, setOutgoingChars] = useState('');
  let timeInterval = null;
  const [currentChar, setCurrentChar] = useState(words.charAt(0));
  const [incomingChars, setIncomingChars] = useState(words.substr(1));

  // ----
  // const [hasErr, setHasErr] = useState(false);
  const [wordsArray, setWordsArray] = useState([]);
  const [currentObj, setCurrentObj] = useState({
    strTyped: '',
    hasErr: false
  });
  const [totalTypedChars, setTotalTypedChars] = useState(0);
  const [correctTypedChars, setCorrectTypedChars] = useState(0);
  const [startTime, setStartTime] = useState();
  const [incorrectWords, setIncorrectWords] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [isWordCorrect, setIsWordCorrect] = useState(true);
  // const [timer, setTimer] = useState(60);
  const [timer, setTimer] = useState(10);
  const [isTimeFinished, setIsTimeFinished] = useState(false);
  const [showResultModal, setShowResultModal] = useState(true);
  // ----

  useKeyPress(key => {
    let updatedIncomingChars = incomingChars;

    // -----
    let newCurrentObj = currentObj;
    let newWordsArray = wordsArray;

    if (!startTime) {
      setStartTime(currentTime());
      startTimer();
    }
    // -----

    if (!isTimeFinished) {
      if (key === currentChar) {
        // -----
        // -----

        // if (leftPadding.length > 0) {
        //   setLeftPadding(leftPadding.substring(1));
        // }

        keyAudio.setVolume(0.4).play();
        // ----
        if (currentObj.hasErr === false) {
          newCurrentObj.strTyped += currentChar;
          setCurrentObj(newCurrentObj);
        } else if (currentObj.hasErr === true) {
          newWordsArray.push(newCurrentObj);
          setWordsArray(newWordsArray);
          newCurrentObj = {
            strTyped: currentChar,
            hasErr: false
          };
          setCurrentObj(newCurrentObj);
        }
        // ----
        // updatedOutgoingChars += currentChar;
        // setOutgoingChars(updatedOutgoingChars);

        setCurrentChar(incomingChars.charAt(0));

        updatedIncomingChars = incomingChars.substring(1);
        if (updatedIncomingChars.split(' ').length < 10) {
          updatedIncomingChars += ' ' + generateWords();
        }
        setIncomingChars(updatedIncomingChars);
        const updatedTotalTypedChars = totalTypedChars + 1;
        setTotalTypedChars(updatedTotalTypedChars);
        const updatedCorrectTypedChars = correctTypedChars + 1;
        setCorrectTypedChars(updatedCorrectTypedChars);
        if (incomingChars.charAt(0) === ' ') {
          if (isWordCorrect) {
            setWordCount(wordCount + 1);
          }
          setCurrentIndex(currentIndex + 1);
          setIsWordCorrect(true);
        }
      }

      //  ****
      else if (key === 'Backspace') {
        // if (updatedOutgoingChars.length !== 0) {
        // setHasErr(false);
        // let updatedLeftPadding = leftPadding;

        // if (leftPadding.length > 0) {
        //   updatedLeftPadding += ' ';
        //   setLeftPadding(updatedLeftPadding);
        // }
        // const lastChar = updatedOutgoingChars.slice(-1);
        // setOutgoingChars(updatedOutgoingChars.slice(0, -1));
        // setOutgoingChars(
        //   updatedOutgoingChars.substr(0, updatedOutgoingChars.length - 1)
        // );

        if (currentObj.strTyped.length > 0) {
          keyAudio.setVolume(0.4).play();

          let newCurrentObj = currentObj;
          let newWordsArray = wordsArray;
          let newIsWordCorrect = isWordCorrect;
          let newCurrentIndex = currentIndex;

          if (newCurrentObj.hasErr === false) {
            const updatedCorrectTypedChars = correctTypedChars - 1;
            setCorrectTypedChars(updatedCorrectTypedChars);
          }
          let lastChar = newCurrentObj.strTyped.slice(-1);

          let newStr = newCurrentObj.strTyped.substr(
            0,
            currentObj.strTyped.length - 1
          );

          if (newStr.length === 0 && newWordsArray.length !== 0) {
            let newObj = newWordsArray.pop();
            setCurrentObj(newObj);
            setWordsArray(newWordsArray);
          } else {
            setCurrentObj({
              ...currentObj,
              strTyped: newStr
            });
          }

          const currentCharr = currentChar;
          setCurrentChar(lastChar);

          updatedIncomingChars = currentCharr + incomingChars;
          setIncomingChars(updatedIncomingChars);
          const updatedTotalTypedChars = totalTypedChars - 1;
          setTotalTypedChars(updatedTotalTypedChars);
          if (currentCharr === ' ') {
            newCurrentIndex = currentIndex - 1;
            setCurrentIndex(newCurrentIndex);
            if (
              incorrectWords[newCurrentIndex] &&
              incorrectWords[newCurrentIndex].length > 0
            ) {
              newIsWordCorrect = false;
              setIsWordCorrect(false);
            } else {
              newIsWordCorrect = true;
              setIsWordCorrect(true);
              setWordCount(wordCount - 1);
            }
          }
          if (!newIsWordCorrect) {
            let indexArr = incorrectWords[newCurrentIndex];
            if (indexArr.slice(-1) >= totalTypedChars - 1) {
              indexArr.pop();
              let newIncorrectWords = {
                ...incorrectWords
              };
              newIncorrectWords[newCurrentIndex] = indexArr;
              setIncorrectWords(newIncorrectWords);
            }
            if (indexArr.length === 0) {
              setIsWordCorrect(true);
            }
          }
        }
      } else {
        // if (leftPadding.length > 0) {
        //   setLeftPadding(leftPadding.substring(1));
        // }

        // updatedOutgoingChars += currentChar;
        // setOutgoingChars(updatedOutgoingChars);
        let newCurrentObj = currentObj;
        let newWordsArray = wordsArray;

        if (currentObj.hasErr === true) {
          newCurrentObj.strTyped += currentChar;
          setCurrentObj(newCurrentObj);
        } else if (currentObj.hasErr === false) {
          newWordsArray.push(newCurrentObj);
          setWordsArray(newWordsArray);
          newCurrentObj = {
            strTyped: currentChar,
            hasErr: true
          };
          setCurrentObj(newCurrentObj);
        }

        setCurrentChar(incomingChars.charAt(0));

        updatedIncomingChars = incomingChars.substring(1);
        if (updatedIncomingChars.split(' ').length < 10) {
          updatedIncomingChars += ' ' + generateWords();
        }
        setIncomingChars(updatedIncomingChars);
        const updatedTotalTypedChars = totalTypedChars + 1;
        setTotalTypedChars(updatedTotalTypedChars);
        setIsWordCorrect(false);
        if (incorrectWords.hasOwnProperty(currentIndex)) {
          let arr = incorrectWords[currentIndex];
          arr.push(totalTypedChars);
          let newIncorrectWords = {
            ...incorrectWords
          };
          newIncorrectWords[currentIndex] = arr;
          setIncorrectWords(newIncorrectWords);
        } else {
          let newArr = [totalTypedChars];
          let newIncorrectWords = {
            ...incorrectWords
          };
          newIncorrectWords[currentIndex] = newArr;
          setIncorrectWords(newIncorrectWords);
        }
        if (incomingChars.charAt(0) === ' ') {
          setCurrentIndex(currentIndex + 1);
          setIsWordCorrect(true);
        }
      }
    }
  });

  useEffect(() => {
    return () => {
      if (timeInterval !== null) {
        clearInterval(timeInterval);
      }
    };
  });

  const startTimer = () => {
    let newTimer = timer;
    timeInterval = setInterval(() => {
      if (newTimer > 0) {
        newTimer -= 1;
        setTimer(newTimer);
        setIsTimeFinished(false);
      } else {
        clearInterval(timeInterval);
        showResult();
      }
    }, 1000);
  };

  const showResult = () => {
    setIsTimeFinished(true);
    setShowResultModal(true);
  };

  const handleModalClose = () => {
    setShowResultModal(false);
    resetSettings();
  };

  const resetSettings = () => {
    const newWords = generateWords();
    timeInterval = null;
    setCurrentChar(newWords.charAt(0));
    setIncomingChars(newWords.substr(1));
    setWordsArray([]);
    setCurrentObj({
      strTyped: '',
      hasErr: false
    });
    setTotalTypedChars(0);
    setCorrectTypedChars(0);
    setStartTime(null);
    setIncorrectWords({});
    setCurrentIndex(0);
    setWordCount(0);
    setIsWordCorrect(true);
    setTimer(10);
    setIsTimeFinished(false);
  };

  const getTimeDur = () => {
    if (!isTimeFinished) {
      return (currentTime() - startTime) / 60000.0;
    } else {
      return 10 / 60.0;
    }
  };

  let typed = [...wordsArray, currentObj].map((object, index) => {
    if (object.hasErr === false) {
      return (
        <span className='Character-out' key={index}>
          {object.strTyped}
        </span>
      );
    } else {
      return (
        <span className='Character-err' key={index}>
          {object.strTyped}
        </span>
      );
    }
  });

  return (
    <div className='App'>
      <header className='App-header'>
        <p className='Character'>
          {/* <span className={hasErr ? 'Character-err' : 'Character-out'}>
            {(leftPadding + outgoingChars).slice(-20)}
          </span> */}
          {/* {hasErr ? (
            <>
              <span className='Character-out'>
                {(leftPadding + outgoingChars).substr(
                  0,
                  (leftPadding + outgoingChars).length - 1
                )}
              </span>
              <span className='Character-err'>
                {(leftPadding + outgoingChars).slice(-1)}
              </span>
            </>
          ) : (
            <span className='Character-out'>
              {(leftPadding + outgoingChars).slice(-20)}
            </span>
          )} */}
          {typed}
          <span className='Character-current'>{currentChar}</span>
          <span>{incomingChars.substr(0, 20)}</span>
        </p>
        <h3>
          Timer:{' '}
          {timer <= 5 ? (
            <span className='red-timer'>{timer}sec</span>
          ) : (
            timer + 'sec'
          )}
        </h3>
        <h3>
          Errors: {totalTypedChars - correctTypedChars}/
          <span className='totalChars'>{totalTypedChars}</span> | Accuracy:{' '}
          {totalTypedChars === 0
            ? 0
            : ((correctTypedChars * 100) / totalTypedChars).toFixed(2)}
          %
        </h3>
        <h3>
          Speed=> CPM:{' '}
          {startTime ? (correctTypedChars / getTimeDur()).toFixed(0) : 0} | WPM:{' '}
          {startTime ? (wordCount / getTimeDur()).toFixed(0) : 0}
        </h3>
      </header>
      <ResultModal open={showResultModal} handleClose={handleModalClose}>
        <h1 className='result-heading'>
          Your typing speed is{' '}
          <span className='result-wpm'>
            {startTime ? (wordCount / getTimeDur()).toFixed(0) : 0}WPM
          </span>
        </h1>
        <div className='result-typingspeed'>
          <p className='typing-speed-heading'>Typing Speed</p>
          <p className='typing-speed-content'>
            {startTime ? (correctTypedChars / getTimeDur()).toFixed(0) : 0}
            <span className='unfocused-content'>CPM</span> |{' '}
            {startTime ? (wordCount / getTimeDur()).toFixed(0) : 0}
            <span className='unfocused-content'>WPM</span>
          </p>
        </div>
        <div className='result-accuracy'>
          <p className='accuracy-heading'>Accuracy</p>
          <p className='accuracy-content'>
            {totalTypedChars === 0
              ? 0
              : ((correctTypedChars * 100) / totalTypedChars).toFixed(2)}
            <span className='unfocused-content'>%</span>
          </p>
        </div>
      </ResultModal>
    </div>
  );
};

export default App;
