import { useEffect, useRef } from 'react';
import React = require('react');

import { Animated, Text } from 'react-native';

type MessageProps = {
  message: string
  type: string
  onHide: () => void
}

type ColorValueHexadecimal = `#${string}`;
type ColorObject = {
  [key:string]: {
      bg: ColorValueHexadecimal,
      border:ColorValueHexadecimal,
      color: ColorValueHexadecimal
  }
}

const TypeMessage: ColorObject =
  {
    success: {
      bg: '#d4edda',
      border: '#c3e6cb',
      color: '#155724'
    },
    error: {
      bg: '#f8d7da',
      border: '#f5c6cb',
      color: '#f5c6cb'
    },
    warning: {
      bg: '#fff3cd',
      border: '#ffeeba',
      color: '#856404'
    },
  }

const Message = ({ message, type, onHide }: MessageProps) => {
  const opacity = useRef(new Animated.Value(0))
    .current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.delay(2000),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onHide();
    });
  }, []);

  return (
    <Animated.View
      style={{
        opacity,
        transform: [
          {
            translateY: opacity.interpolate({
              inputRange: [0, 1],
              outputRange: [-20, 0],
            }),
          },
        ],
        margin: 10,
        marginBottom: 5,
        backgroundColor: `${TypeMessage[type]?.bg}`,
        borderColor: `${TypeMessage[type]?.border}`,
        borderWidth: 2,
        padding: 10,
        borderRadius: 4,
        shadowColor: `${TypeMessage[type]?.color}`,
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        elevation: 6,
        zIndex: 50,
      }}
    >
      <Text style={{ color: `${TypeMessage[type]?.color}` }}>{message}</Text>
    </Animated.View>
  );
};

export default Message