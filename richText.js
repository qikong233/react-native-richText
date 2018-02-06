/*
* created by qikong233 
* 2018-02-01
*/
import React, { Component } from 'react';
import {
  Text,
  Image,
  PixelRatio,
  Platform,
} from 'react-native';

export default class extends Component {

  static defaultProps = {
    emoticonReg: '\\[[^\\]]+\\]',
    fontSize: 14,
    emojiSize: 15,
    emojiReflection: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      views: [],
    };
    this.finish = false;
    this.emojiMap = new Map();
    this.emoticonScale = Platform.OS === 'ios' ? 1 : PixelRatio.get();
    if (props.emojiReflection) {
      props.emojiReflection.map(obj => this.emojiMap.set(Object.keys(obj)[0], Object.values(obj)[0]));
    }
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
    emoticonKey = emoticonStr.substring(0, emoticonLength);
    const imageView = (<Image
      key={emoticonStr}
      source={this.emojiMap.get(emoticonKey)}
      style={[{
        width: this.props.emojiSize * this.emoticonScale,
        height: this.props.emojiSize * this.emoticonScale,
      }, this.props.emojiStyle]}
    />);
    arr = this.state.views;
    arr.push(imageView);
    this.state.views = arr;
    this.matchContentString(emoticonStr.substring(emoticonLength));
  };

  render() {
    !this.finish && this.matchContentString(this.props.children);
    return (
      <Text style={[this.props.style,
        {
        fontSize: this.props.fontSize,
        textAlignVertical: 'center',
        }]}
      >
        {this.state.views}
      </Text>
    );
  }
}
