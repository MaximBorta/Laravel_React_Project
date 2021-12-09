import React, {Component} from 'react';
import {Box, Button, CircularProgress, TextField, Typography} from "@material-ui/core";
import AlertComponent from "../../helpers/AlertComponent";

class EditForm extends Component {

    render() {
        return (
            <div>
                {
                    this.props.editedResponse.success === true
                    && <AlertComponent authResponse={this.props.editedResponse.message}/>
                }
                <form onSubmit={this.props.onEditProfileSubmit}>
                    <Box marginTop={2} width={'100%'}>
                        {
                            this.props.editedResponse.success === false
                            && <Typography color={"secondary"}>{this.props.editedResponse.message.name}</Typography>
                        }
                        <TextField
                            name={'name'}
                            fullWidth={true}
                            label="name"
                            onChange={this.props.onEditProfileChange}
                            variant={'outlined'}
                            value={this.props.fields.name}
                        />
                    </Box>
                    <Box marginTop={2} width={'100%'}>
                        {
                            this.props.editedResponse.success === false
                            && <Typography color={"secondary"}>{this.props.editedResponse.message.email}</Typography>
                        }
                        <TextField
                            name={'email'}
                            fullWidth={true}
                            label="email"
                            onChange={this.props.onEditProfileChange}
                            variant={'outlined'}
                            value={this.props.fields.email}
                        />
                    </Box>
                    <Box marginTop={2} width={'100%'}>
                        <Button
                            variant={"outlined"}
                            color={"primary"}
                            type="submit"
                            fullWidth={true}
                        >
                            {
                                this.props.isEditing === true
                                ? <CircularProgress />
                                : <Typography>Update</Typography>
                            }
                        </Button>
                    </Box>
                </form>
            </div>
        );
    }
}

export default EditForm;