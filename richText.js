import React, { Component } from 'react';
import {
  Text,
  Dimensions,
  Image,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
});

const { width } = Dimensions.get('window');

export default class extends Component {

  static defaultProps = {
    emoticonReg: '\\[[^\\]]+\\]',
    textWidth: 0,
    letterWidth: 0,
    chineseCharacterWidth: 0,
    punctuationWidth: 0,
  };

  constructor(props) {
    super(props);
    this.state = {
      views: [],
    };
    this.finish = false;
  }

  matchContentString = (textContent) => {
    emoticonAt = new RegExp(this.props.emoticonReg, 'g');
    const emoticonIndex = textContent.search(emoticonAt);
    if (emoticonIndex === -1) {
      const text = (
        <Text key={`RichText_${Math.random()}`} style={this.props.style}>
          {textContent}
        </Text>
      );
      arr = this.state.views;
      arr.push(text);
      this.state.views = arr;
      this.finish = true;
    } else {
      const emoticonBefore = (
        <Text style={this.props.style} key={`RichText_${Math.random()}`}>
          {textContent.substring(0, emoticonIndex)}
        </Text>
      );
      arr = this.state.views;
      arr.push(emoticonBefore);
      this.state.views = arr;
      this.matchEmoticonString(textContent.substring(emoticonIndex));
    }
  };

  matchEmoticonString = (emoticonStr) => {
    emoticonAt = new RegExp(this.props.emoticonReg);
    const matchStr = emoticonStr.match(emoticonAt);
    const emoticonLength = matchStr[0].length;
    const imageView = (<Image
      key={emoticonStr}
      source={require('../../icons/emoticon/emoji-1.png')}
      style={[{width: 20, height: 20, backgroundColor: 'green'}, this.props.emojiStyle]}
    />);
    arr = this.state.views;
    arr.push(imageView);
    this.state.views = arr;
    this.matchContentString(emoticonStr.substring(emoticonLength));
  };

  render() {
    !this.finish && this.matchContentString(this.props.children);
    return (
      <Text style={this.props.style} >
        {this.state.views}
      </Text>
    );
  }
}