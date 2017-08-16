import React from "react";

class signupForm extends React.Component {
    render() {
        return (
                <form className="form-horizontal" action='/' method="GET">
                    <fieldset>
                        <div id="legend">
                            <legend className=""><h3>Registration</h3></legend>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-3"  for="firstname">First Name</label>
                            <div className="col-sm-9">
                                <input type="text" id="firstname" name="firstname" placeholder="" className="form-control"/>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="control-label col-sm-3"  for="lastname">Last Name</label>
                            <div className="col-sm-9">
                                <input type="text" id="lastname" name="lastname" placeholder="" className="form-control"/>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="control-label col-sm-3"  for="username">Email Address</label>
                            <div className="col-sm-9">
                                <input type="text" id="username" name="username" placeholder="" className="form-control"/>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="control-label col-sm-3" for="password">Password</label>
                            <div className="col-sm-9">
                                <input type="password" id="password" name="password" placeholder="" className="form-control"/>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="control-label col-sm-3"  for="address">Address</label>
                            <div className="col-sm-9">
                                <input type="text" id="address" name="address" placeholder="" className="form-control"/>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="control-label col-sm-3"  for="city">City</label>
                            <div className="col-sm-9">
                                <input type="text" id="city" name="city" placeholder="" className="form-control"/>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="control-label col-sm-3"  for="zipcode">Zipcode</label>
                            <div className="col-sm-9">
                                <input type="text" id="zipcode" name="zipcode" placeholder="" className="form-control"/>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="control-label col-sm-3" for="phonenumber">Phone Number</label>
                            <div className="col-sm-9">
                                <input type="phone" id="phonenumber" name="phonenumber" placeholder="" className="form-control"/>
                            </div>
                        </div>

                        <div className="control-group ">
                            <div className="col-sm-offset-10">
                                <button className="btn btn-primary">Signup</button>
                            </div>
                        </div>
                    </fieldset>
                </form>
        );
    }
}

export default signupForm;