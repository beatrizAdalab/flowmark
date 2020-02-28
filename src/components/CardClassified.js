import React from 'react';
import { Link } from 'react-router-dom';
import { LoginConsumer } from '../context/LoginContext';
import ReactImageFallback from 'react-image-fallback';
import nophoto from '../assets/images/nophoto.png';

// get our fontawesome imports
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const CardClassified = ({ classified }) => {
    return (
        <LoginConsumer>
            {(value) => {

                return (
                    <div className='col-12 col-md-4 col-lg-4 mb-5'>
                        <div className='card shadow-sm bg-white rounded d-flex flex-column justify-content-between h-100'>
                            <Link
                                to={`/detailClassifieds/${classified._id}`}
                                key={classified.id}
                                className='text-decoration-none text-body'
                            >
                                <div className='card-container-img card-image '>
                                    <ReactImageFallback
                                        src={classified.photo}
                                        fallbackImage={nophoto}
                                        className='card-img card-image border-bottom'
                                        alt={classified.name}
                                    />
                            
                                    <div className='card-img-overlay'>
                                        <span className='p-2 rounded-circle badge badge-danger'>{classified.price} €</span>
                                    </div>

                                </div>
                                <div className='card-body p-2'>
                                    <h5 className='card-title'> {classified.name}</h5>
                                    <p > {classified.description} </p>
                                    <div>
                                        {classified.tags ?
                                            classified.tags.map((tag, index) => <span key={index} className='badge badge-pill mr-2 mb-2 badge-secondary'> {tag} </span>)
                                            : false}
                                    </div>
                                </div>

                              
                            </Link>
                            <div className='card-footer bg-transparent p-2'>
                                <Link
                                    to={`/editClassifieds/${classified._id}`}
                                    className='text-decoration-none text-body'
                                >
                                    <FontAwesomeIcon className='mr-2 text-edit' icon={faPencilAlt} />
                                    Edit
                            </Link>

                            </div>


                        </div>
                    </div>
                );
            }}
        </LoginConsumer>
    );
};

export default CardClassified;