import { Action } from "redux";

const SET_POPUP_ID = 'SET_POPUP_ID';
const DELETE_POPUP_ID = 'DELETE_POPUP_ID';

type SetPopupAction = Action<typeof SET_POPUP_ID> & {
  id: string;
};

type DeletePopupAction = Action<typeof DELETE_POPUP_ID>;

export const setPopupId = (id: string) => ({
  type: SET_POPUP_ID,
  id,
});

export const deletePopupId = () => ({ type: DELETE_POPUP_ID });

type PossibleActions = SetPopupAction | DeletePopupAction;

const reducer = (id = null as string | null, action: PossibleActions) => {
  switch (action.type) {
    case SET_POPUP_ID:
      return action.id;

    case DELETE_POPUP_ID:
      return null;

    default:
      return id;
  }
};

export default reducer;
