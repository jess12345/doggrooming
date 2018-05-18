import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions, appointmentActions } from '../_actions';

class HomePage extends React.Component {

    componentDidMount() {
        let user = this.props.user;
        var isGroomer = user.IdGroomer !== undefined;
        var userID = !isGroomer ? user.IdClient: user.IdGroomer;
        this.props.dispatch(appointmentActions.getAllAppointment(userID, isGroomer));
        if (!isGroomer) {
          this.props.dispatch(appointmentActions.getAllBreed());
          this.props.dispatch(appointmentActions.getAllGroomingType());
          this.props.dispatch(appointmentActions.getAllDogs(userID));
        }
    }

    render() {
        const { user, appointments } = this.props;
        var isGroomer = user.IdGroomer !== undefined;
        return (
            <div className="col-md-6">
                <h1>Hi {user.FirstName}!</h1>
                <h3>All Appointment:</h3>
                {appointments.loading && <em>Loading Appointment...</em>}
                {appointments.error && <span className="text-danger">ERROR: {appointments.error}</span>}
                {appointments.items &&
                    <table className="table">
                    <thead>
                        <tr>
                          { isGroomer ? 
                                (<th scope="col">ClientName</th> ) :
                                (<th scope="col">GroomerName</th>)
                          }
                          <th scope="col">Comments</th>
                          <th scope="col">DogName</th>
                          <th scope="col">Duration</th>
                          <th scope="col">GroomingTypeName</th>
                          <th scope="col">Location</th>
                          <th scope="col">StartTime</th>
                        </tr>
                    </thead>
                        <tbody>
                        {appointments.items.map((appointment, index) =>
                            <tr>
                              { isGroomer ? 
                                (<td>{appointment.GroomerName}</td> ) :
                                (<td>{appointment.ClientName}</td>)
                              }
                              <td>{appointment.Comments}</td>
                              <td>{appointment.DogName}</td>
                              <td>{appointment.Duration}</td>
                              <td>{appointment.GroomingTypeName}</td>
                              <td>{appointment.Location}</td>
                              <td>{appointment.StartTime}</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                }
                <div>
                    <Link to="/login">Logout  </Link>
                    { !isGroomer && <Link to="/dog" className="btn btn-link">Manage Dog</Link>}
                    { !isGroomer && <Link to="/addappointment" className="btn btn-link">Add Appointment</Link>}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { appointments, authentication } = state;
    const { user } = authentication;
    return {
        user,
        appointments
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };