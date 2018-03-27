import React, { Component } from 'react';
import { Button, ButtonGroup } from 'epm-ui';

class Guide extends Component {

  constructor( props ) {
    super( props );
    this.state = {
      currentPage: 1,
      dataSource: props.dataSource
    };
    this.getTop = this.getTop.bind( this );
    this.getLeft = this.getLeft.bind( this );
    this.currentPage = this.currentPage.bind( this );
    this.clearGuide = this.clearGuide.bind( this );
  }

  componentDidMount() {
    let findElement = [];
    this.state.dataSource.map( ( item, index ) => {
      let element = document.getElementById( item.id );
      let obj = {
        id: index,
        width: element.offsetWidth,
        height: element.offsetHeight,
        top: this.getTop( element ),
        left: this.getLeft( element ),
        description: item.description
      };
      findElement.push( obj );
    } );
    this.setState( { dataSource: findElement } );
  }

  getTop( e ){
    var offset = e.offsetTop;
    if( e.offsetParent != null ){
      offset += this.getTop( e.offsetParent );
    }
    return offset;
  }
  getLeft( e ){
    var offset = e.offsetLeft;
    if( e.offsetParent != null ){
      offset += this.getLeft( e.offsetParent );
    }
    return offset;
  }

  currentPage( currentPage ) {
    this.setState( { currentPage } );
  }

  clearGuide() {
    this.props._onDisappear( this.props._self );
  }

  render() {
    let { currentPage, dataSource } = this.state;
    let { id, top, left, width, height, description } = dataSource[currentPage - 1];
    return(
      <div className="epm-guide-shadow" style={{ left: left, top: top, width: width, height: height }}>
        <Bubble
          id={ id }
          ypos={ top }
          top={ height + 30 }
          left={ left }
          width={ width }
          height={ height }
          totalPage={ dataSource.length }
          description={ description }
          currentPage={ currentPage }
          clearGuide={ this.clearGuide }
          _currentPage={ this.currentPage }
        />
      </div>
    );
  }
}

class Bubble extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      id: props.id,
      top: props.top,
      left: props.left,
      ypos: props.ypos,
      width: props.width,
      height: props.height,
      nextStep: true,
      previousStep: false,
      currentPage: props.currentPage,
      totalPage: props.totalPage,
      description: props.description
    };
    this.changeStep = this.changeStep.bind( this );
    this.changeDisable = this.changeDisable.bind( this );
    this.clearGuide = this.clearGuide.bind( this );
  }

  componentDidMount() {
    if ( this.state.currentPage == this.state.totalPage ) {
      this.setState( { previousStep: false, nextStep: false } );
    }
  }

  componentWillReceiveProps( nextProps ) {
    this.setState( {
      id: nextProps.id,
      top: nextProps.top,
      left: nextProps.left,
      ypos: nextProps.ypos,
      width: nextProps.width,
      height: nextProps.height,
      currentPage: nextProps.currentPage,
      description: nextProps.description
    } );
    window.scrollTo( nextProps.left, nextProps.ypos );

    this.changeDisable( nextProps.totalPage, nextProps.currentPage );
  }

  clearGuide() {
    this.props.clearGuide && this.props.clearGuide();
  }

  changeStep( event ) {
    let forword = event.target.innerHTML,
      currentPage = this.state.currentPage,
      totalPage = this.state.totalPage;

    if ( forword === "上一步" ) {
      currentPage = currentPage - 1 ;
    } else {
      currentPage = currentPage + 1 ;
    }
    this.changeDisable( totalPage, currentPage );

    this.props._currentPage && this.props._currentPage( currentPage );
  }

  changeDisable( totalPage, currentPage ) {
    if ( currentPage < totalPage + 1 )
      this.setState( { previousStep: true, nextStep: true } );
    if ( currentPage == 1 )
      this.setState( { previousStep: false } );
    if ( currentPage == totalPage )
      this.setState( { nextStep: false } );
  }

  render() {
    let { currentPage, top, nextStep, previousStep, description } = this.state;
    return (
      <div className="epm-guide-container" style={{ top: top }}>
        <div className="epm-guide-sequence"> { currentPage + '.' } </div>
        <div className="epm-guide-content"> { description } </div>
        <div className="epm-guide-footer">
          <div style={{ display: 'inline-block' }}>
            <ButtonGroup>
              <Button type="default" disabled={ previousStep ? false : true } onClick={ this.changeStep } >上一步</Button>
              {
                nextStep ?
                  <Button type="default" onClick={ this.changeStep } >下一步</Button>
                  :
                  <Button type="default" onClick={ this.clearGuide } >完成</Button>
              }
            </ButtonGroup>
          </div>
        </div>
      </div>
    );
  }
}

export { Guide };
export default Guide;