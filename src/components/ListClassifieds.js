import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { urlRouter } from '../router';
import { api } from '../api'
import { LoginConsumer } from '../context/LoginContext';
import FilterClassifieds from './FilterClassifieds'
import CardClassified from './CardClassified'


class ListClassifieds extends Component {
    constructor(props) {
        super(props);
        this.state = {
            store: {
                classifieds: [],
                tags: [],
                loaded: true
            },
            paramsFilter: {
                name: '',
                price: '',
                venta: '',
                tag: ''
            },
            redirect: false
        };
    }

    componentDidMount() {
        const url = this.props.location.search
        const paramsUrl = urlRouter.searchStringToObject(url)
        const objectFilter = this._buildObjectFilter(paramsUrl)
        this.getStore(objectFilter)
        this.getParamsFilter(objectFilter)
    }

    getStore = async (paramsApi) => {
        this.setState({
            store: {
                classifieds: await api.getClassifieds(paramsApi),
                tags: await api.getTags(),
                loaded: false
            }
        })
    }

    getParamsFilter = (paramsSearch) => {
        this.setState({
            paramsFilter: {
                ...paramsSearch
            }
        })
    }

    handleChange = (e) => {
        const data = this.state.paramsFilter
        const element = e.target
        const name = element.name
        const value = element.value

        this.setState({
            paramsFilter: { ...data, [name]: value }
        })
    }

    render() {
        const { classifieds, tags } = this.state.store

        return (
            <LoginConsumer>
                {(value) => {
                    return (
                        <div className=''>
                            <div className='d-flex flex-column pb-3'>
                                <FilterClassifieds
                                    tags={tags}
                                    paramsFilter={this.state.paramsFilter}
                                    clearForm={this.clearForm}
                                    handleChange={this.handleChange}
                                />
                                <Link to='/newClassified'>
                                    <button
                                        type='button'
                                        className='btn btn-outline-info w-100 '>
                                        New classified
                                        </button>
                                </Link>
                            </div>

                            {!classifieds ?
                                <div>UPS</div> :
                                classifieds.length > 0 ?
                                    <div className='container-classifieds pt-4'>
                                        <div className='row'>
                                            {classifieds.map(item => (
                                                <CardClassified
                                                    classified={item}
                                                    key={item._id} />
                                            ))}
                                        </div>
                                    </div>
                                    : <div className='d-flex justify-content-center align-content-center py-5'>
                                        <h4 className='text-secondary'>Ups! Its seems that there is no classifieds... try again</h4>
                                    </div>
                            }
                        </div>
                    )
                }}
            </LoginConsumer>
        )
    }

    _buildObjectFilter(search) {

        let keys = ['name', 'price', 'venta', 'tag']

        const ObjectKey = keys.reduce((accumulator, key) => {

            if (search.hasOwnProperty(key)) {
                accumulator[key] = search[key]
            } else {
                accumulator[key] = ''
            }
            return accumulator
        }, {})

        return ObjectKey
    }
}

export default ListClassifieds;