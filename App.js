/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  FlatList,
  View,
  Image,
  NavigatorIOS,
  TouchableHighlight
} from 'react-native';
import APICONFIG from './src/api/config';
import Hello from './src/components/hello';

console.log(Hello);


// console.log(APICONFIG);
var REQUEST_URL = 'http://localhost:3000/docs/MoviesExample';

export default class App extends Component<{}> {
  constructor(props) {
    super(props);   //这一句不能省略，照抄即可
    this.state = {
      data: [],
      loaded: false,  //这里放你自己定义的state变量及初始值
    };
    // 在ES6中，如果在自定义的函数里使用了this关键字，则需要对其进行“绑定”操作，否则this的指向不对
    // 像下面这行代码一样，在constructor中使用bind是其中一种做法（还有一些其他做法，如使用箭头函数等）
    this.fetchData = this.fetchData.bind(this);
  }
  fetchData() {

    fetch(REQUEST_URL)
      // .then((response) => response.json())
      .then((responseData) => {
        // 注意，这里使用了this关键字，为了保证this在调用时仍然指向当前组件，我们需要对其进行“绑定”操作
        console.log(JSON.parse(responseData._bodyInit));
        // console.log(responseData.json());
        this.setState({
          data: this.state.data.concat(JSON.parse(responseData._bodyInit)),
          loaded: true,
        });
      });
  }
  componentDidMount() {
    this.fetchData();
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }
    // var movie = this.state.movies[0];
    // console.log(movie);
    // return this.renderMovie(movie);
    return (<FlatList
      data={this.state.data}
      renderItem={this.renderMovie}
      style={styles.list}
    />)
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          正在加载电影数据……
        </Text>
      </View>
    );
  }

  renderMovie(item) {
    // console.log(movie.posters.thumbnail );
    let movie = item.item
    console.log(movie)
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: movie.posters.thumbnail }}
          style={styles.thumbnail}
        />
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.year}>{movie.year}</Text>
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  rightContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  year: {
    textAlign: 'center',
  },
  thumbnail: {
    width: 53,
    height: 81,
  },
  list: {
    paddingTop: 21,
    backgroundColor: '#F5FCFF',
  },
});
