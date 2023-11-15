import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  Button,
  Platform,
  StyleSheet,
  Image,
  Modal,
  Text,
} from 'react-native';
import {useStore} from '../../stores/store';
import {useNavigation} from '@react-navigation/native';
import notifee, {EventType} from '@notifee/react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import {handleDate, handleTime, convertTimeFormat} from '../../utils/index';
const initialState = {
  title: '',
  description: '',
  image: '',
  date: '',
  time: '',
};

export const Home = ({route}) => {
  const [formData, setFormData] = React.useState(initialState);
  const [selectedImage, setSelectedImage] = useState(null);
  const [dateTime, setDateTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [mode, setMode] = useState('date');
  const {addTasks, tasks, deleteTasks, isEdit, updateIsEdit} = useStore();
  const navigation = useNavigation();
  const {item} = route.params || {};

  useEffect(() => {
    if (item) {
      setFormData(item);
      setSelectedImage(item.image);
    }
  }, [item]);
  console.log('handleTimehandleTime', handleTime());
  useEffect(() => {
    const runNotificationCheck = () => {
      // const filteredTasks = tasks.filter(item => item.date === handleDate());
      const filteredTasks = tasks.forEach(element => {
        console.log(element.time, 'time34343', handleTime());
        const time = convertTimeFormat(element.time);
        const currentTime = convertTimeFormat(handleTime());
        console.log(
          time == currentTime,
          'hhhhhggghddd777dddddddhh',
          time,
          currentTime,
        );
        // console.log(element.time, 'time333dd555', handleTime());
        // console.log(element.time == handleTime(), 'Timesseeedddddff');
        // console.log(element.date == handleDate(), 'Dateee');
        // console.log(
        //   element.date == handleDate() && element.time == handleTime(),
        //   'sdfdsfkkkkk',
        // );
        if (element.date == handleDate() && time == currentTime) {
          showNotification(element);
        }
      });
    };
    const intervalId = setInterval(runNotificationCheck, 40000); // Run every minute

    return () => clearInterval(intervalId);
  }, []); // This will only run once when t

  const onChange = (event, selectedDateTime) => {
    const date = selectedDateTime.toDateString();
    const time = selectedDateTime.toLocaleTimeString();
    setFormData({
      ...formData,
      date: date,
      time: time,
    });
    const currentDate = selectedDateTime || dateTime;
    setShowPicker(Platform.OS === 'ios');
    setDateTime(currentDate);
  };

  const showDateTimePicker = currentMode => {
    setMode(currentMode);
    setShowPicker(true);
  };

  const hideDateTimePicker = () => {
    setShowPicker(false);
  };

  const handleSubmit = () => {
    if (
      !formData.title ||
      !formData.description ||
      !selectedImage ||
      !formData.date ||
      !formData.time
    ) {
      return;
    }
    const taskId = Math.random().toString(36).substring(2);
    const task = {
      title: formData.title,
      description: formData.description,
      image: formData.image,
      date: formData.date,
      time: formData.time,
      id: taskId,
    };
    addTasks(task);
    setFormData(initialState);
    setSelectedImage(null);
    navigation.navigate('Current Task');
    updateIsEdit(true);
  };

  const handleUpDateTask = () => {
    const updatedTasks = tasks.map(task => {
      if (task.id === item?.id) {
        return {
          ...task,
          title: formData.title,
          description: formData.description,
          image: formData.image,
          reminder: formData.reminder,
          date: formData.date,
          time: formData.time,
        };
      }
      return task;
    });
    console.log('updatedTasks', updatedTasks);
    deleteTasks(updatedTasks);
    setFormData(initialState);
    setSelectedImage(null);
    navigation.navigate('Current Task');
    updateIsEdit(true);
  };
  const handleImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 1000,
      maxWidth: 2000,
      status: 'false',
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setFormData({
          ...formData,
          image: imageUri,
        });
        setSelectedImage(imageUri);
      }
    });
  };
  const showNotification = async item => {
    try {
      const channelId = await notifee.createChannel({
        id: `asdf`,
        name: 'Default Channel',
        sound: `asdf`,
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
  console.log('k4hhddsddddddk', tasks);
  return (
    <>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Title"
          onChangeText={text => setFormData({...formData, title: text})}
          value={formData.title}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          onChangeText={text => setFormData({...formData, description: text})}
          value={formData.description}
        />
        <View style={styles.btnContainer}>
          <Button
            title="Select Date"
            onPress={() => showDateTimePicker('date')}
          />
          <View style={{marginTop: 10}} />
          <Button
            title="Select Time"
            onPress={() => showDateTimePicker('time')}
          />
        </View>
        <View style={{marginBottom: 10}}>
          <Button title="Select Image" onPress={handleImagePicker} />
        </View>

        {selectedImage && (
          <View style={{flex: 1, width: '100%', justifyContent: 'center'}}>
            <Image
              resizeMode={'cover'}
              style={{width: '100%', height: 350}}
              source={{uri: selectedImage}}
            />
          </View>
        )}
        {isEdit ? (
          <Button title="Add Task" onPress={handleSubmit} />
        ) : (
          <Button title=" Update Task" onPress={handleUpDateTask} />
        )}
      </View>
      <View>
        <Modal
          visible={showPicker}
          animationType="slide"
          transparent={true}
          onRequestClose={hideDateTimePicker}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <DateTimePicker
                value={dateTime}
                mode={mode}
                display="spinner"
                onChange={onChange}
              />
            </View>
          </View>
        </Modal>
        <Text>{`Selected Date & Time: ${dateTime.toLocaleString()}`}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    width: '100%',
    marginVertical: 10,
    paddingHorizontal: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  btnContainer: {
    justifyContent: 'space-between',
    paddingHorizontal: 2,
    marginBottom: 7,
  },
});
