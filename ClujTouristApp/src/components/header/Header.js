import React, {Component} from 'react';
import './Header.css';
import FontIcon from 'material-ui/FontIcon';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import Menu from '../menu/Menu';

class Header extends Component {
    render() {
        return (
            <Toolbar>
                <ToolbarGroup>
                    <Menu/>
                </ToolbarGroup>
                <ToolbarGroup>
                    <FontIcon>Welcome, (user)</FontIcon>
                </ToolbarGroup>
            </Toolbar>
        )
    }
}

export default Header;