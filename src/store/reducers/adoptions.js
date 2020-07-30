import { AdoptionTypes } from "./actions";

const initialState = {
  adoptions: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case AdoptionTypes.ADOPT: {
      const { bread } = action.payload;
      const adoptions = state.adoptions;
      adoptions.push(bread);
      return {
        ...state,
        adoptions,
      };
    }
    case AdoptionTypes.REMOVE: {
      const { index } = action.payload;
      const adoptions = state.adoptions;
      adoptions.splice(index, 1);
      return {
        ...state,
        adoptions,
      };
    }
    default:
      return state;
  }
}
