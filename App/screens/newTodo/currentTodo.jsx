// import React, {useEffect} from 'react';
// import {Button, Image, StyleSheet, Text, View} from 'react-native';
// import {useStore} from '../../stores/store';
// import {useNavigation} from '@react-navigation/native';
// const Separator = () => {
//   return <View style={styles.separator} />;
// };
// export const CurrentTodo = ({item}) => {
//   const {deleteTasks, tasks, updateIsEdit, handleCurrentTasks} = useStore();
//   const navigation = useNavigation();
//   const handleEditTod = id => {
//     navigation.navigate('AddTask', {item: item});
//     updateIsEdit(false);
//   };
//   const handleDeleteTod = id => {
//     const data = tasks.filter(item => item.id != id);
//     deleteTasks(data);
//     handleCurrentTasks(data);
//   };

//   return (
//     <View style={styles.container}>
//       <View style={{flex: 1, width: '100%'}}>
//         <Image
//           resizeMode={'cover'}
//           style={{width: '100%', height: 400, borderRadius: 20}}
//           source={{uri: item?.image}}
//         />
//       </View>
//       <Text style={styles.label}>Title</Text>
//       <Text>{item?.title}</Text>
//       <Text style={styles.label}>Description</Text>
//       <Text>{item?.description}</Text>
//       {/* <View style={styles.btnContainer}>
//         <View style={{width: '50px', backgroundColor: 'red'}}>
//           <Button
//             title="Edit"
//             backgroundColor
//             onPress={() => handleEditTod(item)}
//           />
//         </View>
//         <View style={{marginRight: 10}} />
//         <Button
//           title="Delete"
//           styles={styles.btn}
//           onPress={() => handleDeleteTod(item?.id)}
//         />
//       </View> */}
//       <Separator />
//     </View>
//   );
// };
// const styles = StyleSheet.create({
//   container: {
//     shadowColor: 'black',
//     shadowOpacity: 0.3,
//     shadowRadius: 4,
//     shadowOffset: {width: 0, height: 2},
//     padding: 10,
//     marginVertical: 10,
//     borderRadius: 20,
//   },
//   label: {
//     fontSize: 20,
//     color: 'black',
//     paddingVertical: 2,
//   },
//   btnContainer: {
//     flexDirection: 'row',
//     justifyContent: 'flex-end',
//     paddingHorizontal: 2,
//   },
//   btn: {
//     paddingHorizontal: 20,
//   },
//   separator: {
//     borderBottomColor: 'black',
//     borderBottomWidth: 1,
//     marginVertical: 10,
//   },
// });

import React, {useEffect} from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useStore} from '../../stores/store';
import {useNavigation} from '@react-navigation/native';
import {Separator} from '../../components/separator';
import EditTaskIcon from '../../assets/icons/edit.png';
import DeleteTaskIcon from '../../assets/icons/trash.png';
export const CurrentTodo = ({item}) => {
  const {
    deleteTasks,
    tasks,
    updateIsEdit,
    handleCurrentTasks,
    handleCompletedTask,
  } = useStore();
  const navigation = useNavigation();
  const handleEditTod = id => {
    navigation.navigate('AddTask', {item: item});
    updateIsEdit(false);
  };
  const handleDeleteTod = id => {
    const data = tasks.filter(item => item.id != id);
    deleteTasks(data);
    handleCurrentTasks(data);
  };
  const handleTask = id => {
    const data = tasks.filter(item => item.id != id);
    const completed = tasks.find(item => item.id == id);
    handleCompletedTask(completed);
    deleteTasks(data);
    handleCurrentTasks(data);
  };
  return (
    <View style={styles.container}>
      <View style={{flex: 1, width: '100%'}}>
        <Image
          resizeMode={'cover'}
          style={{width: '100%', height: 300, borderRadius: 20}}
          source={{uri: item?.image}}
        />
      </View>
      <Text style={styles.label}>Title</Text>
      <Text style={styles.content}>{item?.title}</Text>
      <Text style={styles.label}>Description</Text>
      <Text style={styles.content}>{item?.description}</Text>
      <View style={styles.btnContainer}>
        <Button title="completed" onPress={() => handleTask(item?.id)} />
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => handleEditTod(item)}>
            <Image source={EditTaskIcon} style={{width: 24, height: 24}} />
          </TouchableOpacity>
          <View style={{marginRight: 10}} />
          <TouchableOpacity onPress={() => handleDeleteTod(item?.id)}>
            <Image source={DeleteTaskIcon} style={{width: 30, height: 24}} />
          </TouchableOpacity>
        </View>
      </View>
      <Separator />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 2},
    padding: 10,
    marginVertical: 10,
    borderRadius: 20,
  },
  label: {
    fontSize: 15,
    color: 'black',
    paddingVertical: 2,
  },
  content: {
    borderWidth: 1,
    borderColor: 'gray',
    paddingVertical: 5,
    borderRadius: 10,
    paddingLeft: 10,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 2,
    marginTop: 10,
  },
  btn: {
    paddingHorizontal: 20,
  },
  separator: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginVertical: 10,
  },
});
