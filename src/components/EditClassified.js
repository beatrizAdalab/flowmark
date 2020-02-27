import React, { Component } from 'react';
import { LoginConsumer } from '../context/LoginContext';
import { Redirect } from 'react-router-dom';
import { api } from '../api'
import FormClassified from './FormClassifieds'


class EditClassified extends Component {
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
                success: undefined,
                error: ''
            }
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id
        this.getClassified(id)
    }

    getClassified = async (id) => {
        const cl = await api.getDetail(id)
        this.setState({
            classified: {
                name: cl.name,
                price: cl.price,
                description: cl.description,
                tags: cl.tags,
                type: cl.type,
                photo: cl.photo,
            },
            status: {
                success: undefined,
                error: ''
            }
        })
    }

    editClassified = async (id, classified) => {
        console.log(classified, 'objeto resultado antes api')
        const editApi = await api.editClassified(id, classified)
        this.setState({
            status: {
                success: editApi.success,
                error: editApi.error
            }
        })
    }

    handleChange = (e) => {
        const element = e.target
        const data = this.state.classified
        const name = element.name
        const value =
            name === 'tags' ?
                element.value ? element.value.split(',') : [] :
                element.value

        this.setState({
            classified: { ...data, [name]: value }
        })
    }

    renderRedirect = () => {
        const id = this.props.match.params.id
        const redirect = this.state.status.success
        if (redirect) {
            return <Redirect to={`/detailClassifieds/${id}`} />
        }
    }

    clickForm = async (e) => {
        const id = this.props.match.params.id
        e.preventDefault();
        // console.dir(
        //     api.editClassified('5e4aec243976de16b4d34275', {
        //         name: "ukelele ",
        //         price: 25,
        //         description: " I sell my ukelele",
        //         tags: [],
        //         type: "buy",
        //         photo: "https://www.shop2rock.de/shop/images/products/main/detail/cascha_hh2024.jpg",
        //     }), 'prueba api'
        // )
        this.editClassified(id, this.state.classified)
    }

    render() {
        return (
            <LoginConsumer>
                {(value) => {
                    return (
                        <div className='container p-5'>
                            <h2>Edit Classified</h2>

                            {this.renderRedirect()}

                            <FormClassified
                                paramsClassified={this.state.classified}
                                handleChange={this.handleChange}
                                clickForm={this.clickForm}
                                textButton={'Edit'}
                            />
                        </div>
                    )
                }}
            </LoginConsumer>
        )
    }
}

export default EditClassified;