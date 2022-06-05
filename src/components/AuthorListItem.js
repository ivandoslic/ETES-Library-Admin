import React, { useState, useEffect } from 'react';
import base from '../base';
import * as GoIcons from 'react-icons/go';
import * as FiIcons from 'react-icons/fi';
import './AuthorListItem.css';

export default function AuthorListItem({ author }) {

    return (
        <div className='author-list-item-container'>
            <img src={author ? author.image : ''} style={{ height: '100%' }} />
            <div className='author-list-item-info-div'>
                <h3>{author.name}</h3>
                <h4>{author.uid}</h4>
            </div>
        </div>
    )
}