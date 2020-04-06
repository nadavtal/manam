import React, { useState, useEffect, memo } from 'react';
import Input from '../../components/Input/Input'
import Button from 'components/CustomButton/Button';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectRoles, makeSelectRoleTypes, makeSelectUsers, makeSelectProviders } from '../App/selectors';

import {
  MDBRow,
  MDBCol,
  MDBBtn
  } from 'mdbreact';
import './Forms.css';
import { forms } from './formsTemplates'

const form = (props) => {

  //SET FROM STATES
  const [formTypeState, setFormTypeState] = useState({});
  const [formIsValidState, setformIsValidState] = useState(false);
  let formElementArray = []
  // console.log(formTypeState)


  useEffect(() => {
    // console.log('FORM FIRST RENTER')
    // setFormTypeState(null)
    let form = {...forms[props.formType]}

    if (props.editMode !== 'create' && props.item) {

      form = insertItemInForm(form, props.item);
      // console.log(form)
      setformIsValidState(true)
    }
    // console.log(form)
    assignPropsToSelects(form)
    // console.log(form)
    setFormTypeState(form)

    // switch (props.formType) {
    //     case 'processTemaplateTaskForm':
    //       props.item.orderChanged == true? setformIsValidState(true): setformIsValidState(false);

    //     default:

    // };
    return () => {
      form = {...forms[props.formType]}
    };
  },[props]);

  // useEffect(() => {
  //   // console.log('formTypeState Changed', formTypeState)
  //   assignPropsToSelects(formTypeState)
  //   // formElementArray = [];
  //   setFormTypeState(formTypeState)


  // // console.log(formElementArray)
  // },[formTypeState]);
  // useEffect(() => {
  //   console.log('formElementArray Changed', formElementArray)

  // },[formElementArray]);
  const insertItemInForm = (form, item) => {
    // console.log('insertItemInForm', form)
    // console.log('insertItemInForm', item)
    // if(formTypeState.length) {
      const updatedForm = {
        ...form
      }
      // console.log(updatedForm)
      // console.log(item)
      // const formElementArray = [];
      for (let key in updatedForm) {
        // console.log(key, item[key])
        if (item[key]) {
          // console.log('FOUND', item[key])
          updatedForm[key].value = item[key] ? item[key] : ''
          updatedForm[key].valid = true
        // console.log(updatedForm[key])
        }
        // formElementArray.push({
        //   id: key,
        //   config: formTypeState[key]
        // })
      }
      // console.log(updatedForm);
      return updatedForm
      // setFormTypeState(updatedForm);
    // }



  }
  const assignPropsToSelects = (form) => {
    // console.log('assignPropsToSelects', form)
    // console.log('assignPropsToSelects', props)
    if(form) {
      if(form.user_id && props.users && props.users.length) {
        // console.log(form.user_id)
        form.user_id.elementConfig.options = props.users
      }
      if(form.project_manager_id && props.users && props.users.length) {
        // console.log(form.user_id)
        form.project_manager_id.elementConfig.options = props.users
      }
      if(form.provider_id && props.providers && props.providers.length) {
        // console.log(form.user_id)
        form.provider_id.elementConfig.options = props.providers
      }
      if(form.role && props.roleTypes && props.roleTypes.length) {
        // console.log(form.user_id)
        form.role.elementConfig.options = props.roleTypes
      }
      if(form.roles && props.roleTypes && props.roleTypes.length) {
        // console.log(form.user_id)
        form.roles.elementConfig.options = props.roleTypes
      }
      if(form.role_type_name && props.roleTypes && props.roleTypes.length) {
        // console.log(form.user_id)
        form.role_type_name.elementConfig.options = props.roleTypes
      }
      if (form.nodes && props.nodes && props.nodes.length) {
        // console.log(props.nodes)
        form.nodes.elementConfig.options = props.nodes
      }
      if (form.span_id && props.spans && props.spans.length) {
        // console.log(props.nodes)
        form.span_id.elementConfig.options = props.spans
      }
      if (form.structure_type_id && props.structureTypes) {
        // console.log(props.structureTypes)
        form.structure_type_id.elementConfig.options = props.structureTypes
      }
      if (form.element_group && props.elementsGroups) {
        // console.log(props.structureTypes)
        form.element_group.elementConfig.options = props.elementsGroups
      }
      if (form.element_group_id && props.elementsGroups) {
        // console.log(props.structureTypes)
        form.element_group_id.elementConfig.options = props.elementsGroups
      }
      if (form.element_type_id && props.elementsTypes) {
        // console.log('form.element_group', form.element_group_id.value)
        const types = props.elementsTypes.filter(type => type.element_group_id == form.element_group_id.value)
        // console.log(types)
        form.element_type_id.elementConfig.options = types
      }

    }
  }

  const inputChangedHandler = (event, inputIdetifier) => {
    // console.log('inputChangedHandler', event, inputIdetifier)
    // clone 1st order
    const updatedForm = {
      ...formTypeState
    }

    //clone 2st order
    const updatedFormElement = {
      ...updatedForm[inputIdetifier]
    }
    
    
    // console.log(updatedFormElement)
    if (updatedForm[inputIdetifier].elementType === 'selectMultiple'
        ||
        updatedForm[inputIdetifier].elementType === 'date'
        ||
        updatedForm[inputIdetifier].elementType === 'file'
        ||
        updatedForm[inputIdetifier].elementType === 'select'
        ) {

      updatedFormElement.value = event;
    // } else if (updatedForm[inputIdetifier].elementType === 'date') {
    //   updatedFormElement.value = event;
    // } else if (updatedForm[inputIdetifier].elementType === 'file') {
    //   // console.log(event, inputIdetifier);
    //   updatedFormElement.value = event;
    }
    else if (updatedForm[inputIdetifier].elementConfig.type === 'number') {
      // console.log(event, inputIdetifier);
      updatedFormElement.value = parseFloat(event.target.value);
    }
    else if (updatedForm[inputIdetifier].elementType === 'checkbox') {
      
      updatedFormElement.value = !updatedFormElement.value 
    }
    else {
      // console.log(event.target.value)
      updatedFormElement.value = event.target.value;
      // console.log(updatedFormElement)

    }

    if (inputIdetifier == "element_group_id") {
      console.log(props.elementsTypes)
      const types = props.elementsTypes.filter(type => type.element_group_id == event)
      updatedForm.element_type_id.elementConfig.options = types
      if (props.formType === 'elementForm') {
        updatedForm.primary_unit.value = '';
        updatedForm.secondary_unit.value = '';
        updatedForm.importance.value = '';
        updatedForm.detailed_evaluation_required.value = '';
        updatedForm.remarks.value = '';
      }

    }
    if (inputIdetifier == "element_type_id") {
      console.log(props.elementsTypes)
      const type = props.elementsTypes.find(type => type.id == event)
      console.log(props.formType)
      if (props.formType === 'elementForm') {
        updatedForm.primary_unit.value = type.primary_unit ? type.primary_unit : '';
        updatedForm.secondary_unit.value = type.secondary_unit ? type.secondary_unit : '';
        updatedForm.importance.value = type.importance ? type.importance : '';
        updatedForm.detailed_evaluation_required.value = type.detailed_evaluation_required ? type.detailed_evaluation_required : '';
        updatedForm.remarks.value = type.remarks ? type.remarks : '';

      }

    }

    // // check if valid
    if (updatedFormElement.validation) updatedFormElement.valid = checkValidity(updatedFormElement, inputIdetifier);
    // console.log(updatedFormElement)
    // update touched
    updatedFormElement.touched = true;

    updatedForm[inputIdetifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdetifier in updatedForm) {
      formIsValid = updatedForm[inputIdetifier].valid && formIsValid;

    }
    // console.log(updatedForm);
    // console.log('formIsValid', formIsValid);
    //update state
    setFormTypeState(updatedForm);
    setformIsValidState(formIsValid)


  }
  const submitForm = (event) => {
    // console.log(props.formType, props.editMode);
    event.preventDefault();
    const formData = {};
    for (let formElementIdentifier in formTypeState) {

      formData[formElementIdentifier] = formTypeState[formElementIdentifier].value;
    }

    switch (props.editMode) {

      // case 'edit':
      //   props.editFunction(formData, event);
      //   break
      // case 'save':
      //   props.editFunction(formData, event);
      //   break
      case 'create':
        console.log(formData)
        props.createFunction(formData, event);
        break
      default: props.editFunction(formData, event);
    }
    // console.log(formData)
    // switch (props.formType) {
    //   case 'BridgeInspectionForm':
    //     // console.log('BridgeInspectionForm');
    //     switch (props.editMode) {

    //       case 'edit':
    //         props.editFunction(formData);
    //       case 'create':
    //         props.createFunction(formData);
    //     }
    //     // formData.BID = props.survey.ID
    //     break
    //   case 'projectForm':
    //     // console.log('projectForm')
    //     switch (props.editMode) {

    //       case 'edit':
    //         props.editFunction(formData);
    //       case 'create':
    //         props.createFunction(formData);
    //     }
    //     break
    //   case 'processForm':
    //     // console.log('processForm')
    //     switch (props.editMode) {

    //       case 'edit':
    //         props.editFunction(formData);
    //       case 'create':
    //         props.createFunction(formData);
    //     }
    //     break
    //   case 'userLogin':

    //     props.createFunction(formData);
    //     break
    //   case 'userForm':
    //     switch (props.editMode) {

    //       case 'edit':
    //         props.editFunction(formData);
    //       case 'register':
    //         props.createFunction(formData);
    //     }
    //   case 'providerForm':
    //     switch (props.editMode) {

    //       case 'edit':
    //         props.editFunction(formData);
    //       case 'create':
    //         props.createFunction(formData, event);
    //     }
    //   case 'organizationForm':
    //     switch (props.editMode) {

    //       case 'edit':
    //         props.editFunction(formData);
    //       case 'create':
    //         props.createFunction(formData);
    //     }
    // }







    }
  const checkValidity = (formElement, inputIdetifier) => {
      // console.log('checkValidity', formElement, inputIdetifier);
      // console.log(typeof(formElement.value));
      let isValid = true;
      let errMsg
      if (formElement.validation.required) {

        // if(typeof(formElement.value) == 'number') isValid = formElement.value
        // isValid = formElement.value.trim() !== '' && isValid;
        isValid = formElement.value !== null && formElement.value !== false && isValid;
        formElement.errMsg = 'This field is required';
        // console.log(isValid);
        if (!isValid) return isValid
      };
      if (formElement.validation.unique) {
        isValid = formElement.value.trim() !== '' && isValid;
        formElement.errMsg = 'This user name is taken';
        if (!isValid) return isValid
      };
      if (formElement.validation.maxLength) {
        // console.log(formElement.value.toString().length)
        isValid = formElement.value.toString().length <= formElement.validation.maxLength && isValid;
        formElement.errMsg = 'this field is too long';
        console.log(isValid)
        if (!isValid) return isValid
      }
      if (formElement.validation.minLength) {
        console.log(formElement.value.toString().length)
        isValid = formElement.value.toString().length >= formElement.validation.minLength && isValid;
        formElement.errMsg = `'this field must be at least ${formElement.validation.minLength} figures'`;
        if (!isValid) return isValid
      }


      if (formElement.elementConfig.type === 'email') {
        isValid = validateEmail(formElement.value);
        // console.log(isValid)
        formElement.errMsg = 'Invalid email';
        if (!isValid) return isValid
      }
      if (formElement.elementConfig.type === 'tel') {
        // if(isNaN(formElement.value)) {
        //   isValid = false;
        //   formElement.errMsg = 'Only numbers and "-" are accepted';
        //   return isValid
        // }
        isValid = validatePhone(formElement.value);
        // console.log(isValid)
        formElement.errMsg = 'Phone must be structured [000]-[00]-[0000000]';
        if (!isValid) return isValid
      }

      if (formElement.label === 'Model path') {
        const fileTypes = ['json', 'glb', 'gltf']
        const extension = formElement.value.split('.').pop();
        if (!is_url(formElement.value)) {
          formElement.errMsg = 'The url is not a valid url';
          isValid = false
          return isValid
        }
        if (fileTypes.includes(extension)) {
          isValid = true;
          if (extension === 'json') {
            formTypeState.type.value = 'model';
            formTypeState.type.valid = true
          }
          else if (extension === 'glb' || extension === 'gltf') {
            formTypeState.type.value = 'cad';
            formTypeState.type.valid = true
          }
        } else {
          formElement.errMsg = 'File must be of type "json", "glb", "gltf"';
          isValid = false
        }

        if (isValid) {
          formTypeState.ion_id.valid = true
        }
        
        
      }
      if (formElement.label === 'ION ID') {
        if (formElement.valid) formTypeState.url.valid = true;
        else {
          if (!formTypeState.url.valid.length) formTypeState.url.valid = false
        }
      }
      if (formElement.label === 'Confirm password') {

        const password = formTypeState['password'].value
        const confirmPassword = formElement.value;
        if (password !== confirmPassword) {
          formElement.valid = false
          formElement.errMsg = 'Must match password'
          isValid = false
        }
      }
      return isValid
    }

  const validateEmail = (mail) =>
    {
     if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
      {
        return (true)
      }

        return (false)
    }
  const validatePhone = (phone) =>
    {
      // console.log(isNaN(phone))
     if (/[0-9]{3}-[0-9]{2}-[0-9]{7}/.test(phone))
      {
        return (true)
      }

        return (false)
    }
  const is_url = (str) => {
      const regexp =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
            if (regexp.test(str))
            {
              return true;
            }
            else
            {
              return false;
            }
    }

  // console.log('formTypeState on render', formTypeState);
  // console.log('props on render', props);
  for (let key in formTypeState) {

    formElementArray.push({
      id: key,
      config: formTypeState[key]
    })
  }
  // console.log(formElementArray)
  const formHtml = (
    <div className={props.className ? props.className : 'fullWidth'}>

      <MDBRow className="no-gutters">
        {/* {console.log(formElementArray, formTypeState)} */}
        {formElementArray.length && formElementArray.map(formElement => {
          // console.log(formElement.config.elementType)
          let colWidth = props.colWidth ? props.colWidth : 4
          if (formElement.config.elementConfig.type === 'textarea') {
            colWidth = colWidth * 2;
            // console.log(colWidth)
          }
          if (!formElement.config.hidden )
          return <MDBCol md={colWidth} className='px-2' key={formElement.id}>
                  <Input
                    label={formElement.config.label}
                    elementtype={formElement.config.elementType}
                    elementconfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    changed={(event) => inputChangedHandler(event, formElement.id)}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    errMsg={formElement.config.errMsg}
                  ></Input>
                </MDBCol>

        })}


      </MDBRow>
      <MDBBtn
        color={props.btnColor? props.btnColor : 'primary'}
        disabled={!formIsValidState}
        rounded
        className={['text-center float-right', props.className].join(' ')}
        onClick={(e) => submitForm(e)}>
          {props.editMode}
      </MDBBtn>
    </div>
  )
  return formHtml
}

const mapStateToProps = createStructuredSelector({
  users: makeSelectUsers(),
  roles: makeSelectRoles(),
  roleTypes: makeSelectRoleTypes(),
  providers: makeSelectProviders(),
});

export function mapDispatchToProps(dispatch) {
  return {

  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(form);


