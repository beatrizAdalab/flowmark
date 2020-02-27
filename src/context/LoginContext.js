import React, { Component } from 'react';
import { api } from '../api'

const ContextLogin = React.createContext({});
export const LoginProvider = ContextLogin.Provider
export const LoginConsumer = ContextLogin.Consumer

class LoginContext extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: false,
            register: false,
            error: '',
            errorRegister: '',
            userName: '',
            userPassword: ''
        };
    }


    loginUser = async (isLogin, error) => {
        const dataAccess = this.state
        if (isLogin.success) {
            this.setState({
                login: isLogin.success,
                register: true,
                error: false,
            })
        } else {
            this.setState({
                ...dataAccess, error
            })
        }
    }

    registerUser = async (userName, userPassword) => {
        const isRegister = await api.register(userName, userPassword)
        const error = isRegister.error
        const dataAccess = this.state
        if (isRegister.success) {
            this.setState({
                login: false,
                register: true,
                userName,
                userPassword
            })
        } else {
            this.setState({
                dataAccess, errorRegister:error
            })
        }
    }

    resetAccess = async () => {
        this.setState({
            login: false,
            register: false,
            error: false,
            userName: '',
            userPassword: ''
        })
    }

    render() {
        const access = this.state
        return (
            <LoginProvider
                value={{
                    access,
                    loginUser: this.loginUser,
                    registerUser: this.registerUser,
                    resetAccess: this.resetAccess
                }}>
                {this.props.children}
            </LoginProvider>
        )
    }
}

export default LoginContext;