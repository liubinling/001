import React, { Component } from 'react';
import { deepcopy } from '../utilities/deepcopy';
import { Page, Table, Column, ColumnGroup, Divider, Row, Col, Input, Button, Icon } from 'epm-ui';


class OneOffTable extends Component {
  constructor( props ) {
    super( props );

    this.state = {
      showData: props.dataSource,
      showId: props.showId || []
    };
  }

  // 初始状态 data
  componentDidMount() {
    const { dataSource, showId } = this.props;

    if ( typeof dataSource === 'string' && fetch ) {
      fetch( dataSource, { credentials: 'same-origin' } )
        .then( ( response ) => response.json() )
        .then( ( data ) => this.setState( {
          data: this.addRank( data ),
          showData: this.filterData( this.addRank( data ), showId )
        } ) )
        .catch( ( err ) => console.error( dataSource, err.toString() ) );
    } else if ( Array.isArray( dataSource ) ) {
      this.setState( { data: this.addRank( dataSource ), showData: this.filterData( this.addRank( dataSource ), showId ) } )
    }
  }

  // 多次渲染
  componentWillReceiveProps( nextProps ) {
    const { showId, dataSource } = nextProps;

    // 数据层的渲染
    if ( dataSource || showId ) {
      if ( typeof dataSource === 'string' && fetch ) {
        fetch( dataSource, { credentials: 'same-origin' } )
          .then( ( response ) => response.json() )
          .then( ( data ) => this.setState( {
            data: this.addRank( data ),
            showData: this.filterData( this.addRank( data ), showId )
          } ) )
          .catch( ( err ) => console.error( dataSource, err.toString() ) );
      } else if ( Array.isArray( dataSource ) ) {
        this.setState( {
          data: this.addRank( dataSource ),
          showData: this.filterData( this.addRank( dataSource ), showId )
        } )
      }
    }
  }

  // 初始状态展开哪些值，不展开哪些值
  filterData( data, preshowId ) {
    let arr = new Map( [ [ 0, preshowId ] ] );
    let showId = [];

    for ( let x of arr ) {
      data.map( ( item ) => {
        if ( x[1] && x[1].includes( item.kpiId ) && item.parentId !== 'root' ) {
          let newArray = [];
          newArray.push( item.parentId );
          arr.set( x[0] + 1, newArray );
        }
      });
    }

    for ( let x of arr ) {
      showId = showId.concat( x[1] );
    }

    this.setState( { showId: showId } );

    const newData = data.filter( ( item ) => {
      return item.parentId === 'root' || showId.includes( item.parentId );
    } );

    return newData;
  }

  // 给所有的数据添加一个 rank 之类
  addRank( data ) {
    if ( data && Array.isArray( data ) ) {
      let arr = new Map([[0, ['root']]]);
      let parentsId = [];

      data.map((item) => {
        for (let x of arr) {
          if (x[1].includes(item.parentId)) {
            item.rank = x[0];
            let newArray = [];
            newArray.push(item.kpiId);
            parentsId.push(item.parentId);
            arr.set(x[0] + 1, newArray);
          }
        }
      });

      data.map( ( item ) => {
        if ( !parentsId.includes( item.kpiId ) ) {
          item.leef = true;
        }
      } );
    }

    return data;
  }

  // 根据 kpiId 拿到数据
  getChildData( value ) {
    let { data, showId } = this.state;
    let newData = deepcopy( this.state.showData );

    // 先判断一下是展开操作还是并操作
    let flag = true;
    newData.map( ( item ) => {
      if ( item.parentId === value.kpiId ) {
        flag = false;
      }
    });

    const index = this.findIndex( value );
    // flag 为 true 时展开，为 false 时闭合
    if ( flag ) {
      showId.push( value.kpiId );
      const childData = data.filter( ( item ) => {
        return item.parentId === value.kpiId;
      } );

      childData.map( ( item, i ) => {
        newData.splice( index + i + 1, 0, item );
      } );
    } else {
      // 关闭不显示的数据n
      const rank = value.rank;
      let preData = newData.splice( 0, index + 1 );
      showId = showId.filter( ( x ) => x !== value.kpiId );

      const deleteData = this.deleteChild( newData, rank, showId );
      showId = deleteData[1];
      newData = deleteData[0];

      newData = preData.concat( newData );
    }

    this.setState( { showData: newData, showId } );
  }

  // 关闭显示数据
  deleteChild( newData, rank, showId ) {
    if ( newData.length === 0 ) {
      return [newData, showId];
    }
    if ( newData[0].rank > rank ) {
      const deleteItem = newData.splice(0, 1);
      showId = showId.filter( ( x ) => x !== deleteItem[0].kpiId );
      return this.deleteChild( newData, rank, showId );
    }
    return [newData, showId];
  }

  // 查找 index
  findIndex( row ) {
    const data = this.state.showData;
    let index = 0;

    data.map( ( item, i ) => {
      if ( item.kpiId === row.kpiId ) {
        return index = i;
      }
    });

    return index;
  }

  linkClick( value ) {
    if ( this.props.linkClick ) {
      this.props.linkClick( value );
    }
  }

  render() {
    const { showData, showId } = this.state;
    const { title, dataIndex, columns, children } = this.props;
    return (
      <Table dataSource={ showData }>
        <Column title={ title }>
          { (value) => <TableTitle linkClick={ this.linkClick.bind(this, value)}
                                   onClick={ this.getChildData.bind(this, value) } rank={ value.rank }
                                   arrow={ value.leef } key={ value.kpiId } text={ value[dataIndex] }
                                   type={ showId.includes(value.kpiId) ? 'chevron-down' : 'chevron-right' }/> }
        </Column>
        {
          columns ?
            columns.map((item, index) => {
              return <Column title={ item.title } dataIndex={ item.key } key={ index }/>;
            })
            :
            children
        }
      </Table>
    );
  }
}

// 定义一个显示值的组件，来展示显示值
class TableTitle extends Component {
  constructor( props ) {
    super( props );

    this.state = {type: props.type || 'chevron-right'};

    this.handleClick = this.handleClick.bind( this );
    this.linkClick = this.linkClick.bind( this );
  }

  componentWillReceiveProps( nextProps ) {
    if ( nextProps.type && nextProps.type !== this.state.type ) {
      this.setState( { type: nextProps.type } );
    }
  }

  // 添加空格失败
  renderSpace() {
    const rank = this.props.rank || 0;
    let str = '';
    for ( let i = 0; i <= rank * 4; i++ ) {
      str += ' ';
    }
    return <span style={ {whiteSpace: 'pre-wrap', display: 'inline-block'} }>{ str }</span>;
  }

  // 触发 onClick 事件
  handleClick( ...args ) {
    let arrow = args[0].target;

    // 处理箭头 Icon
    let type = this.state.type;

    if ( arrow.className === "fa fa-chevron-right" ) {
      arrow.className = "fa fa-chevron-down";
      //this.setState( { type: 'chevron-down' } );
    } else if( arrow.className === "fa fa-chevron-down" ) {
      arrow.className = "fa fa-chevron-right";
      //this.setState( { type: 'chevron-right' } );
    }
    // 处理外部 onClick 事件
    this.props.onClick && this.props.onClick( ...args );
  }

  // 触发超链接事件
  linkClick( ...args ) {
    this.props.linkClick && this.props.linkClick( ...args );
  }

  render() {
    const text = this.props.text;
    const arrow = this.props.arrow;

    return (
      <div>
        <div onClick={ this.handleClick } style={{ display: 'inline-block' }}>
          { this.renderSpace() }
          {
            arrow ?
              <span style={ {whiteSpace: 'pre-wrap', display: 'inline-block'} }>  </span>
              :
              <Icon style={{display: 'inline-block'}} type={ this.state.type }/>
          }
        </div>
        <a onClick={ this.linkClick } style={{display: 'inline-block'}}>{ text }</a>
      </div>
    )
  }
}

export {OneOffTable};
export default OneOffTable;