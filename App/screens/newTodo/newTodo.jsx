import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text} from 'react-native';
import {CurrentTodo} from './currentTodo';
import {useStore} from '../../stores/store';
import {handleDate} from '../../utils/index';
export const NewTodo = () => {
  const {tasks, handleCurrentTasks, currentTask} = useStore();
  useEffect(() => {
    const data = tasks.filter(item => item.date === handleDate());
    handleCurrentTasks(data);
  }, [tasks]);
  return (
    <SafeAreaView style={styles.container}>
      {!currentTask.length ? (
        <Text style={styles.noTasksText}>No Current today Task</Text>
      ) : (
        <FlatList
          data={currentTask}
          renderItem={({item}) => <CurrentTodo item={item} />}
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
  noTasksText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red', // Set your desired text color
  },
  title: {
    fontSize: 32,
  },
});
