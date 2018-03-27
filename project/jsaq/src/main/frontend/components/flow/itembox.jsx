import React from 'react'

class ItemBox extends React.Component {

  render() {
    const { maxNumberOfCols, index, layout } = this.props
    const style = layout ? {visibility: "visible", position: "absolute", top: layout.top, left: layout.left}
      : maxNumberOfCols> -1 && index < maxNumberOfCols ? {visibility: "visible", float: "left", position: "relative"}
      : {}

    return (
      <div ref={e => this.itemBox = e}
           style={{...styles.itemBox, ...style}}>
        { this.props.children }
      </div>
    )
  }
}

export default ItemBox

const styles = {
  itemBox: {
  }
};