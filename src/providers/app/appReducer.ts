import { ViewStateProps } from '@deck.gl/core/lib/deck';

import { Action, BBox } from '../../types';

export type AppState = {
  viewState: ViewStateProps;
  dragEnabled: boolean;
  bbox?: BBox;
};

export const initialAppState: AppState = {
  viewState: {
    longitude: -122.4,
    latitude: 37.74,
    zoom: 11,
    maxZoom: 20,
    pitch: 0,
    bearing: 0,
  },
  dragEnabled: false,
  bbox: undefined,
};

// Action types
const UPDATE_VIEW_STATE = 'UPDATE_VIEW_STATE';
const UPDATE_DRAG_ENABLED = 'UPDATE_DRAG_ENABLED';
const UPDATE_BBOX = 'UPDATE_BBOX';

// Actions
type UpdateViewStateCallback = (prev: ViewStateProps) => ViewStateProps;
export const updateViewState = (
  arg: ViewStateProps | UpdateViewStateCallback,
) => {
  return {
    type: UPDATE_VIEW_STATE,
    payload: arg,
  };
};

export const updateDragEnabled = (dragEnabled: boolean) => {
  return {
    type: UPDATE_DRAG_ENABLED,
    payload: dragEnabled,
  };
};

export const updateBBox = (bbox?: BBox) => {
  return {
    type: UPDATE_BBOX,
    payload: bbox,
  };
};

// Reducer
export const reducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case UPDATE_VIEW_STATE: {
      const viewState =
        typeof action.payload === 'function'
          ? (action.payload as UpdateViewStateCallback)(state.viewState)
          : (action.payload as ViewStateProps);

      return {
        ...state,
        viewState,
      };
    }

    case UPDATE_DRAG_ENABLED: {
      return {
        ...state,
        dragEnabled: action.payload,
      };
    }

    case UPDATE_BBOX: {
      return {
        ...state,
        bbox: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};
