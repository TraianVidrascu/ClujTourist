import React, {Component} from 'react';
import './App.css';
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Menu from "./components/menu/Menu";

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

class App extends Component {
    render() {
        return (
        <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
            <div className="App">
                <div className="App-header">
                    <Header>

                    </Header>
                </div>
                <p className="App-intro">

                </p>
                <div className="App-footer">
                    <Footer/>
                </div>
            </div>
        </MuiThemeProvider>
        );
    }
}

export default App;
