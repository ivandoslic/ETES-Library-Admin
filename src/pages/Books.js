import React, { useState } from 'react'
import './Books.css'
import logo1 from '../res/add-book.png'
import logo2 from '../res/list-books.png'
import Modal from '../components/Modal';

function Books() {
    const [showModal, setShowModal] = useState(false);

    const activatePopup = () => {
        setShowModal(prev => !prev);
    }

    return (
        <div className="main-container-books">
            <div className="header-books">
                <h1>BOOKS</h1>
                <p>In this section you, the librarian, can<br />add, edit and manage all the books that<br />you possess in your library</p>
            </div>
            <div className='footer-books'>
                <div className="container-action-books" style={{ userSelect: "none" }}>
                    <img src={logo1} alt="Add Icon" className="logo-add-book" />
                    <p className="label-gnc">ADD A NEW BOOK</p>
                    <div className="action-button-book" onClick={activatePopup}>
                        <p>ADD</p>
                    </div>
                </div>
                <div className="container-action-books" style={{ userSelect: "none", marginLeft: '20%' }}>
                    <img src={logo2} alt="List Icon" className="logo-add-book" />
                    <p className="label-gnc">BOOK LIST</p>
                    <div className="action-button-book">
                        <p>OPEN</p>
                    </div>
                </div>
            </div>
            <Modal show={showModal} setShow={activatePopup} />
        </div>
    )
}

export default Books;
