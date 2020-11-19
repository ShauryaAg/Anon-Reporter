import React from 'react';
import { Button, Divider, Grid, Icon, Menu, } from "semantic-ui-react";
import ReportForm from "./ReportForm";

class Dashboard extends React.Component {

  state = {
    dropdownMenuStyle: {
      display: "none"
    }
  };

  handleToggleDropdownMenu = () => {
    let newState = Object.assign({}, this.state);
    if (newState.dropdownMenuStyle.display === "none") {
      newState.dropdownMenuStyle = { display: "flex" };
    } else {
      newState.dropdownMenuStyle = { display: "none" };
    }

    this.setState(newState);
  };
  
  render() {
    return (
      <div>
        <Grid padded>
          <Menu size="large" inverted borderless fluid fixed="top">
            <Menu.Item header as="a">
              ANON
            </Menu.Item>
            <Menu.Menu position="right">
              <Menu.Item as="a">Report</Menu.Item>
              <Menu.Item as="a">History</Menu.Item>
              <Menu.Item as="a">Help</Menu.Item>
            </Menu.Menu>
          </Menu>
        </Grid>
        <Grid padded className="mobile only">
          <Menu borderless inverted fluid fixed="top">
            <Menu.Item header as="a">
              ANON
            </Menu.Item>
            <Menu.Menu position="right">
              <Menu.Item>
                <Button
                  basic
                  inverted
                  icon
                  toggle
                  onClick={this.handleToggleDropdownMenu}
                >
                  <Icon name="content" />
                </Button>
              </Menu.Item>
            </Menu.Menu>
            <Menu
              borderless
              fluid
              inverted
              vertical
              style={this.state.dropdownMenuStyle}
            >
              <Menu.Item as="a">Report</Menu.Item>
              <Menu.Item as="a">History</Menu.Item>
              <Menu.Item as="a">Help</Menu.Item>
              <Divider fitted />
            </Menu>
          </Menu>
        </Grid>
        <Grid padded>
          <Grid.Column>
            <ReportForm />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Dashboard;