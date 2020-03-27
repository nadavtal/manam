import React, { Component } from "react";
import { MDBSelect } from "mdbreact";

const Select = ({options, label, value, onChange}) => {
  // console.log(options)
  const optionsSelect = options.map(option => {
    return {
      text: option.importance ? option.name + ' - ' + option.importance : option.name,
      value: option.id,
      checked: option.id == value
    }
  })

  return (
      <div>
        <MDBSelect
          // search
          options={optionsSelect}
          selected="Choose your option"
          label={label}
          // getTextContent={(value) => console.log(value)}
          getValue={(e) => {
            // console.log(typeof(e[0]), typeof(value))
            console.log(e[0], value)
            if (e[0] && e[0] !== value) {
              console.log('FIREEEEEEEEEE')
              onChange(e[0])
            }
          }}
        />
      </div>
    );
}

export default Select;
