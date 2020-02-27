import React, { Component } from 'react';
import { LoginConsumer } from '../context/LoginContext';
import { api } from '../api'
import { Redirect } from 'react-router-dom';
import FormClassified from './FormClassifieds'


class NewClassified extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classified: {
                name: '',
                price: 0,
                description: '',
                tags: [],
                type: '',
                photo: '',
            },
            status: {
                success: '',
                error: false
            }
        }
    }

    createNewClassified = async (newClassified) => {
        this.setState({
            status: await api.newClassified(newClassified)
        })
    }

    handleChange = (e) => {
        const element = e.target
        const data = this.state.classified
        const name = element.name
        const value =
            name === 'tags' ?
                element.value ? element.value.split(',') : [] :
                element.value;

        this.setState({
            classified: { ...data, [name]: value }
        })
    }

    clickForm = (e) => {
        e.preventDefault();
        this.createNewClassified(this.state.classified)
    }

    renderRedirect = () => {
        const redirect = this.state.status.success
        if (redirect) {
            return <Redirect to={`/listClassifieds/?name=${this.state.classified.name}`} />
        }
    }

    render() {
        return (
            <LoginConsumer>
                {(value) => {
                    const { success, error } = this.state.status
                    return (
                        <div className='container p-5'>
                            {this.renderRedirect()}

                            {success === true ?
                                <div className='alert alert-success' role='alert'>
                                    Classified created
                            </div> :
                                success === false ?
                                    < div className='alert alert-danger' role='alert'>
                                        Ups..{error}
                                    </div> :
                                    < div className='alert invisible' role='alert'>
                                        Ups.. {error}
                                    </div>
                            }

                            <h2>New Classifieds</h2>
                            <FormClassified
                                paramsClassified={this.state.classified}
                                handleChange={this.handleChange}
                                clickForm={this.clickForm}
                                textButton={'New'}
                            />
                        </div>
                    )
                }}
            </LoginConsumer>
        )
    }
}

export default NewClassified;