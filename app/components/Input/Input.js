import React from 'react';
import { MDBInput, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBDatePicker, MDBFileInput, MDBSelect,
  MDBSelectInput,
  MDBSelectOptions,
  MDBSelectOption   } from "mdbreact";
import './Input.css';
import Select from '../Select/Select';
import SelectMultiple from '../SelectMultiple';
import CustomSelect from '../CustomSelect';
const input = (props) => {
  // console.log(props)
  let inputElement = null;
  let inputClasses = []

  if(props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push('Invalid')
  }

  let validationError = null;
  if (props.invalid && props.touched) {
    // console.log(props.errMsg)
      validationError = <div className="invalid-feedback">'{props.errMsg}'</div>;
  }

  switch (props.elementtype) {
    case('input'):
    // console.log(props)
      // inputElement = <MDBInput
      //                 value={props.value.value}
      //                 {...props.elementconfig}
      //                 className={props.invalid ? "is-invalid" : "is-valid"}
      //                 onChange={props.changed}

      //               >
      //                 <div className="valid-feedback">Looks good!</div>
      //                 <div className="invalid-feedback">{props.errMsg}</div>
      //               </MDBInput>

      // console.log(props)
      inputElement =
        <MDBInput label={props.label}
        value={props.value}
        {...props.elementconfig}
        onChange={props.changed}
        className={props.invalid && props.shouldValidate ? "is-invalid" : "is-valid"}
        onBlur={(e) => props.onBlur(e)}>
          {props.invalid && props.shouldValidate && props.touched ?
            <div className="invalid-feedback">{props.errMsg}</div>
             :
            <div className="valid-feedback"></div>
             }

        </MDBInput>
      break;
    case('select'):
    
    // let options = []

    // props.elementconfig.options.map(option => {
    //   const selectValue = props.elementconfig.optionValueAttr ? option[props.elementconfig.optionValueAttr]: option.id;
    //   // console.log(selectValue)
    //   let selectOption = {

    //     name: option.name? option.name : option.first_name + ' ' + option.last_name,
    //     id: selectValue
    //   }
    //   options.push(selectOption)
    // })
    // console.log(options)
    // console.log('INPUT PROPS', props)    
    inputElement = <CustomSelect 
      label={props.label}
      multiple={props.elementconfig.multiple}
      search={props.elementconfig.search}
      options={props.elementconfig.options}
      value={props.value}
      onChange={(event) => props.changed(event)}
    />    

      break;
    case('selectMultiple'):
      console.log('selectMultiple', props)
      if(props.elementconfig.options) {
        inputElement = <SelectMultiple
        options={props.elementconfig.options}
        value={props.value}
        label={props.label}
        disabled={props.elementconfig.disabled}
        onChange={(event) => props.changed(event)}
        />

      } 
      else {
        inputElement = <div>no value in select</div>
      }
      break;
    case('date'):
      inputElement =
        <MDBDatePicker
           getValue={props.changed}
           value ={props.value}
          />

      break
    case('checkbox'):
      // console.log(props.value)
      inputElement =
        <MDBInput
        labelClass="mt-3"
        label= {props.label}
        filled
        type="checkbox"
        id={props.label}
        // value={props.value}
        checked={props.value}
        onChange={props.changed}
        />

      break
    case('file'):
      // console.log(props)
      inputElement =
        <MDBFileInput
        btnTitle= {props.label}
        textFieldTitle={"Upload image"}
        getValue={props.changed}
        />

      break

    default:
        inputElement = <MDBInput label={props.label}
        value={props.value}
        {...props.elementconfig}
        onChange={props.changed}
        className={props.invalid ? "is-invalid" : "is-valid"}/>
  }



  return (
    <div className="Input">
      {/* {props.label ? <label className="mr-2">{props.label}:</label> : ''} */}
      {inputElement}
      {/* {validationError} */}
    </div>
  )
}

export default input
