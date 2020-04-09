import React, { useState } from 'react';
import './App.css';
import generateWords from './utils/generateWords';
import useKeyPress from './hooks/useKeyPress';

const words = generateWords();

const App = () => {
  const [leftPadding, setLeftPadding] = useState(
    new Array(20).fill(' ').join('')
  );
  const [outgoingChars, setOutgoingChars] = useState('');
  const [currentChar, setCurrentChar] = useState(words.charAt(0));
  const [incomingChars, setIncomingChars] = useState(words.substr(1));

  // ----
  const [hasErr, setHasErr] = useState(false);
  // ----

  useKeyPress(key => {
    let updatedOutgoingChars = outgoingChars;
    let updatedIncomingChars = incomingChars;

    if (key === currentChar) {
      // -----
      setHasErr(false);
      // -----

      if (leftPadding.length > 0) {
        setLeftPadding(leftPadding.substring(1));
      }

      updatedOutgoingChars += currentChar;
      setOutgoingChars(updatedOutgoingChars);

      setCurrentChar(incomingChars.charAt(0));

      updatedIncomingChars = incomingChars.substring(1);
      if (updatedIncomingChars.split(' ').length < 10) {
        updatedIncomingChars += ' ' + generateWords();
      }
      setIncomingChars(updatedIncomingChars);
    }

    // ------
    // if (key !== currentChar) {
    //   setHasErr(true);
    //   if (leftPadding.length > 0) {
    //     setLeftPadding(leftPadding.substring(1));
    //   }

    //   updatedOutgoingChars += currentChar;
    //   setOutgoingChars(updatedOutgoingChars);

    //   setCurrentChar(incomingChars.charAt(0));

    //   updatedIncomingChars = incomingChars.substring(1);
    //   if (updatedIncomingChars.split(' ').length < 10) {
    //     updatedIncomingChars += ' ' + generateWords();
    //   }
    //   setIncomingChars(updatedIncomingChars);
    // }
    // -----

    //  ****
    if (key === 'Backspace') {
      if (updatedOutgoingChars.length !== 0) {
        setHasErr(false);
        let updatedLeftPadding = leftPadding;

        if (leftPadding.length > 0) {
          updatedLeftPadding += ' ';
          setLeftPadding(updatedLeftPadding);
        }
        const lastChar = updatedOutgoingChars.slice(-1);
        setOutgoingChars(updatedOutgoingChars.slice(0, -1));
        // setOutgoingChars(
        //   updatedOutgoingChars.substr(0, updatedOutgoingChars.length - 1)
        // );

        const currentCharr = currentChar;
        setCurrentChar(lastChar);

        updatedIncomingChars = currentCharr + incomingChars;
        setIncomingChars(updatedIncomingChars);
      }
    }
    //  ****
  });

  return (
    <div className='App'>
      <header className='App-header'>
        <p className='Character'>
          <span className={hasErr ? 'Character-err' : 'Character-out'}>
            {(leftPadding + outgoingChars).slice(-20)}
          </span>
          <span className='Character-current'>{currentChar}</span>
          <span>{incomingChars.substr(0, 20)}</span>
        </p>
      </header>
    </div>
  );
};

export default App;
