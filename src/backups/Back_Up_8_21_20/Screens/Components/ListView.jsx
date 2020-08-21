import React, {useEffect, useState } from "react";

export default class ListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      availableHeight: 0,
      scrollTop: 0
    }
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleWindowResize)
    this.handleWindowResize()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize)
  }

  handleWindowResize() {
    console.log('handleWindowResize');
    this.setState({
      availableHeight: ReactDOM.findDOMNode(this).clientHeight
    })
  }

  handleScroll(event) {
    console.log('handleScroll', event.target.scrollTop);
    this.setState({
      scrollTop: event.target.scrollTop
    })
  }
  
  renderRowAtIndex(index) {
    const { rowHeight } = this.props
    return (
      <div style={{ height: rowHeight, fontSize: 24, padding: '5px 10px' }}>
        {(index + 1)}
      </div>
    )
  }

  render() {
    const { rowHeight, numRows } = this.props
    const totalHeight = rowHeight * numRows

    const { availableHeight, scrollTop } = this.state
    const scrollBottom = scrollTop + availableHeight

    const startIndex = Math.max(0, Math.floor(scrollTop / rowHeight) - 20)
    const endIndex = Math.min(numRows, Math.ceil(scrollBottom / rowHeight) + 20)

    const items = []

    let index = startIndex
    while (index < endIndex) {
      items.push(<li key={index}>{this.renderRowAtIndex(index)}</li>)
      index++
    }

    return (
      <div style={{ height: '100%', overflowY: 'scroll' }} onScroll={this.handleScroll}>
        <ol style={{ paddingTop: (startIndex * rowHeight), pointerEvents: 'none', height: totalHeight }}>
          {items}
        </ol>
      </div>
    )
  }
}

ListView.defaultProps = {
  rowHeight: 30,
  numRows: 10
}
