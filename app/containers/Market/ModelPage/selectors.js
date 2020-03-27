import { createSelector } from 'reselect';
import  {initialState}  from './reducer';
import _ from 'lodash'

const selectModelPage = state => state.modelPageReducer || initialState;



// export const getSelectedElements = createSelector(
//   [ elements, selectedObjectIds ],
//   (elements, selectedObjectIds) => elements.filter(el => selectedObjectIds.includes(parseInt(el.object_id))
//   )
// )


// export const makeSelectSelectedNodes = createSelector(
//   elements,
//     elements => elements,
//   );


