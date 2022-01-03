import React, { useState } from 'react'
import './Authors.css'
import logo1 from '../res/add-author.png'
import logo2 from '../res/list-books.png'
import Modal from '../components/Modal'

export default function Authors() {
    const [showModal, setShowModal] = useState(false);

    const activatePopup = () => {
        setShowModal(prev => !prev);
    }

    return (
        <div>
            <div className="header-authors">
                <h1>AUTHORS</h1>
                <p>In this section you are able to<br />add, edit and manage all authors of<br />books that you possess in your library</p>
            </div>
            <div className='footer-books'>
                <div className="container-action-books" style={{ userSelect: "none" }}>
                    <img src={logo1} alt="Add Icon" className="logo-add-book" />
                    <p className="label-gnc">ADD A NEW AUTHOR</p>
                    <div className="action-button-book" onClick={activatePopup}>
                        <p>ADD</p>
                    </div>
                </div>
                <div className="container-action-books" style={{ userSelect: "none", marginLeft: '20%' }}>
                    <img src={logo2} alt="List Icon" className="logo-add-book" />
                    <p className="label-gnc">AUTHORS LIST</p>
                    <div className="action-button-book">
                        <p>OPEN</p>
                    </div>
                </div>
            </div>
            <Modal show={showModal} setShow={activatePopup} title='Add Author'>

            </Modal>
        </div>
    )
}
