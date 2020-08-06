import { Action } from "redux";

const OPEN_POPUP = 'OPEN_POPUP';
const CLOSE_POPUP = 'CLOSE_POPUP';

type OpenAction = Action<typeof OPEN_POPUP>;
type CloseAction = Action<typeof CLOSE_POPUP>;

export const openPopup = () => ({ type: OPEN_POPUP });

export const closePopup = () => ({ type: CLOSE_POPUP });

type PossibleActions = OpenAction | CloseAction;

const reducer = (status = false, action: PossibleActions) => {
  switch (action.type) {
    case OPEN_POPUP:
      return true;

    case CLOSE_POPUP:
      return false;

    default:
      return status;
  }
};

export default reducer;
