import React, { useState } from 'react'

export default function BookSearchInput({ bookList, setSelectedBook }) {

    const [isFocused, setIsFocused] = useState(false);
    const [query, setQuery] = useState('');

    function selectBook(book) {
        setSelectedBook(book);
        setQuery(book.title + " [" + book.uid + "]");
        setIsFocused(false);
    }

    return (
        <div className='search-input-container'>
            <input type='text' placeholder='Book title or ID' onClick={() => setIsFocused(prev => !prev)} onChange={event => setQuery(event.target.value)} value={query} onKeyDown={() => setIsFocused(true)} />
            <div className='users-search-results-container' style={{ overflowY: 'scroll', maxHeight: '400px' }}>
                {isFocused ?
                    bookList.filter(book => {
                        if (query === '') {
                            return book;
                        } else if (book.title.toLowerCase().includes(query.toLowerCase()) || book.authorName.toLowerCase().includes(query.toLowerCase()) || book.uid.toLowerCase().includes(query.toLowerCase())) {
                            return book;
                        }
                    }).map((book) => (
                        <div key={book.uid} className={parseInt(book.amount) <= 0 ? 'book-search-item-unavailable' : 'book-search-item'} onClick={parseInt(book.amount) <= 0 ? () => { } : () => selectBook(book)}>
                            <img src={book.cover} height="50px" />
                            {parseInt(book.amount) <= 0 ?
                                <div>
                                    <p className='users-search-item-name'>{book.title + " [Unavailable]"}</p>
                                    <p className='users-search-item-uid'>{book.uid}</p>
                                </div>
                                :
                                <div>
                                    <p className='users-search-item-name'>{book.title + ", " + book.authorName}</p>
                                    <p className='users-search-item-uid'>{book.uid}</p>
                                </div>
                            }
                        </div>
                    ))
                    :
                    null
                }
            </div>
        </div>
    )
}
