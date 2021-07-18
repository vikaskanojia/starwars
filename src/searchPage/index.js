import React, { Component } from "react";
import { connect } from "react-redux";
import { Form , Spinner, Col} from 'react-bootstrap';

class Search extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount() {
        if (!localStorage.getItem('starWars')) {
            this.props.history.push('/');
            return
        }
        this.props.SearchPlanet();
    }

    render(){
            const renderPLanetList = !!this.props.planet_list
            ? this.props.planet_list.map((e, i) => {
            return ( 
                        <div key={i} className='planet col mx-1'>
                            <strong style={{fontSize : '1em' }} >{e.name}</strong>
                        </div> 
                    )
            })
            : '';

            const form = (<Form.Row>
                            <Col>
                                <Form.Control type="text" name="search" placeholder="Search Planet" 
                                onChange={this.props.searchList} 
                                />
                            </Col>
            </Form.Row>);

        return (
            <div className="container-fluid px-0">
                --- {this.props.count}
                <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
                <h5 className="my-0 mr-md-auto font-weight-normal">Star Wars</h5>
                <button className="btn btn-outline-primary" onClick={this.props.logOut}>Log Out</button>
                </div>
                <div className="container px-0">
                    <div className="row">
                        <div className="col col-sm-12 mb-5 mt-4">
                            {!!renderPLanetList ? form : <div className='text-center'><Spinner animation="border" variant="primary" /></div>}
                        </div>
                        <div className="col col-sm-12 flex">
                            { !!renderPLanetList ? <h3>Planets List</h3> : ''}
                            <div className="row justify-content-center">
                                {renderPLanetList}
                            </div>
                        </div>
                    </div>
                </div>
                <button onClick={this.props.counts}>Increse</button>
            </div>
        );
    }
}

const mapStateToProp = state => {
    return {
        count : state.count,
        planet_list: state.flteredData,
    }
}

const mapDispatchToProp = (dispatch, state) => {
    return {
        counts: () => {
            dispatch({
                type: 'COUNT_ADD'
            })
        },

        SearchPlanet : (event) => {
            dispatch({
                type : 'SEARCH_PLANET'
                })
            },

        logOut:  ()=> {
            dispatch({
                type : 'LOG_OUT'
                })
            },
        searchList:  (event)=> {
                dispatch({
                    type : 'FIND_PLANET',
                    payload : event.target.value
                })
            }  
        }
}

export default connect(mapStateToProp, mapDispatchToProp)(Search);