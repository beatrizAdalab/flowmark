import React, { Component } from 'react';
import { api } from '../api'
import { LoginConsumer } from '../context/LoginContext';
import ReactImageFallback from "react-image-fallback";
import nophoto from '../assets/images/nophoto.png'


class DetailClassified extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classified: {}
        };
    }

    componentDidMount() {
        this.getDetailClassified()
    }

    getDetailClassified = async () => {
        const id = this.props.match.params.id

        this.setState({
            classified: await api.getDetail(id),
        })
    }

    render() {

        const { tags, name, price, description, photo, updatedAt } = this.state.classified

        return (
            < LoginConsumer >
                {(value) => {

                    return (
                        <div className='container container-detail d-flex justify-content-center align-items-center'>
                            <div className='card detail-card w-100'>
                                <div className='row no-gutters'>
                                    <div className='col-12 col-lg-5'>
                                        <ReactImageFallback
                                            src={photo}
                                            fallbackImage={nophoto}
                                            className='card-img detail-img border-right'
                                            alt={name}
                                        />
                                    </div>
                                    <div className='col-12 col-lg-7'>
                                        <div className='card-body d-flex flex-column justify-content-between h-100'>
                                            <div>
                                                <h2 className='card-title'>{name}</h2>
                                                <h4>{price} € </h4>
                                                <div>
                                                    {tags ?
                                                        tags.map((tag, index) => <span key={index} className='badge badge-pill mr-2 mb-2 badge-secondary'> {tag} </span>)
                                                        : false}
                                                </div>
                                            </div>
                                            <p className='card-text h-100 '>
                                                {description}
                                            </p>
                                            <div className='card-footer bg-transparent p-0'>
                                                <small className='text-muted'>Last updated {updatedAt} </small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }}
            </LoginConsumer>
        )
    }
}

export default DetailClassified;
