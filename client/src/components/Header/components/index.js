import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Logout from '@material-ui/icons/ExitToApp';
import ActivityIcon from '@material-ui/icons/QueryBuilder';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const ControllerPanel = styled.div`
    text-align: right;
`;

const HeaderContainer = styled(Toolbar)`
    display: flex ;
    flex-direction: row ;
    justify-content: space-between;
`;

const ButtonCreateVoting = styled(Button)`
    margin-right: 25px !important;
`;

// FIXME: fix token management

class Header extends Component {
    state = {
      curLanguage: 'en',
    };

    cleanToken = () => {
      const { signOut } = this.props;

      localStorage.removeItem('token');
      signOut();
    };

    changeLanguage = (event) => {
      const { changeLanguage } = this.props;

      changeLanguage({
          lang: event.target.value
      });

      this.setState({
        curLanguage: event.target.value,
      });
    };

    render() {
      const { curLanguage } = this.state;

      return (
        <AppBar position='static'>
          <HeaderContainer>
            <Typography variant='h6' color='inherit' noWrap>
              <Link to='/'>VoteUp</Link>
            </Typography>
            <ControllerPanel>
              <ButtonCreateVoting variant='contained'>
                <Link to='/app/create/votings'>Create voting</Link>
              </ButtonCreateVoting>
              <IconButton color='inherit'>
                <ActivityIcon />
              </IconButton>
              <IconButton color='inherit'>
                <AccountCircle />
              </IconButton>
              <IconButton
                color='inherit'
                onClick={this.cleanToken}
              >
                <Logout />
              </IconButton>
              <Select
                value={curLanguage}
                onChange={this.changeLanguage}
                inputProps={{
                  name: 'age',
                }}
              >
                <MenuItem value='en'>
                  <em>EN</em>
                </MenuItem>
                <MenuItem value='ru'>RU</MenuItem>
              </Select>
            </ControllerPanel>
          </HeaderContainer>
        </AppBar>
      );
    }
}

export default Header;
