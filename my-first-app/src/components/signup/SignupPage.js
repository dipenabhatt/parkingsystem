import React from "react" ;
import axios from 'axios';

class SignupPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            phone: '',
            error:false

        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();
        //console.log(this.state);
        var axios = require('axios');

        const config = { headers: { 'Content-Type': 'application/json' } };

        axios.post('http://localhost:8080/user',this.state,config)
            .then(res => {
                if(res.data){
                    window.location.replace("/login");
                }else{
                    this.setState({error:true})
                }
            }).catch(error => {
                this.setState({error:true})
            });
    }



    render() {
        return (
            <div className="jumbotron">
                <h2>Registration Page</h2>
                <form className="form-horizontal" onSubmit={this.onSubmit}>
                    <fieldset>
                        <div id="legend">
                            <legend className="">
                                <h3>{
                                        this.state.error ? <Error/> :""
                                    }
                                </h3>
                            </legend>

                            <legend className=""><h3>Registration</h3></legend>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-3"  htmlFor="firstname">First Name</label>
                            <div className="col-sm-9">
                                <input type="text" id="firstName" name="firstName" placeholder="" required="true" className="form-control" value={this.state.firstname} onChange={this.onChange}/>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="control-label col-sm-3"  htmlFor="lastname">Last Name</label>
                            <div className="col-sm-9">
                                <input type="text" id="lastName" name="lastName" placeholder="" required="true" className="form-control"  value={this.state.lastname} onChange={this.onChange}/>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="control-label col-sm-3"  htmlFor="username">Email Address</label>
                            <div className="col-sm-9">
                                <input type="text" id="username" name="username" placeholder="" required="true" className="form-control" value={this.state.username} onChange={this.onChange}/>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="control-label col-sm-3" htmlFor="password">Password</label>
                            <div className="col-sm-9">
                                <input type="password" id="password" name="password" placeholder="" required="true" className="form-control" value={this.state.password} onChange={this.onChange}/>
                            </div>
                        </div>


                        <div className="form-group">
                            <label className="control-label col-sm-3" htmlFor="phonenumber">Phone Number</label>
                            <div className="col-sm-9">
                                <input type="phone" id="phone" name="phone" placeholder="" required="true" className="form-control" value={this.state.phonenumber} onChange={this.onChange}/>
                            </div>
                        </div>

                        <div className="form-group ">
                            <div className="col-sm-offset-10">
                                <button className="btn btn-primary">Signup</button>
                            </div>
                        </div>
                    </fieldset>
                </form>
            </div>
        );
    }
}


class Error extends React.Component {
    render() {
        return (<div>Error : Cannot Sign up Account. Email address might already exist.</div>);
    }
}

export default SignupPage;