import React, { useEffect } from 'react';
import Base from './base';
import { collection, onSnapshot } from 'firebase/firestore';

var authors = [];
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

function deleteFromAuthorsByID(authorID) {
    if (authors !== null && authors.length !== null) {
        authors.forEach((author, idx) => {
            if (authors.uid === authorID) {
                authors.slice(idx, 1);
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

    return (
        <FirebaseContentContext.Provider value={authors}>{children}</FirebaseContentContext.Provider>
    )
}