import React from 'react';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class LogoutPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };

    }

    componentDidMount() {
        cookies.remove('username','/');
        window.location.replace("/");
    }


    render() {
        return (
            <div className="jumbotron">
                <h2>Logging Out Now..</h2>
            </div>
        );
    }
}


export default LogoutPage;