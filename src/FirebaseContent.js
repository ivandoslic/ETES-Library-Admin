import React, { useEffect } from 'react';
import Base from './base';
import { collection, onSnapshot } from 'firebase/firestore';
import { addToAlgoliaIndex } from './AlgoliaSearchContext';

var authors = [];
var books = [];
var users = [];
var assignments = [];

export const FirebaseContentContext = React.createContext();

function updateAuthorsJSON(doc) {
    if (authors === null)
        authors = new Array();

    if (authors.length !== 0) {
        authors.forEach((author, idx) => {
            if (author.uid === doc.id) {
                authors.splice(idx, 1);
            }
        });
    }

    const authorData = doc.data();

    authors.push({
        uid: doc.id,
        name: authorData.name,
        movement: authorData.movement,
        birthday: authorData.birthday,
        nationality: authorData.nationality,
        image: authorData.author_image
    })
}

function updateBooksJSON(doc) {
    if (books === null)
        books = new Array();

    if (books.length !== 0) {
        books.forEach((book, idx) => {
            if (book.uid === doc.id) {
                books.splice(idx, 1);
            }
        });
    }

    const bookData = doc.data();

    books.push({
        uid: doc.id,
        authorName: bookData.authorName,
        cover: bookData.cover,
        genre: bookData.genre,
        language: bookData.language,
        title: bookData.title,
        year: bookData.yearWritten,
        amount: bookData.amount
    });
}

function updateUsersJSON(doc) {
    if (users === null)
        users = new Array();

    if (users.length !== 0) {
        users.forEach((user, idx) => {
            if (user.uid === doc.id) {
                users.splice(idx, 1);
            }
        });
    }

    const userData = doc.data();

    console.log(userData);

    users.push({
        uid: doc.id,
        name: userData.name,
        image: userData.image,
        year: userData.schoolingYear,
        email: userData.email,
        gender: userData.gender,
        hasBook: userData.hasBook,
        fcmToken: userData.fcmToken
    })
}

function updateAssignmentsJSON(doc) {
    if (assignments === null)
        assignments = new Array();

    if (assignments.length !== 0) {
        assignments.forEach((assignment, idx) => {
            if (assignment.uid === doc.id) {
                assignments.splice(idx, 1);
            }
        });
    }

    const assignmentData = doc.data();

    assignments.push({
        uid: doc.id,
        active: assignmentData.active,
        bookId: assignmentData.bookId,
        userId: assignmentData.userId,
        userName: assignmentData.userName,
        dateOfAssignment: assignmentData.dateOfAssignment,
        dateToReturn: assignmentData.dateToReturn
    });
}

function deleteFromAuthorsByID(authorID) {
    if (authors !== null && authors.length !== null) {
        authors.forEach((author, idx) => {
            if (author.uid === authorID) {
                authors.slice(idx, 1);
                return;
            }
        })
    }
}

function deleteFromBooksByID(bookID) {
    if (books !== null && books.length !== null) {
        books.forEach((book, idx) => {
            if (book.uid === bookID) {
                books.slice(idx, 1);
                return;
            }
        })
    }
}

function deleteFromUsersByID(userID) {
    if (users !== null && users.length !== null) {
        users.forEach((user, idx) => {
            if (user.uid === userID) {
                users.slice(idx, 1);
                return;
            }
        })
    }
}

function deleteFromAssignmentsByID(assignmentID) {
    if (assignments !== null && assignments.length !== null) {
        assignments.forEach((assignment, idx) => {
            if (assignment.uid === assignmentID) {
                assignments.splice(idx, 1);
                return;
            }
        })
    }
}

export function FirebaseContentProvider({ children }) {
    useEffect(() => {
        const col = collection(Base.firestoreDB, 'authors');
        const unsubscribe = onSnapshot(col, (snap) => {
            snap.docChanges().forEach((change) => {
                if (change.type === 'added' || change.type === 'modified') {
                    updateAuthorsJSON(change.doc);
                }
                if (change.type === 'removed') {
                    deleteFromAuthorsByID(change.doc.id);
                }
            })
        })
        return () => {
            unsubscribe();
        }
    }, []);

    useEffect(() => {
        const bookCol = collection(Base.firestoreDB, 'books');
        const booksUnsub = onSnapshot(bookCol, (snap) => {
            snap.docChanges().forEach((change) => {
                if (change.type === 'added' || change.type === 'modified') {
                    updateBooksJSON(change.doc);
                }

                if (change.type === 'removed') {
                    deleteFromBooksByID(change.doc.id);
                }
            })
        })
        return () => {
            booksUnsub();
        }
    }, []);

    useEffect(() => {
        const usersCol = collection(Base.firestoreDB, 'users');
        const userUnsub = onSnapshot(usersCol, (snap) => {
            snap.docChanges().forEach((change) => {
                if (change.type === 'added' || change.type === 'modified') {
                    updateUsersJSON(change.doc);
                }

                if (change.type === 'removed') {
                    deleteFromUsersByID(change.doc.id);
                }
            })
        })
        return () => {
            userUnsub();
        }
    }, []);

    useEffect(() => {
        const assignmentsCol = collection(Base.firestoreDB, 'assignments');
        const assignmentsUnsub = onSnapshot(assignmentsCol, (snap) => {
            snap.docChanges().forEach((change) => {
                if (change.type === 'added' || change.type === 'modified') {
                    updateAssignmentsJSON(change.doc);
                }

                if (change.type === 'removed') {
                    deleteFromAssignmentsByID(change.doc.id);
                }
            })
        })
    })

    return (
        <FirebaseContentContext.Provider value={{
            authors: authors,
            books: books,
            users: users,
            assignments: assignments
        }}> {children}</FirebaseContentContext.Provider >
    )
}