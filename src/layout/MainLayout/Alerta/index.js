import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';

export default function Alerta({ message }) {
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const action = (
        <React.Fragment key="alert">
            <Button color="secondary" size="small" onClick={handleClose}>
                CERRAR
            </Button>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    return (
        <div>
            {handleClick()}
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} message={message} action={action} />
        </div>
    );
}

Alerta.propTypes = {
    message: PropTypes.string.isRequired
};
