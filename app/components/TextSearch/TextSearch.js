import React, { useState } from 'react';

// import TextField from 'components/base/TextField';

const WAIT_INTERVAL = 1000;
const ENTER_KEY = 13;

const TextSearch = (props) => {
  const [value, setValue] = useState(props.value);
  const timer = null;
  const handleKeyDown = (e) => {
    if (e.keyCode === ENTER_KEY) {
        triggerChange();
    }

  }
  const triggerChange = () => {
    // const value = this.state;

    props.onChange(value);
  }

  const handleChange = (value) => {
    clearTimeout(timer);

    setValue(value)

    timer = setTimeout(triggerChange, WAIT_INTERVAL);
}
  return (
    <input
        className={props.className}
        placeholder={"change percentage"}
        value={value}
        onChange={(value) => handleChange(value)}
        onKeyDown={(e) => handleKeyDown(e)}
    />
  )
}

export default TextSearch
