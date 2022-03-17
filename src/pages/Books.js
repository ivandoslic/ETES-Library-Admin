import React, { useState, useEffect, useContext, useRef } from 'react';
import './Books.css';
import logo1 from '../res/add-book.png';
import logo2 from '../res/list-books.png';
import Modal from '../components/Modal';
import * as MdIcons from 'react-icons/md';
import { FirebaseContentContext } from '../FirebaseContent';
import ImageCropper from '../components/ImageCropper';
import profile_placeholder from '../res/author-profile-placeholder.jpg';
import languages from '../res/languages.json';
import * as RiIcons from 'react-icons/ri';
import OptimizedSnackbar from '../components/OptimizedSnackbar';
import base from '../base';
import { getDownloadURL, uploadBytesResumable, ref } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
import { addToAlgoliaIndex } from '../AlgoliaSearchContext'

function Books() {
    const [showModal, setShowModal] = useState(false);

    // Form data:
    const [booksTitle, setBooksTitle] = useState('');
    const [yearWritten, setYearWritten] = useState('');
    const [bookAmount, setBookAmount] = useState(0);
    const [bookLanguage, setBookLanguage] = useState('');
    const [bookGenre, setBookGenre] = useState('');
    const [bookDescription, setBookDescription] = useState('');

    // Authors:
    const firestoreData = useContext(FirebaseContentContext);
    const authors = firestoreData.authors;
    const [selectedAuthor, setSelectedAuthor] = useState('');
    const [selectedAuthorObj, setSelectedAuthorObj] = useState(authors[0]);

    // Author image:
    const imageFileElement = useRef();
    const [selectedBookImage, setSelectedBookImage] = useState(null);
    const [selectedBookImageURL, setSelectedBookImageURL] = useState(null);
    const [showCropper, setShowCropper] = useState(false);
    const [croppedBookImageURL, setCroppedBookImageURL] = useState(null);
    const [croppedBookImage, setCroppedBookImage] = useState(null);

    // Snackbar:
    const [snackbarOpened, setSnackbarOpened] = useState(false);
    const [isSnackbarAlert, setIsSnackbarAlert] = useState(false);
    const [snackbarDuration, setSnackbarDuration] = useState(null);
    const [snackbarMessage, setSnackbarMessage] = useState(null);
    const [snackbarAlertType, setSnackbarAlertType] = useState('success');

    useEffect(() => {
        if (selectedAuthor !== null && selectedAuthor.slice() !== '')
            getAuthorByID(selectedAuthor);
    }, [selectedAuthor]);

    const activatePopup = () => {
        setShowModal(prev => !prev);
    }

    const getAuthorByID = (uid) => {
        authors.forEach((val, key) => {
            if (val.uid === uid) {
                setSelectedAuthorObj(val);
            }
        });
    }

    const handleOpenImageSelector = () => {
        imageFileElement.current.click();
    }

    const handleImageChange = event => {
        if (event.target.files && event.target.files.length === 1) {
            setSelectedBookImage(event.target.files[0]);
            setSelectedBookImageURL(URL.createObjectURL(event.target.files[0]));
            startCropping();
        }
    }

    const startCropping = () => {
        setShowModal(false);
        setShowCropper(true);
    }

    const handleCropperCanceled = () => {
        setSelectedBookImage(null);
        setSelectedBookImageURL(null);
        setShowCropper(false);
        setShowModal(true);
    }

    const handleCroppingDone = (croppedImage) => {
        const croppedImageUrl = URL.createObjectURL(croppedImage);
        setCroppedBookImageURL(croppedImageUrl);
        setCroppedBookImage(croppedImage);
        setShowCropper(false);
        setShowModal(true);
    }

    const makeSnack = (message, duration) => {
        setSnackbarMessage(message);
        setSnackbarDuration(duration);
        setSnackbarOpened(true);
    }

    const makeErrorMessage = (message, duration) => {
        setIsSnackbarAlert(true);
        setSnackbarDuration(duration);
        setSnackbarMessage(message);
        setSnackbarAlertType('error');
        setSnackbarOpened(true);
    }

    const makeSuccessMessage = (message, duration) => {
        setIsSnackbarAlert(true);
        setSnackbarDuration(duration);
        setSnackbarMessage(message);
        setSnackbarAlertType('success');
        setSnackbarOpened(true);
    }

    const resetEverything = () => {
        setBooksTitle('');
        setYearWritten('');
        setBookAmount(0);
        setBookLanguage('');
        setBookGenre('');
        setBookDescription('');
        setSelectedAuthor('');
        setSelectedAuthorObj(null);
        setShowModal(false);
        setSelectedBookImage(null)
        setSelectedBookImageURL(null);
        setShowCropper(false);
        setCroppedBookImage(null);
        setCroppedBookImageURL(null);
    }

    // Submiting data:

    const validateBookInfo = () => {
        if (booksTitle.slice() === '' || booksTitle === null) {
            makeErrorMessage("Book has to have a title!", 5000);
            return false;
        }

        if (yearWritten.slice() === '' || yearWritten === null) {
            // TODO : make regex check so that only digits can be entered

            makeErrorMessage("Please set the year book was written/released!", 5000);
            return false;
        }

        if (bookAmount === 0 || null) {
            makeErrorMessage("Please set number of books!", 5000);
            return false;
        }

        if (bookLanguage === null) {
            makeErrorMessage("Please set language the book is written in!", 5000);
            return false;
        }

        if (bookGenre.slice() === '' || bookGenre === null) {
            makeErrorMessage("Please set books genre!", 5000);
            return false;
        }

        return true;
    }

    const handleSubmit = () => {
        if (!validateBookInfo())
            return;

        setShowModal(false);
        if (croppedBookImage) {
            makeSnack('Trying to upload image...');
            const storageRef = ref(base.storage, 'book-covers/' + booksTitle.slice() + yearWritten.slice() + '.jpg');
            const uploadTask = uploadBytesResumable(storageRef, croppedBookImage);
            uploadTask.on('state_changed', (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                makeSnack(`Uploading ${progress}%`);
            }, (error) => {
                makeErrorMessage(`Oopsie... ${error}`, 5000);
                setShowModal(true);
                return;
            }, () => {
                makeSuccessMessage('Successfully uploaded books image!');
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    addDoc(collection(base.firestoreDB, "books"), {
                        title: booksTitle,
                        authorName: selectedAuthorObj.name,
                        author: {
                            uid: selectedAuthorObj.uid,
                            name: selectedAuthorObj.name,
                            movement: selectedAuthorObj.movement,
                            birthday: selectedAuthorObj.birthday,
                            nationality: selectedAuthorObj.nationality,
                            image: selectedAuthorObj.image
                        },
                        yearWritten: yearWritten,
                        amount: bookAmount,
                        language: bookLanguage,
                        genre: bookGenre,
                        description: bookDescription,
                        cover: downloadURL
                    }).then((docRef) => {
                        const bookDataForAlgolia = {
                            objectID: docRef.id,
                            title: booksTitle,
                            author: selectedAuthorObj.name,
                            description: bookDescription,
                            cover: downloadURL
                        }
                        addToAlgoliaIndex(bookDataForAlgolia);
                        makeSuccessMessage("Successfully added book to database!", 5000);
                        resetEverything();
                    }).catch(error => {
                        makeErrorMessage(`Oopsie... ${error}`, 5000);
                        return;
                    });
                });
            });
        } else {
            addDoc(collection(base.firestoreDB, "books"), {
                title: booksTitle,
                authorName: selectedAuthorObj.name,
                author: {
                    uid: selectedAuthorObj.uid,
                    name: selectedAuthorObj.name,
                    movement: selectedAuthorObj.movement,
                    birthday: selectedAuthorObj.birthday,
                    nationality: selectedAuthorObj.nationality,
                    image: selectedAuthorObj.image
                },
                yearWritten: yearWritten,
                amount: bookAmount,
                language: bookLanguage,
                genre: bookGenre,
                description: bookDescription,
                cover: ""
            }).then((docRef) => {
                const bookDataForAlgolia = {
                    objectID: docRef.id,
                    title: booksTitle,
                    author: selectedAuthorObj.name,
                    description: bookDescription
                }
                addToAlgoliaIndex(bookDataForAlgolia);
                makeSuccessMessage("Successfully added book to database!", 5000);
                resetEverything();
            }).catch(error => {
                makeErrorMessage(`Oopsie... ${error}`, 5000);
                console.log(error);
                return;
            });
        }
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
            <Modal show={showModal} setShow={activatePopup}>
                <div className='left-side-books-modal'>
                    <p>New Book</p>
                    <input type='text' placeholder='Book title' value={booksTitle} onChange={event => setBooksTitle(event.target.value)} />
                    <select value={selectedAuthor} onChange={event => setSelectedAuthor(event.target.value)}>
                        {authors.map((val, key) => {
                            return <option key={key} value={val.uid}>{val.name}</option>
                        })}
                    </select>
                    <input type='text' placeholder='1999' value={yearWritten} onChange={event => setYearWritten(event.target.value)} />
                    <label>Amount of books:</label>
                    <input type='number' value={bookAmount} onChange={event => setBookAmount(event.target.value)} />
                    <select value={bookLanguage} onChange={event => setBookLanguage(event.target.value)}>
                        {languages.map((val, key) => {
                            return <option key={key} value={val.English}>{val.English}</option>
                        })}
                    </select>
                    <input type='text' placeholder='Genre' value={bookGenre} onChange={event => setBookGenre(event.target.value)} />
                    <textarea placeholder='Book description' value={bookDescription} onChange={event => setBookDescription(event.target.value)}></textarea>
                    <button onClick={handleSubmit}>Submit</button>
                </div>
                <div className='right-side-books-modal'>
                    <div className='upper-rsam'>
                        <MdIcons.MdClose className='close-icon-modal' size={32} color='white' onClick={activatePopup} />
                    </div>
                    <div className='lower-rsam'>
                        <input type='file' accept='.jpg,.png,.jpeg' ref={imageFileElement} onChange={handleImageChange} style={{ display: 'none' }} />
                        {selectedBookImage ? <img src={croppedBookImageURL} className='image-display-books-modal' /> : <img src={profile_placeholder} className='image-display-books-modal' />}
                        <RiIcons.RiEditCircleFill color='white' size={48} className='edit-image-authors-modal' onClick={handleOpenImageSelector} />
                    </div>
                </div>
            </Modal>
            <ImageCropper
                show={showCropper}
                image={selectedBookImageURL}
                aspect={1 / 1.5}
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

export default Books;
