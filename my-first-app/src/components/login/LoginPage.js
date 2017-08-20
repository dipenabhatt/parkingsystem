import React from 'react';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
class LoginPage extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
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
        var url = "http://localhost:8080/user/validate?username="+this.state.username+"&password="+this.state.password;
        axios.get(url,config)
            .then(res => {
                var userData = res.data;
                if(userData){

                    cookies.set('username', this.state.username, { path: '/' });
                    window.location.replace("/reservation");
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
                <h2>Login Page</h2>
                <form className="form-horizontal" onSubmit={this.onSubmit}>
                    <fieldset>
                        <div id="legend">
                            <legend className="">
                                <h3>{
                                    this.state.error ? <Error/> :""
                                }
                                </h3>
                            </legend>
                            <legend className=""><h3>Login</h3></legend>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-3"  htmlFor="username">Email</label>
                            <div className="col-sm-9">
                                <input type="text" id="username" name="username" placeholder="" required="true" className="form-control" value={this.state.username} onChange={this.onChange}/>
                            </div>
                        </div>

                        <div className="form-group">
                        </div>

                        <div className="form-group">
                            <label className="control-label col-sm-3" htmlFor="password">Password</label>
                            <div className="col-sm-9">
                                <input type="password" id="password" name="password" placeholder="" required="true" className="form-control" value={this.state.password} onChange={this.onChange}/>
                            </div>
                        </div>


                        <div className="control-group">
                            <div className="col-sm-offset-10 col-sm-8">
                                <button className="btn btn-success">Login</button>
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
        return (<div>Error : Cannot Login. Username or Password is invalid.</div>);
    }
}

export default LoginPage;