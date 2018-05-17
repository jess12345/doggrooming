import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions, appointmentActions } from '../_actions';

class HomePage extends React.Component {
    this.state = {
            isGroomer: false,
        };

    componentDidMount() {
        let user = this.props.user;
        this.setState({
            isGroomer: user.IdGroomer === undefined
        });

        var userID = this.state.isGroomer ? user.IdClient: user.IdGroomer;
        this.props.dispatch(appointmentActions.getAllAppointment(userID, this.state.isGroomer));
    }

    render() {
        const { user, appointments } = this.props;
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
                          { this.state.isGroomer ? 
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
                              { this.state.isGroomer ? 
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
                <p>
                    <Link to="/login">Logout</Link>
                </p>
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