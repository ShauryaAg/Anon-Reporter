import React from 'react';
import { Grid, Form, Segment, Header, Icon, Button, TextArea } from 'semantic-ui-react';

class ReportForm extends React.Component {
  state = {
    detail: '',
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault();
  }

  render() {
    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 550 }}>
          <Header as="h1" icon color="violet" textAlign="center">
            <Icon name="edit outline" color="violet" />
            Report
          </Header>
          <Form onSubmit={this.handleSubmit} size="large">
            <Segment stacked>
              <TextArea 
                placeholder='Tell us!'
                name='detail' 
                onChange={this.handleChange}
              />
              <Button color="violet" fluid size="large" style={{marginTop:"10px"}}> 
                Proceed
              </Button>
            </Segment>
          </Form>
          </Grid.Column>
      </Grid>
    );
  }
}

export default ReportForm;