import React, {Component} from 'react';
import './Header.css';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import Menu from '../menu/Menu';

class Header extends Component {
    render() {
        return (
            <Toolbar>
                <ToolbarGroup>
                    <Menu>

                    </Menu>
                </ToolbarGroup>
                <ToolbarGroup>
                    <FontIcon>Cluj Tourist</FontIcon>
                </ToolbarGroup>
            </Toolbar>
        )
    }
}

export default Header;