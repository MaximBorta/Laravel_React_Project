import * as React from 'react';
import PropTypes from 'prop-types'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    height: 'auto',
    minWidth: 200,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const ModalComponent = ({src, alt}) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <div>
            <img className="home-card-img" onClick={handleOpen} src={src} alt={alt}/>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <>
                        <img style={{width: '100%'}} src={src} alt={alt}/>
                    </>
                </Box>
            </Modal>
        </div>
    );
}
ModalComponent.propTypes = {
    alt: PropTypes.string,
    src: PropTypes.string,
}

export default ModalComponent