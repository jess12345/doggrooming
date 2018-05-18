import { appointmentConstants } from '../_constants';

export function dogs(state = {}, action) {
  switch (action.type) {
    case appointmentConstants.DOG_VIEW:
      return {
        loading: true
      };
    case appointmentConstants.DOG_VIEW_SECCESS:
      return {
        items: action.dogs
      };
    case appointmentConstants.DOG_VIEW_FAILURE:
      return { 
        error: action.error
      };
    default:
      return state
  }
}