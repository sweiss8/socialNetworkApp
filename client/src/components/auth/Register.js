import React from 'react';

class Register extends React.Component {
    // Each field has to have its own state within the component. This is component state, not application state, so it does not have to do with Redux
    constructor () {
        super();
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            password2: '',
            errors: {}

        };
    
    }


    onChange = event => {
        const {name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    onSubmit = event => {
        event.preventDefault();

        const newUser = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        }
        console.log(newUser)
    }


    render() {
        return (
            <div>
                <div className="register">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 m-auto">
                                <h1 className="display-4 text-center">Sign Up</h1>
                                <p className="lead text-center">Create your DevConnector account</p>
                                <form onSubmit={this.onSubmit}>
                                    <div className="form-group">
                                        <input 
                                            type="text" 
                                            className="form-control form-control-lg" placeholder="First Name" name="firstName" 
                                            value={this.state.firstName}
                                            onChange={this.onChange}
                                             />
                                    </div>
                                    <div className="form-group">
                                        <input 
                                            type="text" 
                                            className="form-control form-control-lg" placeholder="Last name" 
                                            name="lastName"
                                            value={this.state.lastName} 
                                            onChange={this.onChange} />
                                    </div>
                                    <div className="form-group">
                                        <input 
                                            type="email"
                                            className="form-control form-control-lg" 
                                            placeholder="Email Address" name="email"
                                            value={this.state.email}
                                            onChange={this.onChange} />
                                        <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
                                    </div>
                                    <div className="form-group">
                                        <input 
                                        type="password" 
                                        className="form-control form-control-lg" placeholder="Password" 
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.onChange} />
                                    </div>
                                    <div className="form-group">
                                        <input type="password" className="form-control form-control-lg" placeholder="Confirm Password" name="password2"
                                        value={this.state.password2} 
                                        onChange={this.onChange}/>
                                    </div>
                                    <input type="submit" className="btn btn-info btn-block mt-4" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Register;