import { appointmentConstants } from '../_constants';

export function appointments(state = {}, action) {
  switch (action.type) {
    case appointmentConstants.APPOINTMENT_VIEW:
      return {
        loading: true
      };
    case appointmentConstants.APPOINTMENT_VIEW_SECCESS:
      return {
        items: action.appointments
      };
    case appointmentConstants.APPOINTMENT_VIEW_FAILURE:
      return { 
        error: action.error
      };
    case appointmentConstants.BREED_VIEW:
      return {
        loading: true
      };
    case appointmentConstants.BREED_VIEW_SECCESS:
      return {
        items: action.breeds
      };
    case appointmentConstants.BREED_VIEW_FAILURE:
      return { 
        error: action.error
      };
    case appointmentConstants.GROOMING_TYPE_VIEW:
      return {
        loading: true
      };
    case appointmentConstants.GROOMING_TYPE_VIEW_SECCESS:
      return {
        items: action.groomingTypes
      };
    case appointmentConstants.GROOMING_TYPE_VIEW_FAILURE:
      return { 
        error: action.error
      };
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
    case appointmentConstants.APPOINTMENT_DELETE:
      // add 'deleting:true' property to user being deleted
      // TODO
      return {/*
        ...state,
        items: state.items.map(user =>
          user.id === action.id
            ? { ...user, deleting: true }
            : user
        )*/
      };
    case appointmentConstants.APPOINTMENT_DELETE_SUCCESS:
      // remove deleted user from state
      return {/*
        items: state.items.filter(user => user.id !== action.id)*/
      };
    case appointmentConstants.APPOINTMENT_DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
      return {/*
        ...state,
        items: state.items.map(user => {
          if (user.id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...userCopy } = user;
            // return copy of user with 'deleteError:[error]' property
            return { ...userCopy, deleteError: action.error };
          }

          return user;
        })*/
      };
    default:
      return state
  }
}