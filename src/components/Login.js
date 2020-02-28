import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { LoginConsumer } from '../context/LoginContext';
import { api } from '../api'


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            userPassword: '',
            redirect: false,
            error: false
        }
    }

    setRedirect = (isLogin, error) => {
        this.setState({
            redirect: isLogin,
            error: error
        })
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to={`/listClassifieds/?all`} />
        }
    }

    handleChange = (e) => {
        const element = e.target
        const name = element.name
        const value = element.value;

        this.setState({
            [name]: value
        })
    }

    render() {

        const { userName, userPassword } = this.state
        return (
            <LoginConsumer>
                {(value) => {

                    const checkLogin = async (e) => {
                        e.preventDefault()
                        const isLogin = await api.login(userName, userPassword)
                        const error = isLogin.error
                        this.setRedirect(isLogin.success, error)
                        value.loginUser(isLogin, error)
                    }

                    return (

                        <div className='container-access container pt-4'>

                            {this.renderRedirect(this.state.redirect)}

                            {value.access.error ?
                                <div className='alert alert-danger' role='alert'>
                                    Ups.. {value.access.error}
                                </div> : < div className='alert alert-danger invisible ' role='alert'>
                                    Ups.. {value.access.error}
                                </div>
                            }

                            <div className=' d-flex justify-content-center pt-4'>
                                <div className='d-flex flex-column justify-content-center align-items-center container-form-access'>
                                    <h2 className='text-center'>Login</h2>
                                    <form
                                        className='pt-5 w-100'
                                        onSubmit={checkLogin}>
                                        <div className='form-group'>
                                            <label htmlFor='userName'>User Name <small className='text-muted'> * </small> </label>
                                            <input
                                                className='form-control'
                                                required
                                                type='text'
                                                id='userName'
                                                name='userName'
                                                value={userName}
                                                onChange={this.handleChange}
                                            />
                                        </div>

                                        <div className='form-group'>
                                            <label htmlFor='userPassword'>User Password <small className='text-muted'> * </small> </label>
                                            <input
                                                className='form-control'
                                                required
                                                type='password'
                                                id='userPassword'
                                                name='userPassword'
                                                value={userPassword}
                                                onChange={this.handleChange}
                                            />
                                        </div>

                                        <div className='form-group d-flex justify-content-center pt-2'>
                                            <button
                                                className='btn btn-info rounded'
                                                type='submit'>
                                                Login
                                            </button>
                                        </div>
                                    </form>

                                    <Link to='/register'>
                                        <p className='text-decoration-none text-info'>
                                            Haven´t any account?
                                        </p>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )
                }}
            </LoginConsumer>
        );
    }
}

export default Login



