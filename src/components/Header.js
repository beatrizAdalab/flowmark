import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { LoginConsumer } from '../context/LoginContext';

// fontawesome imports
import { faPowerOff, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Header() {
    return (
        <LoginConsumer>
            {(value) => {
                return (
                    <nav className='navbar navbar-light bg-white fixed-top'>
                        <div className='container'>
                        <h1 className='navbar-brand m-0 ml-2 '> <span className='text-info'>F</span>lowMark</h1>
                            <div className='d-flex justify-content-center align-items-center'>
                            <Link className='text-decoration-none' to='/listClassifieds/'>
                                <div className='d-flex align-items-center'>
                                    <FontAwesomeIcon className='text-info' icon={faHome} />
                                </div>
                            </Link>
                                <Link to='/login'>
                                    <button className='btn btn-link'>
                                        <FontAwesomeIcon className='text-info' icon={faPowerOff} />
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </nav>
                )
            }}
        </LoginConsumer>
    )
}

export default Header;