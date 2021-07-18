import React from "react";

export default class withAuth extends React.Component {
    constructor(props) {
        super(props)
        if (localStorage.getItem('starWars')) {
            const isLoggin = JSON.parse(localStorage.getItem('starWars'));
            if (isLoggin.isLogin) {
                this.props.history.push('/search');
            }
        }
    }

}