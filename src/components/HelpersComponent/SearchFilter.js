import React from 'react'
import {TextField} from "@mui/material";

export const SearchFilter = ({searchTerm, onSearchChange}) => {
    return (
        <>
            <TextField
                fullWidth={true}
                label={'search...'}
                id={'search'}
                value={searchTerm}
                onChange={onSearchChange}
            />
        </>
    )
}