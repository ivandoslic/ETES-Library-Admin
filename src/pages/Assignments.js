import React, { useState, useContext } from 'react'
import './Assignments.css'

import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add'
import BackIcon from '@mui/icons-material/Cancel'
import AssignmentIcon from '@mui/icons-material/Assignment';
import UserSearchInput from '../components/UserSearchInput';
import BookSearchInput from '../components/BookSearchInput';
import OptimizedSnackbar from '../components/OptimizedSnackbar';

import { FirebaseContentContext } from '../FirebaseContent';
import { addDoc, collection, setDoc, doc } from 'firebase/firestore'
import base from '../base'
import AssignmentListItem from '../components/AssignmentListItem'

function Assignments() {

    const [assignmentEdit, setAssignmentEdit] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedBook, setSelectedBook] = useState(null);
    const [dateOfAssignment, setDateOfAssignment] = useState('');
    const [dateToReturn, setDateToReturn] = useState('');
    const [query, setQuery] = useState("");

    const firestoreData = useContext(FirebaseContentContext);
    const books = firestoreData.books;
    const users = firestoreData.users;
    const assignments = firestoreData.assignments;

    // Snackbar:
    const [snackbarOpened, setSnackbarOpened] = useState(false);
    const [isSnackbarAlert, setIsSnackbarAlert] = useState(false);
    const [snackbarDuration, setSnackbarDuration] = useState(null);
    const [snackbarMessage, setSnackbarMessage] = useState(null);
    const [snackbarAlertType, setSnackbarAlertType] = useState('success');

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

    const finishEdit = () => {
        setSelectedBook(null);
        setSelectedUser(null);
        setDateOfAssignment('');
        setDateToReturn('');
        setAssignmentEdit(false);
    }

    const setEditingMode = () => {
        setAssignmentEdit(prev => !prev);
    }

    const validateAndUpload = () => {
        if (!validateData())
            return;

        makeSnack("Assigning a book to user...");

        addDoc(collection(base.firestoreDB, "assignments"), {
            userId: selectedUser.uid,
            userName: selectedUser.name,
            bookId: selectedBook.uid,
            dateOfAssignment: dateOfAssignment,
            dateToReturn: dateToReturn,
            active: true
        }).then((docRef) => {
            const userRef = doc(base.firestoreDB, 'users', selectedUser.uid);
            setDoc(userRef, { hasBook: true, bookBorrowed: selectedBook.uid }, { merge: true });

            const bookRef = doc(base.firestoreDB, 'books', selectedBook.uid);
            var newAmount = parseInt(selectedBook.amount) - 1;
            setDoc(bookRef, { amount: newAmount.toString() }, { merge: true });

            base.sendMessageToUser(selectedUser.fcmToken, "You were assigned a book!", `${selectedBook.title} by ${selectedBook.authorName} was assigned to you by the librarian. Happy reading!`);
            makeSuccessMessage("Assignment successfully made!");
            finishEdit();

        }).catch(error => {
            makeErrorMessage("Ooops an error occured while assigning!");
            return;
        })
    }

    function validateData() {
        if (selectedUser === null) {
            makeErrorMessage("User must be selected!", 5000);
            return false;
        }

        if (selectedBook === null) {
            makeErrorMessage("Book must be selected!", 5000);
            return false;
        }

        if (dateOfAssignment === '') {
            makeErrorMessage("Date of assignment must be set!", 5000);
            return false;
        }

        if (dateToReturn === '') {
            makeErrorMessage("Date to return must be set!", 5000);
            return false;
        }

        if (selectedUser.hasBook) {
            makeErrorMessage("Can't assign! User already has a book assigned!", 5000);
            return false;
        }

        if (parseInt(selectedBook.amount) <= 0) {
            makeErrorMessage("Can't assign! This book is unavailable!", 5000);
            return false;
        }

        return true;
    }

    if (assignmentEdit) {
        return (
            <div className='assignments-edit-screen'>
                <p className='title-label-assignments-edit'>Assign a book</p>
                <UserSearchInput usersList={users} setSelectedUser={setSelectedUser} />
                <BookSearchInput bookList={books} setSelectedBook={setSelectedBook} />
                <div className='assignments-labeled-input-container'>
                    <p>Date of assignment:</p>
                    <input type="date" aria-label='Date of assignment' value={dateOfAssignment} onChange={e => setDateOfAssignment(e.target.value)} />
                </div>
                <div className='assignments-labeled-input-container'>
                    <p>Date to return:</p>
                    <input type="date" aria-label='Date to return' value={dateToReturn} onChange={e => setDateToReturn(e.target.value)} />
                </div>
                <div className='assignments-edit-button-container'>
                    <div className='assignment-edit-button' onClick={finishEdit}>
                        <BackIcon />
                        Cancel
                    </div>
                    <div className='assignment-edit-button' onClick={validateAndUpload}>
                        <AssignmentIcon />
                        Assign
                    </div>
                </div>
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

    return (
        <div>
            <div className="header-assignments">
                <h1>ASSIGNMENTS</h1>
                <p>In this section you are able to<br />add, edit and manage all authors of<br />books that you possess in your library</p>
            </div>
            <div className='footer-assignments'>
                <input type='text' placeholder='Search assignments...' className='assignments-search-container' value={query} onChange={event => setQuery(event.target.value)} />
                <div className='assignments-list-container'>
                    {assignments.length > 0 ?
                        <div>
                            {assignments.filter(assignment => {
                                if (query === '') {
                                    return assignment;
                                } else if (assignment.uid.toLowerCase().includes(query.toLowerCase()) || assignment.userName.toLowerCase().includes(query.toLowerCase())) {
                                    return assignment;
                                }
                            }).map((assignment) => (
                                <AssignmentListItem key={assignment.uid} assignment={assignment} parentSnackbarSuccessMessage={makeSuccessMessage} parentSnackbarErrorMessage={makeErrorMessage} />
                            ))}
                        </div>
                        :
                        <div>
                            <p style={{ color: 'white' }}>Oops no assignments...</p>
                        </div>
                    }
                </div>
            </div>
            <Fab variant="extended" size="medium" color="primary" aria-label="assign" onClick={setEditingMode}>
                <AddIcon />
                Assign
            </Fab>
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

export default Assignments