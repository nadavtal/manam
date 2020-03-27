import React, { memo } from 'react';
import {
  MDBTreeview,
  MDBTreeviewList,
  MDBTreeviewItem,
  MDBSwitch
} from 'mdbreact';
import Form from '../../containers/Forms/Form'
const Tree = (props) => {
  // console.log(props);

  const handleClick = (value) => {
    // console.log(value)
    // if (value) props.onClick(parseInt(value))
  }

  const getElements = (array, id, identifier) => {
    // console.log(array, id)
    return array.filter(item => item[identifier] == id)
  }

  const treeArray = [
    [props.data.level_1],
    [props.data.level_2],
  ]
  return (
    <MDBTreeview
      theme='colorful'
      // header={props.header}
      className='fullWidth'
      getValue={value => handleClick(parseInt(value.value))}
    >
      {props.data.level_1.map(span => {
        return (
          <MDBTreeviewList
            key={span.id}
            // icon='envelope-open'
            title={span.name}
            far open>
            {props.data.level_2.map(group => {

              return  <MDBTreeviewList
                key={group.id}
                title={`${group.name} (${getElements(props.data.level_3, group.id, 'element_group_id').length})`}
                // icon='plus'
                far>
                {/* {console.log(getElements(props.data.level_3, group.id, 'element_group_id'))} */}
                {getElements(props.data.level_3, group.id, 'element_group_id')
                .map(type => {
                  if (getElements(props.data.level_4, type.id, 'element_type_id').length)
                    return  <MDBTreeviewList
                      key={type.id}
                      title={`${type.name} (${getElements(props.data.level_4, type.id, 'element_type_id').length})`}
                      // icon='plus'
                      far>
                      {getElements(props.data.level_4, type.id, 'element_type_id')
                      .map(el =>{
                          return  <MDBTreeviewItem
                          key={el.object_id}
                          icon="cube"
                          title={`Object Id: ${el.object_id}`}
                          onClick={() => props.onClick(el.object_id)}/>
                        })
                      }
                      </MDBTreeviewList>

                    })

                }
                </MDBTreeviewList>

              })
            }
          </MDBTreeviewList>

        )
      })}
      {/* <MDBTreeviewList icon='envelope-open' title='Mail' far open>
        <MDBTreeviewItem icon='address-book' title='Contact' far />
        <MDBTreeviewItem icon='bell' title='Offer' far />
        <MDBTreeviewList icon='calendar' title='Calendar' far open>
          <MDBTreeviewItem icon='clock' title='Deadlines' far />
          <MDBTreeviewItem icon='users' title='Meetings' opened />
          <MDBTreeviewItem icon='basketball-ball' title='Workouts' />
          <MDBTreeviewItem icon='mug-hot' title='Events' />
        </MDBTreeviewList>
      </MDBTreeviewList>
      <MDBTreeviewList title='Inbox' far>
        <MDBTreeviewItem title='Admin' far />
        <MDBTreeviewItem title='Corporate' far />
        <MDBTreeviewItem title='Finance' far />
        <MDBTreeviewItem title='Other' far />
      </MDBTreeviewList>
      <MDBTreeviewList icon='gem' title='Favourites' far>
        <MDBTreeviewItem icon='pepper-hot' title='Restaurants' />
        <MDBTreeviewItem icon='eye' title='Places' far />
        <MDBTreeviewItem icon='gamepad' title='Games' />
        <MDBTreeviewItem icon='cocktail' title='Cocktails' />
        <MDBTreeviewItem icon='pizza-slice' title='Food' />
      </MDBTreeviewList>
      <MDBTreeviewItem icon='comment' title='Notes' far />
      <MDBTreeviewItem icon='cog' title='Settings' />
      <MDBTreeviewItem icon='desktop' title='Devices' />
      <MDBTreeviewItem icon='trash-alt' title='Deleted items' /> */}
    </MDBTreeview>
  )
}

export default memo(Tree)

