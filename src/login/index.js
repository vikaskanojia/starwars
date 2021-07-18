import React, { Component } from "react";
import { connect } from "react-redux";
import { Form , Button, Card, Alert} from 'react-bootstrap';

import withAUth from './withAuth'

class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            ...props,
            userDetail : null,
            character: null,
            redirectPath : ''
            
        };
    }

    static getDerivedStateFromProps(props, state) {        
        return { character: props.character, userDetail : props.userDetail, redirectPath : props.redirectPath};
    }

    render() {
        if (localStorage.getItem('starWars')) {
            const isLoggin = JSON.parse(localStorage.getItem('starWars'));
            if (isLoggin.isLogin) {
                this.props.history.push('/search');
            }
        }

        return (
            <div className="container">
                <div className="row align-items-center justify-content-md-center">
                    <div className="col col-sm-6">
                        <Card>
                            <Card.Header>Login Now</Card.Header>
                            <Card.Body>
                                <Form onSubmit={this.props.loginUser} type="post" name='loginForm'>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control type="text"  name="userName" placeholder="Enter email" />
                                        <Form.Text className="text-muted">
                                        We'll never share your email with anyone else.
                                        </Form.Text>
                                    </Form.Group>
                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" name="password" placeholder="Password" />
                                    </Form.Group>
                                    {
                                        this.state.character && this.state.character.error 
                                        ? <Alert variant={'danger'}>
                                            {this.state.character ? this.state.character.error : ''}
                                        </Alert>
                                        : ''
                                    }
                                    
                                    <Button variant="primary" type="submit">
                                        Submit
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProp = state => {
    return {
        character: state.apiData,
        userDetail : state.userDetail,
        redirectPath : state.redirectPath
    }
}

const mapDispatchToProp = (dispatch) => {
    return {
        loginUser : (event) => {
            event.preventDefault();
            event.stopPropagation(); 
            dispatch({
                type : 'LOGIN_USER',
                userDetails: {
                    userName : event.target['userName'].value, 
                    password: event.target['password'].value 
                },
            })
        
        }
    }
}

export default connect(mapStateToProp, mapDispatchToProp)(Login);