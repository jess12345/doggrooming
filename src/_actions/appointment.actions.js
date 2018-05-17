import { appointmentConstants } from '../_constants';
import { dogService, appointmentService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const appointmentActions = {
    getAllAppointment,
};

function getAllAppointment(userID, isGroomer) {
    return dispatch => {
        dispatch(request());
        var getAppointment = isGroomer ? appointmentService.getGroomerAppointment : appointmentService.getClientAppointment; 

        getAppointment(userID)
            .then(
                appointments => dispatch(success(appointments)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: appointmentConstants.APPOINTMENT_VIEW } }
    function success(appointments) {return { type: appointmentConstants.APPOINTMENT_VIEW_SECCESS, appointments } }
    function failure(error) { return { type: appointmentConstants.APPOINTMENT_VIEW_FAILURE, error } }
}

