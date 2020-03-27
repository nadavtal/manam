import React from 'react';
import { MDBDataTable } from 'mdbreact';
import './Datatable.css';
import {tables} from '../../containers/TableFilters/tables'

const Datatable = (props) => {
  // console.log(props)
  let data = tables[props.dataType];
  // console.log(data)
  data.rows = props.data;

  data.rows.map((row, index) => {
    // console.log(row)
    row.clickEvent = () => {
      if (props.selectKey) props.onRowClick(row[props.selectKey])
      else if ( !row.id && !row.bid && row.name) props.onRowClick(row.name)
      else props.onRowClick(row.bid ? row.bid : row.id)



    }
  })
  // console.log(data)

  return (
    <MDBDataTable
      striped
      bordered
      small
      className={props.className}
      data={data}
      // responsiveSm={true}
      // displayEntries={false}
    />
  );
}

export default Datatable;
