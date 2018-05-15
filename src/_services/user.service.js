import { authHeader, config } from '../_helpers';

export const groomerService = {
    getAllGroomer,
    getInfoOfGroomer,
    addNewGroomer,
    updateGroomer,
    loginGroomer,
    deleteGroomer,
    logoutGroomer
};

export const breedTypeService = {
    getAllBreed,
    getInfoOfBreed,
    addBreed,
    deleteBreed
};

export const groomingTypeService = {
    getAllGroomingType,
    getInfoOfGroomingType,
    AddGroomingType,
    deleteGroomingType
};


export const clientService = {
    getAllClientsInfo,
    getClientInfo,
    addNewClient,
    updateClient,
    loginClient,
    deleteClient,
    logoutClient
};

// Groomer request
function getAllGroomer() {
    return postRequest('/Groomer.svc/ViewAll')
}

function getInfoOfGroomer(index) {
    return postRequest('/Groomer.svc/View/' + index);
}

function addNewGroomer(firstName, lastName, email, password) {
    var groomerInfo = firstName + '/' + lastName + '/' + email + '/' + password;
    return postRequest('/Groomer.svc/Add/' + groomerInfo)
}

function updateGroomer( index, firstName, lastName, email, password) {
    var groomerInfo = firstName + '/' + lastName + '/' + email + '/' + password;
    return postRequest('/Groomer.svc/Update/' + index + '/'+ groomerInfo)
}

function loginGroomer(email, password) {
        const requestOptions = {
        method: 'GET',
    };

    return fetch(config.apiUrl + '/Groomer.svc/Authenticate/' + email + '/'+ password , requestOptions)
            .then(handleResponse, handleError)
            .then(user => {
            // login successful if there's a jwt token in the response
                if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('groomer', JSON.stringify(user));
                }

                return user;
        });
}

function deleteGroomer(index) {
    return postRequest('/Groomer.svc/Delete/' + index);
}

function logoutGroomer() {
    // remove user from local storage to log user out
    localStorage.removeItem('groomer');
}

//Breed

function getAllBreed() {
    return postRequest('/Breed.svc/ViewAll');
}

function getInfoOfBreed(index) {
    return postRequest('/Breed.svc/View/' + index);
}

function addBreed(name) {
    return postRequest('/Breed.svc/Add/' + name);
}

function deleteBreed(index) {
    return postRequest('/Breed.svc/Delete/' + index);
}

// Grooming type

function getAllGroomingType () {
    return postRequest('/GroomingType.svc/ViewAll');
}

function getInfoOfGroomingType (index) {
    return postRequest('/GroomingType.svc/View/' + index);
}

function AddGroomingType (name) {
    return postRequest('/GroomingType.svc/Add/' + name);
}

function deleteGroomingType (index) {
    return postRequest('/GroomingType.svc/Delete/' + index);
}

// client
function getAllClientsInfo() {
    return postRequest('/Client.svc/ViewAll');
}

function getClientInfo(index) {
    return postRequest('/Client.svc/View/' + index);
}

function addNewClient(firstname, surname, email, password, homeAddress, mobilePh, workPhone, homePhone) {
    var info = firstname + '/' + surname + '/' + email + '/' + password + '/' 
        + homeAddress + '/' + mobilePh + '/' + workPhone+ '/' + homePhone;
    return postRequest('/Client.svc/Add/' + info);
}

function updateClient(firstname, surname, email, password, homeAddress, mobilePh, workPhone, homePhone) {
    var info = firstname + '/' + surname + '/' + email + '/' + password + '/' 
        + homeAddress + '/' + mobilePh + '/' + workPhone+ '/' + homePhone;
    return postRequest('/Client.svc/Update/' + info);
}

function loginClient(email, password) {
    const requestOptions = {
        method: 'GET',
    };

    return fetch(config.apiUrl + '/Client.svc/Authenticate/' + email + '/'+ password , requestOptions)
            .then(handleResponse, handleError)
            .then(user => {
            // login successful if there's a jwt token in the response
                if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('client', JSON.stringify(user));
                }

                return user;
        });
}

function deleteClient(index) {
    return postRequest('/Client.svc/Delete/' + index);
}

function logoutClient() {
    // remove user from local storage to log user out
    localStorage.removeItem('client');
}

// 


function postRequest (info) {
    const requestOptions = {
        method: 'GET',
    };

    return fetch(config.apiUrl + info , requestOptions).then(handleResponse, handleError);
}

function handleResponse(response) {
    return new Promise((resolve, reject) => {
        if (response.ok) {
            // return json if it was returned in the response
            var contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                response.json().then(function(json) {
                    console.log(json);
                    resolve(json); 
                });
            } else {
                resolve();
            }
        } else {
            // return error message from response body
            response.text().then(text => reject(text));
        }
    });
}

function handleError(error) {
    return Promise.reject(error && error.message);
}