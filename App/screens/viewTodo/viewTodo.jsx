import React from 'react';
import {FlatList, SafeAreaView, Text, View, StyleSheet} from 'react-native';
import {AllTodo} from './allTodo';
import {useStore} from '../../stores/store';
export const ViewTodo = () => {
  const {completedTask} = useStore();
  console.log('completedTask', completedTask);
  return (
    <SafeAreaView style={styles.container}>
      {!completedTask.length ? (
        <Text style={styles.noTasksText}>No Completed Task</Text>
      ) : (
        <FlatList
          data={completedTask}
          renderItem={({item}) => <AllTodo item={item} />}
          keyExtractor={item => item.id}
        />
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  noTasksText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red', // Set your desired text color
  },
});
