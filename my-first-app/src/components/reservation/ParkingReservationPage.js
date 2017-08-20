import React from 'react';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class ParkingReservationPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            value: '',
            parkingLots: [],
            parkingNumbers: [],
            username:'',
            parkingLotId:'',
            parkingNumber:'',
            error:false
        };

        this.onLotChange = this.onLotChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.setParkingNumber = this.setParkingNumber.bind(this);
        this.getParkingNumber = this.getParkingNumber.bind(this);

    }


    onSubmit(e){
        e.preventDefault();
        var reservationJson = {parkingLotId:this.state.parkingLotId,parkingNumber:this.state.parkingNumber,username:this.state.username};
        var url = "http://localhost:8080/parkingslot";
        const config = { headers: { 'Content-Type': 'application/json' } };
        var axios = require('axios');
        axios.post(url,reservationJson,config)
            .then(res => {
                if(res.data){
                    window.location.replace('/success');
                }else{
                    this.setState({error:true})
                }
            }).catch(error => {
                this.setState({error:true})
            });
    }


    componentDidMount() {
        var defValue = "";
        var axios = require('axios');
        axios.get('http://localhost:8080/parkinglot')
            .then(res => {
                var parkingLotData = res.data;
                if(parkingLotData.length > 0){
                    defValue = parkingLotData[0].id;
                    this.getParkingNumber(defValue);
                    parkingLotData = JSON.stringify(parkingLotData);
                    parkingLotData = JSON.parse(parkingLotData);

                    this.setState({
                        value:defValue,
                        parkingLots : parkingLotData,
                        parkingLotId : defValue
                    })
                }
            });
        var loggedInUser = cookies.get('username','/');
        if(!loggedInUser){
            window.location.replace('/login');
        }else {
            this.setState({
                username: loggedInUser
            });
        }
    }



    getParkingNumber(number){
        var url = "http://localhost:8080/parkinglot/"+number+"/openslots";
        var axios = require('axios');
        axios.get(url)
            .then(res => {
                var parkingNumbers = res.data;
                var parkingNumber = '';
                var ent=[];
                for (var i = 0; i < parkingNumbers.length; i++) {

                    if(i == 0){
                        parkingNumber = parkingNumbers[i];
                    }
                    ent.push({value: + parkingNumbers[i]});
                }

                this.setState({
                    parkingNumbers:ent,
                    parkingNumber:parkingNumber
                })

            });
    }


    onLotChange(change) {
        var parkingLot = change.newValue;
        this.setState({
            parkingLotId:parkingLot
        });
        this.getParkingNumber(parkingLot);
    }

    setParkingNumber(change){
        var parkingNumber = change.newValue;
        this.setState({
            parkingNumber:parkingNumber
        });
    }


    render() {

        var Dropdown = React.createClass({

            propTypes: {
                id: React.PropTypes.string.isRequired,
                options: React.PropTypes.array.isRequired,
                value: React.PropTypes.oneOfType(
                    [
                        React.PropTypes.number,
                        React.PropTypes.string
                    ]
                ),
                valueField: React.PropTypes.string,
                labelField: React.PropTypes.string,
                onChange: React.PropTypes.func
            },

            getDefaultProps: function() {
                return {
                    value: null,
                    valueField: 'value',
                    labelField: 'label',
                    onChange: null
                };
            },

            getInitialState: function() {
                var selected = this.getSelectedFromProps(this.props);
                return {
                    selected: selected
                }
            },

            componentWillReceiveProps: function(nextProps) {
                var selected = this.getSelectedFromProps(nextProps);
                this.setState({
                    selected: selected
                });
            },

            getSelectedFromProps(props) {
                var selected;
                if (props.value === null && props.options.length !== 0) {
                    selected = props.options[0][props.valueField];
                } else {
                    selected = props.value;
                }
                return selected;
            },

            render: function() {
                var self = this;
                var options = self.props.options.map(function(option) {
                    return (
                        <option key={option[self.props.valueField]} value={option[self.props.valueField]}>
                            {option[self.props.labelField]}
                        </option>
                    )
                });
                return (
                    <select id={this.props.id}
                            className='form-control'
                            value={this.state.selected}
                            onChange={this.handleChange}>
                        {options}
                    </select>
                )
            },

            handleChange: function(e) {
                if (this.props.onChange) {
                    var change = {
                        oldValue: this.state.selected,
                        newValue: e.target.value
                    };
                    this.props.onChange(change);
                }
                this.setState({selected: e.target.value});
            }

        });


        return (
            <div className="jumbotron">
                <h2>Parking Reservation Page</h2>
                <form className="form-horizontal" onSubmit={this.onSubmit}>
                    <fieldset>
                        <div id="legend">
                            <legend className="">
                                <h3>{
                                    this.state.error ? <Error/> :""
                                }
                                </h3>
                            </legend>
                            <legend className=""><h3>Reservation Form</h3></legend>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-4" htmlFor="lot">Parking Lot</label>
                            <div className="col-sm-8">
                                <Dropdown id='parkingLotId'
                                          options={this.state.parkingLots}
                                          labelField='name'
                                          valueField='id'
                                          onChange={this.onLotChange}
                                          handler = {this.handler}
                                    />
                            </div>
                        </div>

                        <div className="form-group">
                        </div>

                        <div className="form-group">
                            <label className="control-label col-sm-4" htmlFor="slot">Parking Slot Number</label>
                            <div className="col-sm-8">
                                <Dropdown id='parkingNumber'
                                          options={this.state.parkingNumbers}
                                          labelField='value'
                                          valueField='value'
                                          onChange={this.setParkingNumber}
                                          handler = {this.handler}
                                    />

                            </div>
                        </div>


                        <div className="control-group">
                            <div className="col-sm-offset-10">
                                <button className="btn btn-success">Reserve</button>
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
        return (<div>Error : Cannot Reserve Parking.Please Try Again. </div>);
    }
}

export default ParkingReservationPage;