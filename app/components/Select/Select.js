import React, { memo, useState } from "react";
import { MDBSelect } from "mdbreact";

const createSelectOptionsArray = (options, value, disabled) => {
  let array  
  if (typeof(options) === 'object'){    
    array = Object.keys(options).map(key => {
     return createSelectOption(options[key], value, disabled)
    })
  } else {
    array = options.map(option => {
      return createSelectOption(option, value, disabled)    
   })   
  } 
  return array
}

const createSelectOption = (option, value, disabled) => {
  console.log('createSelectOption - value: ', value, typeof(value))
  let name = '';

  if (option.first_name) {
    name = option.first_name + ' ' + option.last_name
  } else name = option.name
  
  let text = name;
  if (option.importance) {
    text = name + ' - ' + option.importance
  }
 
  return {
    text: text,
    value: option.id ? option.id : name,
    value: name,
    disabled: disabled
  }
}

const Select = ({options, label, value, onChange, disabled, className}) => {

  // const [selected, setSelected] = useState([])
  let optionsSelect
  
  optionsSelect = createSelectOptionsArray(options, value, disabled) 
  // console.log(typeof(options), options)

  const handleSelected = (event) => {
    console.log('handleSelected', event)
    if( event && event.length) {
      console.log('SELECT FIREeeeee', event[0], value)
      onChange(event[0])
    }
  }
  console.log('optionsSelect', optionsSelect)
  console.log('final value', value)
  return (

        <MDBSelect
          // search
          options={optionsSelect}
          selected={value}
          // label={value ? optionsSelect.find(option => option.value == value).text : label}
          label={label}
          className={className}
          getValue={event => handleSelected(event)}
          // getValue={(e) => {
          //   // console.log(typeof(e[0]), typeof(value))
          //   // console.log(e[0], value)
          //   if (e[0] && e[0] !== value) {
          //     // console.log('FIREEEEEEEEEE')
          //     onChange(e[0])
          //   }
          // }}
        />

    );
}

export default memo(Select);
