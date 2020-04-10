import React, { useState } from 'react';
import './App.css';
import generateWords from './utils/generateWords';
import useKeyPress from './hooks/useKeyPress';

const words = generateWords();

const App = () => {
  // const [leftPadding, setLeftPadding] = useState(
  //   new Array(20).fill(' ').join('')
  // );
  // const [outgoingChars, setOutgoingChars] = useState('');
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
  // ----

  useKeyPress(key => {
    // let updatedOutgoingChars = outgoingChars;
    let updatedIncomingChars = incomingChars;

    // -----
    let newCurrentObj = currentObj;
    let newWordsArray = wordsArray;
    // -----

    if (key === currentChar) {
      // -----
      // setHasErr(false);
      // -----

      // if (leftPadding.length > 0) {
      //   setLeftPadding(leftPadding.substring(1));
      // }

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
        let newCurrentObj = currentObj;
        let newWordsArray = wordsArray;
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
      }
      // }
    }
    //  ****

    // ------
    // if (key !== currentChar) {
    else {
      // setHasErr(true);
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
    }
    // -----
  });

  let typed = [...wordsArray, currentObj].map(object => {
    if (object.hasErr === false) {
      return <span className='Character-out'>{object.strTyped}</span>;
    } else {
      return <span className='Character-err'>{object.strTyped}</span>;
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
      </header>
    </div>
  );
};

export default App;
