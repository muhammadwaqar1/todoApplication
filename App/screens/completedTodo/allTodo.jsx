import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Separator} from '../../components/separator';
export const AllTodo = ({item}) => {
  return (
    <View style={{paddingHorizontal: 10}}>
      <View style={{flex: 1, width: '100%', marginBottom: 10}}>
        <Image
          resizeMode={'cover'}
          style={{width: '100%', height: 200, borderRadius: 20}}
          source={{uri: item?.image}}
        />
      </View>
      <Text style={styles.label}>Title</Text>
      <Text style={styles.content}>{item?.title}</Text>
      <Text style={styles.label}>Description</Text>
      <Text style={styles.content}>{item?.description}</Text>
      <Separator />
    </View>
  );
};
const styles = StyleSheet.create({
  label: {
    fontSize: 15,
    color: 'black',
    paddingVertical: 2,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 2,
  },
  content: {
    borderWidth: 1,
    borderColor: 'gray',
    paddingVertical: 5,
    borderRadius: 10,
    paddingLeft: 10,
  },
});
