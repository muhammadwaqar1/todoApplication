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
  Alert,
} from 'react-native';
import {useStore} from '../../stores/store';
import {useNavigation} from '@react-navigation/native';
import notifee from '@notifee/react-native';
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
  const {addTasks, tasks, deleteTasks, isEdit, updateIsEdit} = useStore();
  const [formData, setFormData] = React.useState(initialState);
  const [selectedImage, setSelectedImage] = useState(null);
  const [dateTime, setDateTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [mode, setMode] = useState('date');
  const navigation = useNavigation();
  const {item} = route.params || {};

  useEffect(() => {
    if (item) {
      setFormData(item);
      setSelectedImage(item.image);
    }
  }, [item]);

  useEffect(() => {
    const runNotificationCheck = () => {
      tasks.forEach(element => {
        const time = convertTimeFormat(element.time);
        const currentTime = convertTimeFormat(handleTime());
        if (element.date == handleDate() && time == currentTime) {
          showNotification(element);
        }
      });
    };
    const intervalId = setInterval(runNotificationCheck, 40000);
    return () => clearInterval(intervalId);
  }, []);

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
      Alert.alert('', 'Please Fill All Data', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
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
        title: `${item.title}`,
        subtitle: 'This is today task',
        body: `${item.description}`,
        android: {
          channelId,
          color: '#4caf50',
        },
      });
    } catch (error) {
      console.error('Notification Error:', error);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <TextInput
          style={styles.inputTitle}
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
              resizeMode={'contain'}
              style={{width: '100%', height: 200, backgroundColor: 'black'}}
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
        {formData.date && (
          <Text
            style={{
              textAlign: 'center',
              paddingVertical: 10,
            }}>{`${dateTime.toLocaleString()}`}</Text>
        )}
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
    height: 80,
    width: '100%',
    marginVertical: 10,
    paddingHorizontal: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
  },
  inputTitle: {
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
  },
  btnContainer: {
    justifyContent: 'space-between',
    paddingHorizontal: 2,
    marginBottom: 7,
  },
});
