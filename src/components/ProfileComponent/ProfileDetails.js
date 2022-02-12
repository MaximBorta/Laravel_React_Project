import React from 'react'


const ProfileDetails = (props) => {
    const {data} = props
    return (
        <div>
            <h4>Name: {data.data.name}</h4>
            <h4>Email: {data.data.email}</h4>
            <img
                style={{width: '100%', height: '100%'}}
                src={`http://localhost:8000/avatars/${data.data.user_avatar}`}
                alt={data.data.name}
            />
        </div>
    )
}

export default ProfileDetails