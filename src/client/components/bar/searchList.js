import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SearchList = ({ data: { usersSearch: { users } } }) => {
    const [show, setShowList] = useState(false);

    const handleShow = (show) => {
        if (show) {
            document.addEventListener('click', handleShow.bind(null, !show), true);
        } else {
            document.removeEventListener('click', handleShow.bind(null, !show), true);
        }
        setShowList(show);
    }

    const showList = (users) => {
        if (users.length) {
            handleShow(true);
        } else {
            handleShow(false);
        }
    }

    useEffect(() => {
        showList(users);
    }, [users]);

    useEffect(() => {
        return () => {
            document.removeEventListener('click', handleShow.bind(null, !show), true);
        }
    });

    return (
        show &&

        <div className="result">
            {users.map((user, i) =>
                <Link to={'/user/' + user.username}>
                    <div key={user.id} className="user">
                        <img src={user.avatar} />
                        <span>{user.username}</span>
                    </div>
                </Link>

            )}
        </div>
    )
}

export default SearchList