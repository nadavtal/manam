
import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectMarket = () =>
{

  return initialState
};

export const makeSelectMarket = () =>
  createSelector(
    selectMarket,
    marketState => marketState.market,
  );
export const makeSelectCategories = () =>
  createSelector(
    selectMarket,
    marketState => marketState.categories,
  );
export const makeSelectProjects = () =>
  createSelector(
    selectMarket,
    marketState => marketState.projects,
  );
export const makeSelectModels = () =>
  createSelector(
    selectMarket,
    marketState => marketState.models,
  );


