import { useState, useEffect } from 'react';

const useKeyPress = callback => {
  // Here we are passing a callback method as parameter which is very important as our whole logic will
  // be in this callback method...
  const [keyPressed, setKeyPressed] = useState();

  useEffect(() => {
    // Method to handle event when a key is down.
    const downHandler = ({ key }) => {
      // To check whether it is a different key to prevent registering the same key stoke when the user holds
      // the key for too long. And also to check whether it is a single character key i.e. not CTRL, Shift,
      // Esc, Delete, Return, Arrow, etc.
      // And in this if callback exists, we are calling it and passing the key that is pressed as a parameter along with it..
      // Also checking for `Backspace` to provide backspace functionality in the app....
      if (keyPressed !== key && key.length === 1) {
        setKeyPressed(key);
        callback && callback(key);
      } else if (keyPressed !== key && key === 'Backspace') {
        setKeyPressed(key);
        callback && callback(key);
      }
    };

    // Method to handle event when a key is up.
    const upHandler = () => {
      setKeyPressed(null);
    };

    // Adding event listener for keydown and keyup
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);

    return () => {
      // removing event listener for keydown and keyup on component unmount
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  });
  return keyPressed;
};

export default useKeyPress;
