import React, {useRef, useState, useEffect} from 'react';
import {TouchableOpacity, Animated, StyleSheet} from 'react-native';

const Switch = ({initialValue = false, onValueChange = () => {}}) => {
  const [isOn, setIsOn] = useState(initialValue);
  const animatedValue = useRef(
    new Animated.Value(initialValue ? 1 : 0),
  ).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isOn ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isOn]);

  const handleToggle = () => {
    const newValue = !isOn;
    setIsOn(newValue);
    onValueChange(newValue);
  };

  const interpolateTranslateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 10],
  });

  const interpolateBackgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#D9D9D9', '#1D95F0'],
  });

  return (
    <TouchableOpacity onPress={handleToggle} activeOpacity={0.8}>
      <Animated.View
        style={[
          styles.track,
          {
            backgroundColor: interpolateBackgroundColor,
          },
        ]}>
        <Animated.View
          style={[
            styles.thumb,
            {
              transform: [{translateX: interpolateTranslateX}],
            },
          ]}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  track: {
    width: 35,
    height: 20,
    borderRadius: 15,
    padding: 5,
    justifyContent: 'center',
  },
  thumb: {
    width: 15,
    height: 15,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    // borderWidth: 2,
    // borderColor: '#2196F3',
  },
});

export default Switch;
