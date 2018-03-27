import React from 'react'
import ItemBox from './itemBox'

Array.prototype.minValue = function() {
  let maxIndex = 0

  for(let i = 0; i < this.length; i++) {
    if(this[i] < this[maxIndex]) {
      maxIndex = i
    }
  }

  return {
    index: maxIndex,
    value: this[maxIndex]
  }
}

Array.prototype.maxValue = function() {
  let maxIndex = 0

  for(let i = 0; i < this.length; i++) {
    if(this[i] > this[maxIndex]) {
      maxIndex = i
    }
  }

  return {
    index: maxIndex,
    value: this[maxIndex]
  }
}

class Waterfall extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      maxNumberOfCols: -1,
      childrenLayouts: {},
      containerWidth: 0,
      containerHeight: 0
    };

    this.childrenSizes = {};
  }

  componentDidMount() {
    window.addEventListener('resize', () => {
      this.caculateNumberOfCols()
    });
  }

  caculateNumberOfCols() {
    const containerWidth = this.container.offsetWidth;
    const width = this.childrenSizes[Object.keys(this.childrenSizes)[0]].width;
    if(parseInt(containerWidth / width) !== this.maxNumberOfCols) {
      let resetChidrenPosition = false;
      if(this.maxNumberOfCols) {
        resetChidrenPosition = true;
      }
      this.maxNumberOfCols = parseInt(containerWidth / width);
      this.setState({
        maxNumberOfCols: this.maxNumberOfCols,
        containerWidth: this.maxNumberOfCols * width
      });
      if(resetChidrenPosition) {
        this.caculateChildrenPosition();
      }
    }
  }

  caculateChildrenPosition() {

    if(this.maxNumberOfCols === -1) {
      return
    }

    let colHeightAcc = [];
    let childrenLayouts = {};
    for(let i = 0; i < this.maxNumberOfCols; i++) {
      colHeightAcc[i] = 0;
    }
    Object.keys(this.childrenSizes).forEach(k => {
      const colWidth = this.childrenSizes[0].width;

      childrenLayouts = Object.assign({}, childrenLayouts, {
        [k]: {
          left: colHeightAcc.minValue().index * colWidth,
          top: colHeightAcc.minValue().value
        }
      })
      colHeightAcc[colHeightAcc.minValue().index] = colHeightAcc.minValue().value +
        this.childrenSizes[k].height
    });

    this.setState({
      childrenLayouts,
      containerHeight: colHeightAcc.maxValue().value
    });
  }

  setChildSize({index, height, width}) {
    const { items } = this.props;
    this.childrenSizes = Object.assign({} , this.childrenSizes, {
      [index]: {
        width,
        height
      }
    });

    if(this.state.maxNumberOfCols === -1) {
      this.caculateNumberOfCols();
    }

    if(Object.keys(this.childrenSizes).length === items.length) {
      this.caculateChildrenPosition()
    }
  }

  render() {
    const { renderItem, items } = this.props;
    const { maxNumberOfCols, childrenLayouts, containerWidth, containerHeight } = this.state;

    const containerSize =
      containerWidth && containerHeight ? { width: containerWidth, height: containerHeight} : {};

    return (
      <div style={styles.cot}
           ref={e => this.container = e}>
        <div style={{...styles.box, ...containerSize}}>
          {
            (items || []).map((item, index) => {
              return (
                <ItemBox index={index}
                         key={index}
                         layout={childrenLayouts[index]}
                         maxNumberOfCols={maxNumberOfCols}>
                  {
                    renderItem(item, (width, height) => {
                      this.setChildSize({index, height, width})
                    })
                  }
                </ItemBox>
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default Waterfall

const styles = {
  cot: {
    margin: "0 auto",
    position: "relative"
  },
  box: {
    width: "100%",
    position: "relative",
    margin: "auto"
  }
}