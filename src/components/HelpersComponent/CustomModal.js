import React from 'react'
import Modal from "@mui/material/Modal";
import PropTypes from 'prop-types'

const style = {
    position: 'absolute',
    left: '15%',
    top: '15%',
    width: '70%',
    height: 400,
    minWidth: 200,
    minHeight: 400,
    overflow: 'auto',
    backgroundColor: '#fff',
    boxShadow: '6px 6px 6px rgba(0, 0, 0, .5)',
    padding: 20,
};


const CustomModal = ({isActive, children, title, handleClose}) => {
    return (
        <div>
            <Modal
                open={isActive}
                onClose={handleClose}
            >
                <div style={style}>
                    <h2>{title}</h2>
                    {children}
                </div>
            </Modal>
        </div>
    )
}
CustomModal.propTypes = {
    isActive: PropTypes.bool.isRequired,
    children: PropTypes.element.isRequired,
    title: PropTypes.string.isRequired,
    handleClose: PropTypes.func.isRequired
}
export default CustomModal