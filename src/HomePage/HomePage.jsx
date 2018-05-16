import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions, appointmentActions } from '../_actions';

class HomePage extends React.Component {
    componentDidMount() {
        this.props.dispatch(appointmentActions.getAllAppointment());
    }

    handleDeleteUser(id) {
        return; //(e) => this.props.dispatch(appointmentActions.delete(id));
    }

    render() {
        const { user, appointments } = this.props;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>Hi {user.firstName}!</h1>
                <h3>All Appointment:</h3>
                {appointments.loading && <em>Loading Appointment...</em>}
                {appointments.error && <span className="text-danger">ERROR: {appointments.error}</span>}
                {appointments.items &&
                    <ul>
                        {appointments.items.map((user, index) =>
                            <li key={user.id}>
                                {user.firstName + ' ' + user.lastName}
                                {
                                    user.deleting ? <em> - Deleting...</em>
                                    : user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
                                    : <span> - <a onClick={this.handleDeleteUser(user.id)}>Delete</a></span>
                                }
                            </li>
                        )}
                    </ul>
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