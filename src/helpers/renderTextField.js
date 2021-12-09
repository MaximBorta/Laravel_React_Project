import {TextField} from "@material-ui/core";
import React from "react";

export const renderTextField = ({
    label,
    input,
    meta: {touched, invalid, error},
    ...custom
}) => (
    <TextField
        label={label}
        placeholder={label}
        error={touched && invalid}
        helperText={touched && error}
        {...input}
        {...custom}
    />
)