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

                            <Link className='text-decoration-none' to='/listClassifieds/'>
                                <div className='d-flex align-items-center'>
                                    <FontAwesomeIcon className='text-info' icon={faHome} />
                                    <h1 className='navbar-brand m-0 ml-2 '>FlowMark</h1>
                                </div>
                            </Link>

                            <div className='d-flex justify-content-center align-items-center'>
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