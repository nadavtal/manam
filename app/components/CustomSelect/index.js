import React, { useState, memo, useEffect } from "react";
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

const createSelectOption = (option, incomingValue, disabled) => {
  // console.log('createSelectOption: ', incomingValue, option)
  let name = '';

  if (option.first_name) {
    name = option.first_name + ' ' + option.last_name
  } else name = option.name
  
  let text = name;
  if (option.importance) {
    text = name + ' - ' + option.importance
  }
  let val;
  let checked
  if ( option.id ) {
    val = JSON.stringify(option.id)
    // if (typeof(incomingValue) =='object') {
    //   checked = incomingValue.includes(option.id) 
    // } else checked = incomingValue == val
  }
  else if (option.user_id) {
    val = JSON.stringify(option.user_id)
    // if (typeof(incomingValue) =='object') {
    //   checked = incomingValue.includes(option.user_id) 
    // } else checked = incomingValue == val
  }
  else {
    val = text
  }
  if (typeof(incomingValue) == 'object') {
    checked = incomingValue.includes(val)
  } else 
  checked = incomingValue == val 
  // console.log(checked)
  return {
    text: text,
    value: val,
    checked: checked,
    // value: name,
    disabled: disabled
  }
}


const CustomSelect = ({options, label, multiple, search, onChange, value}) => {
  // console.log(options)
  
  let selectOptions = createSelectOptionsArray(options, value)
  // console.log(selectOptions)
  
  const handleSelected = (event) => {
    if (event.length) {
      console.log('handleSelected event', event, typeof(event))
      console.log('handleSelected value', value, typeof(value))
      if (!multiple) {
        if (event[0] != value) {
          console.log('FIRE NON MULTIPLE')
          onChange(+event)
        }
      } else {
        // console.log(value)
        // if (value && !value.includes(+event)) {
        console.log('value != event', JSON.stringify(value) === JSON.stringify(event) )
        if (JSON.stringify(value) != JSON.stringify(event)) {
          console.log('FIRE MULTIPLE')
          onChange(event)
        }
      }

    }
    // console.log('event.length', event.length)
    // console.log(value.includes(event[0]))
    // console.log(event[event.length-1] !== value[0])
    // if( event && event.length && event[0] !== value && !value.includes(event[0])) {
    //   console.log('SELECT FIREeeeee', event, value);
    //   onChange(event[0])
      
    // }
  }
  return (
    <div>
      <MDBSelect
        // searchId={'akdajhskdjahsd'}
        search={search}
        multiple={multiple}
        options={selectOptions}
        selected="Choose your option"
        label={label}
        getValue={event => handleSelected(event)}
      />
    </div>
  );
}

export default memo(CustomSelect);