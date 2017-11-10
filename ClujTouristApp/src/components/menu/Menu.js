import React, { Component } from 'react';

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import Download from 'material-ui/svg-icons/file/file-download';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

class Menu extends Component {
    render() {
        return (
            <IconMenu
                iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                targetOrigin={{horizontal: 'left', vertical: 'top'}}
            >
                <MenuItem value="Home" primaryText="Home" />
                <MenuItem
                    primaryText="Locations"
                    rightIcon={<ArrowDropRight />}
                    menuItems={[
                        <MenuItem primaryText="Art" />,
                        <Divider />,
                        <MenuItem primaryText="Restaurants" />,
                        <Divider />,
                        <MenuItem primaryText="Housing" />,
                        <Divider />,
                        <MenuItem primaryText="Clubs" />,
                    ]}
                />
                <MenuItem value="Del" primaryText="Log Out" />
            </IconMenu>
        );
    }
};

export default Menu;
