import React, { useState, useEffect } from 'react';
import base from '../base';
import * as GoIcons from 'react-icons/go';
import * as FiIcons from 'react-icons/fi';
import './BookListItem.css';

export default function BookListItem({ book }) {

    return (
        <div className='book-list-item-container'>
            <img src={book ? book.cover : ''} style={{ height: '100%' }} />
            <div className='book-list-item-info-div'>
                <h3>{book.title}</h3>
                <h4>{book.authorName}</h4>
            </div>
        </div>
    )
}
