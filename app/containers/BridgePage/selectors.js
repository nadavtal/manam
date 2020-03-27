import { createSelector } from 'reselect';
import  {initialState}  from './reducer';
import _ from 'lodash'

const selectBridgePage = state => state.bridgePageReducer || initialState;




const elements = state => state.bridgePageReducer.bridgeElements || initialState.bridgeElements;
const elementsGroups = state => state.bridgePageReducer.elementsGroups || initialState.elementsGroups;
const elementsTypes = state => state.bridgePageReducer.elementsTypes || initialState.elementsTypes;
const bridge= state => state.bridgePageReducer.bridge || initialState.bridge;
const bridgeSpans= state => state.bridgePageReducer.bridgeSpans || initialState.bridgeSpans;
const bridgeModels= state => state.bridgePageReducer.bridgeModels || initialState.bridgeModels;
const selectedObjectIds = state => state.bridgePageReducer.selectedObjectIds || initialState.selectedObjectIds;
const mode = state => state.bridgePageReducer.mode || initialState.mode;


export const getSelectedElements = createSelector(
  [ elements, selectedObjectIds ],
  (elements, selectedObjectIds) => elements.filter(el => selectedObjectIds.includes(parseInt(el.object_id))
  )
)
export const getSelectedIdsString = createSelector(
  [ selectedObjectIds ],
  (selectedObjectIds) => {
    let string = ''
    selectedObjectIds.map((num, index) => string += selectedObjectIds.length - 1 == index ? `${num}` : `${num}, `)
    return string
  }
)
export const getElement = createSelector(
  [ elements, selectedObjectIds ],
  (elements, selectedObjectIds) => {

    return elements.find(el => el.object_id == selectedObjectIds[0])

  }
)

export const getUnAllocatedElements = createSelector(
  elements,
  elements => {

    return elements.filter(el => !el.span_id)

  }
)

export const makeSelectSelectedNodes = createSelector(
  elements,
    elements => elements,
  );

export const getBridgeElements = createSelector(
  elements,
  elements => elements,
);
export const getBridgeSpans = createSelector(
  bridgeSpans,
  bridgeSpans => bridgeSpans,
);
export const getBridgeModels = createSelector(
  bridgeModels,
  bridgeModels => bridgeModels,
);
export const getElementsGroups = createSelector(
  elementsGroups,
  elementsGroups => elementsGroups,
);
export const getElementsTypes = createSelector(
  elementsTypes,
  elementsTypes => elementsTypes,
);
export const getSelectedObjectIds = createSelector(
  selectedObjectIds,
  selectedObjectIds => selectedObjectIds,
);
export const getBridge = createSelector(
  bridge,
  bridge => bridge,
);
export const getMode = createSelector(
  mode,
  mode => mode,
);

// const makeSelectSelectedElements = (state) => {
//   console.log('makeSelectSelectedElements')
//   // console.log(selectedNodesSelector)
//   // console.log(elementsSelector)
//   return createSelector(
//     elementsSelector,
//     selectedNodesSelector,
//     (elementsSelector, selectedNodesSelector) => getSelectedElements(elementsSelector, selectedNodesSelector) //last argumaent is the function that has our selected logic
//   );
// }

// console.log(makeSelectSelectedElements())
const makeSelectBridge = () =>
  createSelector(
    selectBridgePage,
    bridgePageState => bridgePageState.bridge,
  );
const makeSelectBridgeUsers = () =>
  createSelector(
    selectBridgePage,
    bridgePageState => bridgePageState.bridgeUsers,
  );
const makeSelectBridgeTiles = () =>
  createSelector(
    selectBridgePage,
    bridgePageState => bridgePageState.bridgeTiles,
  );
const makeSelectBridgeModels = () =>
  createSelector(
    selectBridgePage,
    bridgePageState => bridgePageState.bridgeModels,
  );

// const makeSelectShowMessages = () =>
//   createSelector(
//     selectBridgePage,
//     bridgePageState => bridgePageState.showMessages,
//   );

// const makeSelectShowProjectForm = () =>
//   createSelector(
//     selectBridgePage,
//     bridgePageState => bridgePageState.showProjectForm,
//   );
// const makeSelectSecondaryViewComponent = () =>
//   createSelector(
//     selectBridgePage,
//     bridgePageState => bridgePageState.secondaryViewComponent,
//   );
// const makeSelectMainViewComponent = () =>
//   createSelector(
//     selectBridgePage,
//     bridgePageState => bridgePageState.mainViewComponent,
//   );
// export { selectBridgePage,
//          getBridge,
//          getSelectedElements,
//          getBridgeElements,
//          getElementsGroups,
//          makeSelectSelectedNodes,
//          makeSelectBridge,
//          makeSelectBridgeUsers,
//          makeSelectBridgeTiles,
//          makeSelectBridgeModels};
