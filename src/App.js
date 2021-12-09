import React from 'react'
import './App.css';
import {ScrollToTop} from "./components/HelpersComponent/ScrollToTop";
import {Fab} from "@material-ui/core";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Routes from "./components/HelpersComponent/Routes";


function App(props) {

  return (
    <div>
        <Routes />
        <ScrollToTop {...props}>
            <Fab color="primary" size="small" aria-label="scroll back to top">
                <KeyboardArrowUpIcon/>
            </Fab>
        </ScrollToTop>
    </div>
  );
}

export default App;
