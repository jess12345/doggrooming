import { userConstants, appointmentConstants } from '../_constants';
import { clientService, groomerService, dogService, appointmentService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const userActions = {
    login,
    logout,
    register,
    deleteUser
};

export const appointActions = {
    getAllAppointment,
};

function login(username, password, isGroomer = true) {
    return dispatch => {
        dispatch(request({ username }));

        var loginFun = isGroomer ? groomerService.loginGroomer : clientService.loginClient;

        loginFun(username, password)
            .then(
                user => { 
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout(isGroomer = false) {
    var logoutFun = isGroomer ? groomerService.logoutGroomer : clientService.logoutClient;
    logoutFun();
    return { type: userConstants.LOGOUT };
}

function register(user, isGroomer = false) {
    return dispatch => {
        dispatch(request(user));

        var register = isGroomer ? groomerService.addNewGroomer : clientService.addNewClient;
        register(user)
            .then(
                () => { 
                    dispatch(success());
                    history.push('/login');
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function deleteUser(id, isGroomer = false) {
    return dispatch => {
        dispatch(request(id));

        var deleteUser = isGroomer ? groomerService.deleteGroomer : clientService.deleteClient;
        deleteUser(id)
            .then(
                () => { 
                    dispatch(success(id));
                },
                error => {
                    dispatch(failure(id, error));
                }
            );
    };

    function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}

function getAllAppointment(groomerID, clientID) {
    return dispatch => {
        dispatch(request());

        appointmentService.getAllAppointment(groomerID, clientID)
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}
