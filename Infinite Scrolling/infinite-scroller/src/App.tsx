import React from "react";
import { render } from "react-dom";
import InfiniteScroll from "react-infinite-scroll-component";

const style = {
  height: 250,
  border: "1px solid green",
  margin: 6,
  padding: 8
};

export default class App extends React.Component {
  state = {
    // items: Array.from({ length: 20 })
    items: [{ name: 'Thomas 1'}, { name: 'Thomas 2'}, { name: 'Thomas 3'}, { name: 'Thomas 4'}
    ,{ name: 'Thomas 5'},{ name: 'Thomas 6'},{ name: 'Thomas 7'},{ name: 'Thomas 8'},{ name: 'Thomas 9'},
    { name: 'Thomas 10'},{ name: 'Thomas 11'},{ name: 'Thomas 12'},{ name: 'Thomas 13'},{ name: 'Thomas 14'}, { name: 'Thomas 15'}],
    scrollerItems: [],
    scrollerLength: 3,
    hasMore: true
  };

  componentDidMount() {
    let scrollerItems: any[] = [];

    for (let i = 0; i < this.state.scrollerLength; i++) {
      if (i <= this.state.items.length) {
        scrollerItems.push(this.state.items[i]);
      }
    }

    this.setState({
      scrollerItems: scrollerItems
    });
  }

  fetchMoreData = () => {
    setTimeout(() => {
      let scrollerLength = this.state.scrollerLength + 3;
      let hasMore: boolean = this.state.hasMore;

      if (scrollerLength + 3 > this.state.items.length) {
        hasMore = false;
      }

      if (scrollerLength > this.state.items.length) {
        scrollerLength = this.state.items.length;
      }

      let scrollerItems: any[] = [];
  
      for (let i = 0; i < scrollerLength; i++) {
        if (i <= this.state.items.length) {
          scrollerItems.push(this.state.items[i]);
        }
      }

      this.setState({
        scrollerLength: scrollerLength,
        scrollerItems: scrollerItems,
        hasMore: hasMore
      });
    }, 1000);
  };

  render() {

    console.log("this.state.items.length: " + this.state.items.length)
    return (
      <div>
        <h1>demo: react-infinite-scroll-component</h1>
        <hr />
        <InfiniteScroll
          dataLength={this.state.scrollerLength}
          next={this.fetchMoreData}
          hasMore={this.state.hasMore}
          loader={<h4>Loading...</h4>}
        >
          {this.state.scrollerItems.map((i: any, index) => (
            <div style={style} key={index}>
              div - #{index} | {i.name}
            </div>
          ))}
        </InfiniteScroll>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
