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
            tagsStore: [],
            status: {
                success: undefined,
                error: ''
            }
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id
        this.getClassified(id)
        this.getStore()
    }

    getStore = async (paramsApi) => {
        this.setState({
            tagsStore:  await api.getTags(), 
        })
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
        const value = element.value
             
        if (name === 'tags'){
            const tags = this.state.classified.tags
         
                if (!tags.includes(value)){
                    this.setState({
                        classified: { ...data, [name]: [...tags, value] }
                    }) 
                }else {
                    
                    this.setState({
                        classified: { ...data, [name]: tags.filter(item=> item !== value)}
                    }) 
                }

        } else {
            console.log(value)
            this.setState({
                classified: { ...data, [name]: value  }
            })
        }
    }

    renderRedirect = () => {
        const redirect = this.state.status.success
        if (redirect) {
            return <Redirect to={`/listClassifieds/?name=${this.state.classified.name}`} />
        }
    }

    clickForm = async (e) => {
        const id = this.props.match.params.id
        e.preventDefault();
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
                                store={this.state.tagsStore}
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