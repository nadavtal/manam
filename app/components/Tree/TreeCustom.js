import React, { memo, useRef, useMemo } from 'react';
import {
  MDBTreeview,
  MDBTreeviewList,
  MDBTreeviewItem,
  MDBSwitch,
  MDBSimpleChart,
} from 'mdbreact';
import IconButtonToolTip from '../IconButtonToolTip/IconButtonToolTip';
import AccordionTable from '../../containers/AccordionTable/AccordionTable';
import Form from '../../containers/Forms/Form';
import NodeRow from '../../containers/BridgePage/NodeRow/NodeRow';
import DataComponent from '../../components/DataComponent/DataComponent';
import styled from 'styled-components';
import { getAvgOfArray, caculateCompletedPercentage } from '../../utils/mathFunctions'
const TreeCustom = props => {
  console.log('Rendering TreeCustom', props);

  const handleClick = value => {
    console.log(value);
    // if (value) props.onClick(parseInt(value))
  };

  const getItems = (array, id, identifier) => {
    // console.log(array, id)
    return array.filter(item => item[identifier] == id);
  };

  const sortBy = (a, b, param) => {
    if (a[param] < b[param]) {
      return -1;
    }
    if (a[param] > b[param]) {
      return 1;
    }
    return 0;
  };
  const createTreeObj = () => {
    console.log('createTreeObj')
    let treeObj = {};
    props.data.level_1.sort(sortBy, 'id');
    props.data.level_1.map(span => {
      treeObj[span.name] = {
        span_id: span.id,
        elements: [],
        children: {},
        completed: []
      };
      props.data.level_2.map(group => {
        // console.log(group)
        treeObj[span.name].children[group.name] = {
          elements: [],
          children: {},
          completed: [],
        };
        props.data.level_3.map(type => {
          // console.log(type)
          if (type.structure_type_id) {
            if (
              type.structure_type_id === span.structure_type_id &&
              type.element_group_id == group.id
            ) {
              treeObj[span.name].children[group.name].children[
                `${type.element_code}-${type.name}`
              ] = {
                elements: [],
                children: [],
                completed: [],
              };
            }
          } else {
            if (type.element_group_id == group.id) {
              treeObj[span.name].children[group.name].children[
                `${type.element_code}-${type.name}`
              ] = {
                elements: [],
                children: [],
                completed: [],
              };
            }
          }
          // if (type.element_group_id == group.id) treeObj[span.name].children[group.name].children[type.name] = [];
          props.data.level_4.sort(sortBy, 'object_id');
          props.data.level_4.map(el => {
            if (
              el.element_group_id == group.id &&
              el.element_type_id == type.id &&
              el.span_id === span.id
            ) {
              // console.log(caculateCompletedPercentage(el));
              
              // console.log(treeObj[span.name].children[group.name].children);
              if (
                treeObj[span.name].children[group.name].children &&
                treeObj[span.name].children[group.name].children[
                  `${type.element_code}-${type.name}`
                ]
              ) {
                let completed = caculateCompletedPercentage(el)
                treeObj[span.name].children[group.name].children[
                  `${type.element_code}-${type.name}`
                ].children.push(el);
                treeObj[span.name].children[group.name].children[
                  `${type.element_code}-${type.name}`
                ].elements.push(parseInt(el.object_id));
                treeObj[span.name].children[group.name].children[
                  `${type.element_code}-${type.name}`
                ].completed.push(completed);

                treeObj[span.name].children[group.name].elements.push(
                  parseInt(el.object_id),
                );
                treeObj[span.name].children[group.name].completed.push(completed);
                treeObj[span.name].elements.push(parseInt(el.object_id));
                treeObj[span.name].completed.push(completed);

                // treeObj.completed.push(completed);
              }
            }
          });
        });
      });
    });
    // console.log(treeObj);
    return treeObj;
  };

  const addElementsSum = obj => {
    console.log(obj);
  };
  // const caculateCompletedPercentage = (el) => {
  //   // console.log(el)
  //   const keysNum = Object.keys(el).length
  //   let completed = 0;
  //   let avg
  //   for (const key of Object.keys(el)) {
  //     if(el[key]) completed++
  //   }
  //   avg = Math.ceil(completed/keysNum*100)
  //   return avg
  // }

  
  const treeObj = useMemo(() => createTreeObj(), [props.data]);



  const TreeRowWrapper = styled.span`
    width: 100%;
    text-align: center;
    align-items: center;
    display: flex;
    justify-content: space-between;
  `;
  const TreeRow = props => {
    // console.log(props)
    return (
      <TreeRowWrapper>
        <span>{props.children}</span>
        <span className="d-flex align-items-center">
          <span className="mr-1">
            <MDBSimpleChart
              strokeColor={
                props.avg == 100
                  ? 'green'
                  : 'red'
              }
              strokeWidth={1}
              width={22}
              height={22}
              percent={props.avg}
              labelFontWeight="normal"
              labelFontSize="8"
              labelColor={
                props.avg !== 100
                  ? 'red'
                  : 'green'
              }
              
            />

          </span>
          {props.showEdit && (
            <IconButtonToolTip
              iconName="edit"
              toolTipType="info"
              toolTipPosition="left"
              toolTipEffect="float"
              toolTipText={'Edit span'}
              className=""
              onClickFunction={() => props.editFunction()}
            />
          )}
          <IconButtonToolTip
            iconName="eye"
            toolTipType="info"
            toolTipPosition="left"
            toolTipEffect="float"
            toolTipText={'Show span Elements'}
            className=""
            onClickFunction={() => props.showElements()}
          />
        </span>
      </TreeRowWrapper>
    );
  };

  const showElements = elements => {
    console.log(elements);
  };
  return (
    <MDBTreeview
      theme="colorful"
      // header={props.header}
      className={props.className}
      // getValue={value => handleClick(parseInt(value.value))}
    >
      {Object.keys(treeObj).map((key, index) => {
        const span = treeObj[key];
        
        return (
          <MDBTreeviewList
            key={index}
            className=""
            // opened={selectedEls.length > 0}
            // icon='envelope-open'
            title={
              <TreeRow
                showEdit={true}
                showElements={() => props.showElements(span.elements)}
                editFunction={() => props.editElement('editSpan', span.span_id)}
                avg={getAvgOfArray(span.completed)}
              >
                {`${key} (${span.elements.length})`}
              </TreeRow>
            }
            // onClick={() => showElements(span.elements)}
            far
            open
          >
            {Object.keys(span.children).map((key, index) => {
              const group = span.children[key];
              // console.log(group)
              if (group.elements.length) {
                
                return (
                  <MDBTreeviewList
                    key={index}
                    title={
                      <TreeRow
                        showEdit={false}
                        showElements={() => props.showElements(group.elements)}
                        avg={getAvgOfArray(group.completed)}
                      >
                        {`${key} (${group.elements.length})`}
                      </TreeRow>
                    }
                    // opened={selected.length > 0}
                    // onClick={() => showElements(group.elements)}
                    far
                  >
                    {Object.keys(group.children).map((key, index) => {
                      const type = group.children[key];
                      
                      if (type.elements.length) {
                        // let averages = [];
                        // type.children.forEach(element => {
                        //   averages.push(caculateCompletedPercentage(element))
                        // });
                        // console.log(averages.reduce((a, b) => a + b, 0)/averages.length)

                        return (
                          <MDBTreeviewList
                            key={index}
                            title={
                              <TreeRow
                                showEdit={false}
                                avg={getAvgOfArray(type.children.map(el => caculateCompletedPercentage(el)))}
                                showElements={() =>
                                  props.showElements(type.elements)
                                }
                              >
                                {`${key} (${type.elements.length})`}
                              </TreeRow>
                            }
                            // icon='plus'
                            // opened={elements.length > 0}
                            far
                          >
                            <AccordionTable
                              data={type.children}
                              rows={type.children}
                              dataType="nodes"
                              onTitleClick={(id, selecteMultiple) =>
                                props.onClick(id, selecteMultiple)
                              }
                              onRowClick={(id, selecteMultiple) =>
                                props.onClick(id, selecteMultiple)
                              }
                              checkBox={true}
                              selectedObjectIds={props.selectedObjectIds}
                              selectNodesMode={props.selectNodesMode}
                              // updateResiumMode={(mode) => props.updateResiumMode(mode)}
                              editElement={objectId =>
                                props.editElement('editElement', objectId)
                              }
                              color="orange"
                              textColor="black"
                            />
                          </MDBTreeviewList>
                        );
                      }
                    })}
                  </MDBTreeviewList>
                );

              }
            })}
            {/* {console.log(spanElementsNum)} */}
          </MDBTreeviewList>
        );
      })}
    </MDBTreeview>
  );
};

export default memo(TreeCustom);
