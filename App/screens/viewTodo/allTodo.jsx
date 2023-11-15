import React, {useEffect} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useStore} from '../../stores/store';
import notifee, {EventType} from '@notifee/react-native';
import bell from '../../assets/icons/bell.wav';
import {Separator} from '../../components/separator';
import {handleDate} from '../../utils/index';
export const AllTodo = ({item}) => {
  const {deleteTasks, tasks, updateIsEdit, handleCurrentTasks} = useStore();
  useEffect(() => {
    const initializeNotifications = async () => {
      try {
        await notifee.requestPermission();
      } catch (error) {
        console.error('Notification Permission Error:', error);
      }
    };
    initializeNotifications();
  }, []);
  const showNotification = async item => {
    try {
      const channelId = await notifee.createChannel({
        id: `${item.id}`,
        name: 'Default Channel',
        sound: `${bell}`,
      });

      await notifee.displayNotification({
        title: `${item.title}`, // Plain text title
        subtitle: 'This is today task', // Plain text subtitle
        body: `${item.description}`, // Plain text body
        android: {
          channelId,
          color: '#4caf50',
          actions: [
            {
              title: 'Dance 🕺', // Plain text with emoji
              pressAction: {id: 'dance'},
            },
            {
              title: 'Cry 😢', // Plain text with emoji
              pressAction: {id: 'cry'},
            },
          ],
        },
      });
    } catch (error) {
      console.error('Notification Error:', error);
    }
  };

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
