import React from 'react';
import { MDBInput, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBDatePicker, MDBFileInput, MDBSelect,
  MDBSelectInput,
  MDBSelectOptions,
  MDBSelectOption   } from "mdbreact";
import './Input.css';
import Select from '../Select/Select'
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
      // inputElement = <MDBInput
      //                 value={props.value.value}
      //                 {...props.elementconfig}
      //                 className={props.invalid ? "is-invalid" : "is-valid"}
      //                 onChange={props.changed}

      //               >
      //                 <div className="valid-feedback">Looks good!</div>
      //                 <div className="invalid-feedback">{props.errMsg}</div>
      //               </MDBInput>

      inputElement =
        <MDBInput label={props.label}
        value={props.value}
        {...props.elementconfig}
        onChange={props.changed}
        className={props.invalid && props.shouldValidate ? "is-invalid" : "is-valid"}
        >
          {props.invalid && props.shouldValidate && props.touched ?
            <div className="invalid-feedback">{props.errMsg}</div>
             :
            <div className="valid-feedback"></div>
             }

        </MDBInput>
      break;
    case('select'):
    // console.log(props)
    let options = []

    props.elementconfig.options.map(option => {
      const selectValue = props.elementconfig.optionValueAttr ? option[props.elementconfig.optionValueAttr]: option.id;
      // console.log(selectValue)
      let selectOption = {

        name: option.name? option.name : option.first_name + ' ' + option.last_name,
        id: selectValue
      }
      options.push(selectOption)
    })
    // console.log(options)
    // console.log(props.elementconfig.options)
    inputElement = <Select
        options={options}
        value={props.value ? props.value : null}
        label={props.label}
        onChange={(event) => props.changed(event)}
        />
      // <MDBSelect
      //   key={props.label}
      //   // options={options}
      //   // label={props.label}
      //   selected={props.value}
      //   getValue={(event) => props.changed(event[0])}
      // />
      //  <MDBSelect color='primary'
      //     label={props.label}
      //     // selected={props.value}
      //     getValue={(event) => props.changed(event[0])}>
      //     <MDBSelectInput />
      //     <MDBSelectOptions>
      //       <MDBSelectOption disabled>
      //         select {props.label}
      //       </MDBSelectOption>
      //       {props.elementconfig.options.map((option, index) => {
      //         console.log(props.value)
      //         // console.log(typeof(option.id), typeof(props.value))
      //         console.log(option.id === props.value)
      //         return <MDBSelectOption
      //           key={index}
      //           checked={option.id === props.value}
      //           value={option.id }>
      //             {option.name? option.name : option.first_name + ' ' + option.last_name}
      //             </MDBSelectOption>
      //       })}

      //     </MDBSelectOptions>
      //   </MDBSelect>


      break;
    case('selectMultiple'):
      // console.log(props)
      if(props.elementconfig.options) {
        inputElement =
        <MDBSelect multiple color='primary'
          search
          label={props.label}
          getValue={(event) => props.changed(event)}>
          <MDBSelectInput />
          <MDBSelectOptions>
            <MDBSelectOption disabled>
              {props.label}
            </MDBSelectOption>
            {props.elementconfig.options.map(option => {
              return <MDBSelectOption key={option.id} value={option.id}>{option.name}</MDBSelectOption>
            })}

          </MDBSelectOptions>
        </MDBSelect>
        // inputElement = <div
        // {...props.elementconfig}
        // value={props.value}
        // onChange={props.changed}
        // className={inputClasses.join(' ')}
        // >
        //   {props.value.map(option => (

        //    <div key={option.valueId} className="d-flex align-items-center">
        //      <input type="radio"
        //        value={option.valueId}
        //      /><br />

        //      <label className="ml-1 mb-0">{option.value}</label>
        //    </div>
        //    //  <option key={option.value} value={option.value}>{option.displayValue}</option>
        //   ))}
        // </div>;

      } else {
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
