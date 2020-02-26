import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { api } from '../api'
import { LoginConsumer } from './Login';
import Header from './Header'


class Access extends Component {
    constructor(props) {
        super(props);
        this.state = {
            test: undefined
        }
    }

    componentDidMount() {
        this.checkCookiesWhitCall()
    }

    checkCookiesWhitCall = async () => {
        const test = await api.newClassified()
        this.setState({
            test
        })
    }

    renderRedirect = () => {
        if (true) {
            return <Redirect to={`/Login`} />
        }
    }

    render() {
        return (
            <div>
                {this.renderRedirect()}
                <Header />
            </div>
        )
    }
}

export default Access