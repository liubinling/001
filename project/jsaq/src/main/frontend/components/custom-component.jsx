import React, { Component } from 'react';
import { Container,Row, Col, Form, FormItem, Input, Button, Divider, Icon} from 'epm-ui';

class CustomComponent extends Component {

  constructor(props) {
    super(props);

    this.state = { items: [] };

    this.handleSubmit = this.handleSubmit.bind( this );
  }

  handleSubmit( data ) {
    this.setState( ( prevState ) => {
      prevState.items.push( data.item );
      return {
        items: prevState.items
      }
    } );
    return false;
  }

  handleClose( index ) {
    this.setState( ( prevState ) => {
      prevState.items.splice( index, 1 );
      return {
        items: prevState.items
      }
    } );
  }

  render() {

    return (  
      <Container type="fluid">
        <Row>
          <Col>
            <h5>Todo List</h5>
            <Form type="inline" action="" onSubmit={ this.handleSubmit }>
              <FormItem name="name">
                <Input name="item" placeholder="New Todo" />
              </FormItem>
              <Button type="primary" htmlType="submit">Add</Button>
            </Form>
            <Divider />
            <p>{ this.state.items.length } to do</p>
            <Divider fitted />
            <Row>
              <Col size={ 4 }>
                {
                  this.state.items.map( (item, index) => ( 
                      <Row key={ index }>
                        <Col size={ 10 }>{ item }</Col>
                        <Col size={ 2 }>
                          <a className="epm col col-nm-2" type="icon" onClick={ this.handleClose.bind( this, index ) }>
                            <Icon type="close" />
                          </a>
                        </Col>
                      </Row> 
                    )
                  )
                }
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default CustomComponent;
export { CustomComponent }