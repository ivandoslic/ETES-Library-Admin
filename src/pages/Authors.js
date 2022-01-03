import React, { useState, useRef } from 'react'
import './Authors.css'
import logo1 from '../res/add-author.png'
import logo2 from '../res/list-books.png'
import profile_placeholder from '../res/author-profile-placeholder.jpg'
import Modal from '../components/Modal'
import nationalities from '../res/nationalities.json'
import { storage } from '../base'
import * as MdIcons from 'react-icons/md'
import * as RiIcons from 'react-icons/ri'

export default function Authors() {
    // Author info :
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [literaryMovement, setLiteraryMovement] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [authorNationality, setAuthorNationality] = useState("");

    // Author image :
    const imageFileElement = useRef();

    const [showModal, setShowModal] = useState(false);
    const [selectedAuthorImage, setSelectedAuthorImage] = useState(null);
    const [selectedImageURL, setSelectedImageURL] = useState(null);

    const handleSubmit = () => {
        console.log(firstName, lastName, literaryMovement, dateOfBirth, authorNationality);
        console.log(selectedAuthorImage, `URL: ${selectedImageURL}`);
    }

    const activatePopup = () => {
        setShowModal(prev => !prev);
    }

    const handleOpenImageSelector = () => {
        imageFileElement.current.click();
    }

    const handleImageChange = event => {
        if (event.target.files && event.target.files.length === 1) {
            setSelectedAuthorImage(event.target.files[0]);
            setSelectedImageURL(URL.createObjectURL(event.target.files[0]));
        }
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
            <Modal show={showModal} setShow={activatePopup}>
                <div className='left-side-authors-modal'>
                    <p>New Author</p>
                    <input type='text' placeholder='First name' value={firstName} onChange={event => setFirstName(event.target.value)} />
                    <input type='text' placeholder='Last name' value={lastName} onChange={event => setLastName(event.target.value)} />
                    <input type='text' placeholder='Literary Movement' value={literaryMovement} onChange={event => setLiteraryMovement(event.target.value)} />
                    <input type="date" value={dateOfBirth} onChange={event => setDateOfBirth(event.target.value)} />
                    <select value={authorNationality} onChange={event => setAuthorNationality(event.target.value)}>
                        {nationalities.map((val, key) => {
                            return (<option key={key}>{val}</option>)
                        })}
                    </select>
                    <button onClick={handleSubmit}>Submit placeholder</button>
                </div>
                <div className='right-side-authors-modal'>
                    <div className='upper-rsam'>
                        <MdIcons.MdClose className='close-icon-modal' size={32} color='white' onClick={activatePopup} />
                    </div>
                    <div className='lower-rsam'>
                        <input type="file" accept='.jpg,.png,.jpeg' style={{ display: 'none' }} ref={imageFileElement} onChange={handleImageChange} />
                        {selectedAuthorImage ? <img src={selectedImageURL} className='image-display-authors-modal' /> : <img src={profile_placeholder} className='image-display-authors-modal' />}
                        <RiIcons.RiEditCircleFill color='white' size={48} className='edit-image-authors-modal' onClick={handleOpenImageSelector} />
                    </div>
                </div>
            </Modal>
        </div>
    )
}
