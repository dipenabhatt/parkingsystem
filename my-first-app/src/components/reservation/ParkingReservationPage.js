import React from 'react';

class ParkingReservationPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            value: '',
            parkingLots: [],
            parkingNumbers: []
        };
        //this.onhandlechange = this.onhandlechange.bind(this);
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
                        parkingLots : parkingLotData
                    })
                }
            });
    }


    getParkingNumber(number){
        var url = "http://localhost:8080/parkinglot/"+number+"/openslots";
        var axios = require('axios');
        axios.get(url)
            .then(res => {
                var parkingNumbers = res.data;

                var ent=[];
                for (var i = 0; i < parkingNumbers.length; i++) {
                    ent.push({value: + parkingNumbers[i]});
                }



                this.setState({
                    parkingNumbers : ent
                    //posts : [
                    //    {
                    //        desc: 'This is option Aa',
                    //        value: 'a'
                    //    },
                    //    {
                    //        desc: 'This is option Bb',
                    //        value: 'b'
                    //    },
                    //    {
                    //        desc: 'This is option Cc',
                    //        value: 'c'
                    //    },
                    //    {
                    //        desc: 'This is option Dd',
                    //        value: 'd'
                    //    }
                    //]
                })

            });
    }


    //onhandlechange(e) {
    //    var parkingLot = e.target.value;
    //    this.getParkingNumber(parkingLot);
    //    this.setState({value: parkingLot});
    //    e.preventDefault();
    //
    //}

    onLotChange(change) {
        var parkingLot = change.newValue;
        var url = "http://localhost:8080/parkinglot/"+parkingLot+"/openslots";
        var axios = require('axios');
        axios.get(url)
            .then(res => {
                var parkingNumbers = res.data;

                var ent=[];
                for (var i = 0; i < parkingNumbers.length; i++) {
                    ent.push({value: + parkingNumbers[i]});
                }

                this.setState({
                    parkingNumbers: ent
                });
            })
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


        //function onLotChange(change) {
        //    var parkingLot = change.newValue;
        //    this.getParkingNumber(parkingLot);
        //    this.setState({value: parkingLot});
        //}

        return (
            <div className="jumbotron">
                <h2>Parking Reservation Page</h2>
                <form className="form-horizontal" action='/' method="GET">
                    <fieldset>
                        <div id="legend">
                            <legend className=""><h3>Reservation Form</h3></legend>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-4" htmlFor="lot">Parking Lot</label>
                            <div className="col-sm-8">
                                <Dropdown id='myDropdown'
                                          options={this.state.parkingLots}
                                          labelField='name'
                                          valueField='id'
                                          onChange={this.onLotChange}
                                    />
                            </div>
                        </div>

                        <div className="form-group">
                        </div>

                        <div className="form-group">
                            <label className="control-label col-sm-4" htmlFor="slot">Parking Slot Number</label>
                            <div className="col-sm-8">
                                <Dropdown id='myDropdown'
                                          options={this.state.parkingNumbers}
                                          labelField='value'
                                          valueField='value'
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

export default ParkingReservationPage;