import React, { useState } from 'react'
import './UserSearchInput.css'

export default function UserSearchInput({ usersList, setSelectedUser }) {

    const [isFocused, setIsFocused] = useState(false);
    const [query, setQuery] = useState("");

    function selectUser(user) {
        setSelectedUser(user);
        setQuery(user.name + " [" + user.uid + "]");
        setIsFocused(false);
    }

    return (
        <div className='search-input-container'>
            <input type='text' placeholder='Students name or ID' onClick={() => setIsFocused(prev => !prev)} onChange={e => setQuery(e.target.value)} value={query} onKeyDown={() => setIsFocused(true)} />
            <div className='users-search-results-container'>
                {isFocused ?
                    usersList.filter(user => {
                        if (query === '') {
                            return user;
                        } else if (user.name.toLowerCase().includes(query.toLowerCase()) || user.uid.toLowerCase().includes(query.toLowerCase())) {
                            return user;
                        }
                    }).map((user) => (
                        <div key={user.uid} className={user.hasBook ? 'users-search-item-unavailable' : 'users-search-item'} onClick={user.hasBook ? () => { } : () => selectUser(user)}>
                            <img src={user.image} height='50px' />
                            {user.hasBook ?
                                <div>
                                    <p className='users-search-item-name'>{user.name}, {user.year}. year</p>
                                    <p className='users-search-item-uid'>[Has a book can't assign]</p>
                                </div>
                                :
                                <div>
                                    <p className='users-search-item-name'>{user.name}, {user.year}. year</p>
                                    <p className='users-search-item-uid'>{user.uid}</p>
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
