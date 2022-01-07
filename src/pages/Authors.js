import React, { useState, useRef, useCallback, useContext } from 'react'
import './Authors.css'
import logo1 from '../res/add-author.png'
import logo2 from '../res/list-books.png'
import profile_placeholder from '../res/author-profile-placeholder.jpg'
import Modal from '../components/Modal'
import nationalities from '../res/nationalities.json'
import Base from '../base'
import { addDoc, collection } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage'
import * as MdIcons from 'react-icons/md'
import * as RiIcons from 'react-icons/ri'
import ImageCropper from '../components/ImageCropper'
import CircularProgress from '@mui/material/CircularProgress';
import OptimizedSnackbar from '../components/OptimizedSnackbar';
import { FirebaseContentContext } from '../FirebaseContent';

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

    // Image Cropper :
    const [showCropper, setShowCropper] = useState(false);
    const [croppedImageURL, setCroppedImageURL] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null);

    // Snackbar :
    const [snackbarOpened, setSnackbarOpened] = useState(false);
    const [isSnackbarAlert, setIsSnackbarAlert] = useState(false);
    const [snackbarDuration, setSnackbarDuration] = useState(null);
    const [snackbarMessage, setSnackbarMessage] = useState(null);
    const [snackbarAlertType, setSnackbarAlertType] = useState('success');

    // Data context
    const authors = useContext(FirebaseContentContext);

    const handleCroppingDone = (croppedImage) => {
        const croppedImageUrl = URL.createObjectURL(croppedImage);
        setCroppedImageURL(croppedImageUrl);
        setCroppedImage(croppedImage);
        setShowCropper(false);
        setShowModal(true);
    }

    const makeErrorMessage = (message, duration) => {
        setIsSnackbarAlert(true);
        setSnackbarDuration(duration);
        setSnackbarMessage(message);
        setSnackbarAlertType('error');
        setSnackbarOpened(true);
    }

    const makeSuccesMessage = (message, duration) => {
        setIsSnackbarAlert(true);
        setSnackbarDuration(duration);
        setSnackbarMessage(message);
        setSnackbarAlertType('success');
        setSnackbarOpened(true);
    }

    const makeSnack = (message, duration) => {
        setSnackbarMessage(message);
        setSnackbarDuration(duration);
        setSnackbarOpened(true);
    }

    const handleCropperCanceled = () => {
        setSelectedAuthorImage(null);
        setSelectedImageURL(null);
        setShowCropper(false);
        setShowModal(true);
    }

    const startCropping = () => {
        setShowModal(false);
        setShowCropper(true);
    }

    const validateAuthorInfo = () => {
        if (firstName.slice() === '' || firstName === null) {
            makeErrorMessage("First name can't be empty!", 5000);
            return false;
        }

        if (lastName.slice() === '' || lastName === null) {
            makeErrorMessage("Last name can't be empty!", 5000);
            return false;
        }

        if (literaryMovement.slice() === '' || literaryMovement === null) {
            makeErrorMessage("Literary movement can't be empty!", 5000);
            return false;
        }

        if (!dateOfBirth) {
            makeErrorMessage("Date of birth can't be empty!", 5000);
            return false;
        }

        if (!authorNationality) {
            makeErrorMessage("Authors nationality must be selected!", 5000);
            return false;
        }

        return true;
    }

    const handleSubmit = () => {
        if (validateAuthorInfo()) {
            setShowModal(false);
            if (croppedImage) {
                makeSnack('Trying to upload image...');
                const storageRef = ref(Base.storage, 'author-profiles/' + lastName.slice() + firstName.slice() + '.jpg');
                const uploadTask = uploadBytesResumable(storageRef, croppedImage);
                uploadTask.on('state_changed', (snapshot) => {

                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    makeSnack(`Uploading... ${progress}%`);

                }, (error) => {
                    makeErrorMessage(`Oopsie... ${error}`, 5000);
                    setShowModal(true);
                    return;
                }, () => {
                    makeSuccesMessage("Successfully uploaded authors image!");
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        addDoc(collection(Base.firestoreDB, "authors"), {
                            name: firstName + " " + lastName,
                            movement: literaryMovement,
                            birthday: dateOfBirth,
                            nationality: authorNationality,
                            author_image: downloadURL
                        }).then((docRef) => {
                            makeSuccesMessage("Successfully created authors profile!", 5000);
                            resetEverything();
                        }).catch(error => {
                            makeErrorMessage(`Oopsie... ${error}`, 5000);
                            return;
                        });
                    })
                });

            } else {
                addDoc(collection(Base.firestoreDB, "authors"), {
                    name: firstName + " " + lastName,
                    movement: literaryMovement,
                    birthday: dateOfBirth,
                    nationality: authorNationality,
                    author_image: ""
                }).then((docRef) => {
                    makeSuccesMessage("Successfully created authors profile!", 5000);
                    resetEverything();
                }).catch(error => {
                    makeErrorMessage(`Oopsie... ${error}`, 5000);
                    return;
                });
            }
        }
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
            startCropping();
        }
    }

    const resetEverything = () => {
        setFirstName("");
        setLastName("");
        setLiteraryMovement("");
        setDateOfBirth("");
        setAuthorNationality("");
        setShowModal(false);
        setSelectedAuthorImage(null);
        setSelectedImageURL(null);
        setShowCropper(false);
        setCroppedImage(null);
        setCroppedImageURL(null);
    }

    const listAuthors = () => {
        console.log(authors);
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
                    <div className="action-button-book" onClick={listAuthors}>
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
                        {selectedAuthorImage ? <img src={croppedImageURL} className='image-display-authors-modal' /> : <img src={profile_placeholder} className='image-display-authors-modal' />}
                        <RiIcons.RiEditCircleFill color='white' size={48} className='edit-image-authors-modal' onClick={handleOpenImageSelector} />
                    </div>
                </div>
            </Modal>
            <ImageCropper
                show={showCropper}
                image={selectedImageURL}
                aspect={1 / 1}
                onCancle={handleCropperCanceled}
                handleCroppingDone={handleCroppingDone}
            />
            <OptimizedSnackbar
                opened={snackbarOpened}
                setOpened={setSnackbarOpened}
                isAlert={isSnackbarAlert}
                setIsAlert={setIsSnackbarAlert}
                duration={snackbarDuration}
                setDuration={setSnackbarDuration}
                message={snackbarMessage}
                setMessage={setSnackbarMessage}
                type={snackbarAlertType}
            />
        </div>
    )
}
