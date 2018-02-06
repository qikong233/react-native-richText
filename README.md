# react-native-richText
to solve emoji text in react-native

### How to use
```javascript
import RichText from './richText';
import { defaultEmoticonReflection } from 'emoticonReflection';
render() {
  return (
    <View>
      <RichText fontSize={17} emojiSize={17} emojiReflection={} >haha [smile]</RichText>
    </View>
  );
}
```

### Props
|parameter|type|required|description|default|
|:---|:---|:---|:---|:---|
|emoticonReg|string|no|match emoji regular|\\[[^\\]]+\\]|
|fontSize|number|no|font size|14|
|emojiSize|number|no|emoji image size|15|
|emojiReflection|array|yes|text link to image source||

#### emojiReflection
```javascript
defaultEmoticonReflection = [ 
  {'[smile]': require('../../icons/emoticon/emoji-1.png')}, 
  {'[good]': require('../../icons/emoticon/emoji-2.png')}, 
]; 
```
