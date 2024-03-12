import {StyleSheet, Animated, View, Dimensions} from 'react-native';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';

import Colors from '../../../Config/Colors';


const {width} = Dimensions.get('screen');

const Pagination = ({data, scrollX, index}) => {
  return (
    <View style={styles.container}>
      {data.map((_, idx) => {
        const inputRange = [(idx - 1) * width, idx * width, (idx + 1) * width];

        const dotOutputRange = [RFValue(8), RFValue(14), RFValue(8)]

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: dotOutputRange,
          extrapolate: 'clamp',
        });

        const dotHeight = scrollX.interpolate({
            inputRange,
            outputRange: dotOutputRange,
            extrapolate: 'clamp',
          });

        const dotRadius = scrollX.interpolate({
            inputRange,
            outputRange: [RFValue(4), RFValue(7), RFValue(4)],
            extrapolate: 'clamp',
        });

        const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.2, 1, 0.1],
            extrapolate: 'clamp',
        });

        const backgroundColor = scrollX.interpolate({
            inputRange,
            outputRange: ['#ccc', '#FFF', '#ccc'],
            extrapolate: 'clamp',
        });

        return (
          <Animated.View
            key={idx.toString()}
            style={[
              styles.dot,
              {width: dotWidth, backgroundColor, height: dotHeight, borderRadius: dotRadius},
            ]}
          />
        );
      })}
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 2,
    marginBottom: 40,
    marginTop: 0
  },
  dot: {
    // width: 10,
    // height: 10,
    // borderRadius: 5,
    marginHorizontal: 3,
  },
  dotActive: {
    backgroundColor: Colors.white,
  },
});