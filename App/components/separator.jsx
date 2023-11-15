import React from 'react';
import {StyleSheet, View} from 'react-native';
export const Separator = () => {
  return <View style={styles.separator} />;
};
const styles = StyleSheet.create({
  separator: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginVertical: 20,
  },
});
