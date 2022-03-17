import React, { useState, useContext, useEffect } from 'react'
import { FirebaseContentContext } from '../FirebaseContent';
import base from '../base';
import { setDoc, doc, deleteDoc } from 'firebase/firestore'
import * as GoIcons from 'react-icons/go'
import './AssignmentListItem.css'

import * as FiIcons from 'react-icons/fi';

export default function AssignmentListItem({ assignment, parentSnackbarSuccessMessage, parentSnackbarErrorMessage }) {

    const firestoreData = useContext(FirebaseContentContext);
    const books = firestoreData.books;
    const users = firestoreData.users;

    const [assignmentUser, setAssignmentUser] = useState(null);
    const [assignmentBook, setAssignmentBook] = useState(null);
    const [optionsOpened, setOptionsOpened] = useState(false);

    useEffect(() => {
        users.forEach((user, idx) => {
            if (assignment.userId === user.uid) {
                setAssignmentUser(user);
            }
        });

        books.forEach((book, idx) => {
            if (assignment.bookId === book.uid) {
                setAssignmentBook(book);
            }
        });
    }, []);

    const endAssignment = () => {
        try {
            const assignmentRef = doc(base.firestoreDB, 'assignments', assignment.uid);
            setDoc(assignmentRef, { active: false }, { merge: true });

            const userRef = doc(base.firestoreDB, 'users', assignmentUser.uid);
            setDoc(userRef, { hasBook: false, bookBorrowed: "" }, { merge: true });

            const bookRef = doc(base.firestoreDB, 'books', assignmentBook.uid);
            var newAmount = parseInt(assignmentBook.amount) + 1;
            setDoc(bookRef, { amount: newAmount.toString() }, { merge: true });

            base.sendMessageToUser(assignmentUser.fcmToken, "Your assignment was closed", `Your assignment of ${assignmentBook.title} was closed by the librarian. We would realy appreciate if you would write a review on a book you just read.`)

            parentSnackbarSuccessMessage("Assignment successfuly ended!");
        } catch (e) {
            parentSnackbarErrorMessage("Oops, an error has occured!");
        }
    }

    const deleteAssignment = () => {
        try {
            const assignmentRef = doc(base.firestoreDB, 'assignments', assignment.uid);
            deleteDoc(assignmentRef);
            parentSnackbarSuccessMessage("Assignment successfuly deleted!");
        } catch (e) {
            parentSnackbarErrorMessage("Couldn't delete assignment, sorry!");
        }
    }

    const notifyUserOfDeadline = () => {
        base.sendMessageToUser(assignmentUser.fcmToken, "Reminder to return your book", "Librarian wants you to know that your deadline is soon or it has already passed so please return the book as soon as you can. Thank you!");
    }

    return (
        <div className='assignment-list-item-container'>
            <img src={assignmentUser ? assignmentUser.image : ''} />
            <div className='assignment-list-item-info-user-book'>
                <p className='assignment-list-item-title'>{assignmentUser && assignmentBook ? assignmentUser.name + " - " + assignmentBook.title : ""}</p>
                <p>Assignment ID: {assignment.uid} {assignment.active ? <GoIcons.GoPrimitiveDot color='green' /> : <GoIcons.GoPrimitiveDot color='red' />} {assignment.active ? "active" : "closed"}</p>
            </div>
            <div className='assignment-list-item-info-dates'>
                <p>Date of assignment: {assignment.dateOfAssignment}</p>
                <p>Date to return: {assignment.dateToReturn}</p>
            </div>
            <div className='assignment-list-item-options-button'>
                <FiIcons.FiMoreVertical className='assignment-list-item-options-button-icon' size={18} onClick={() => setOptionsOpened(prev => !prev)} />
                {optionsOpened ?
                    assignment.active ?
                        <div className='assignment-list-item-options-container'>
                            <div className='assignment-item-options-item' onClick={endAssignment}>
                                <p>End assignment</p>
                            </div>
                            <div className='assignment-item-options-item' onClick={notifyUserOfDeadline}>
                                <p>Nofity user</p>
                            </div>
                        </div>
                        :
                        <div className='assignment-list-item-options-container'>
                            <div className='assignment-item-options-item' onClick={deleteAssignment}>
                                <p>Delete permanently</p>
                            </div>
                        </div>
                    :
                    null
                }
            </div>
        </div>
    )
}
