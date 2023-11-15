import React, {useEffect, useState} from 'react';
import {WhiteSpace} from '@ant-design/react-native';
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
import {launchImageLibrary} from 'react-native-image-picker';
import {useStore} from '../../stores/store';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useNavigation} from '@react-navigation/native';
const initialState = {
  title: '',
  description: '',
  image: '',
  date: '',
  time: '',
};
export function UseHome({route}) {
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
  return (
    setFormData,
    formData.title,
    showDateTimePicker,
    showDateTimePicker,
    handleImagePicker,
    selectedImage,
    isEdit,
    handleSubmit,
    handleUpDateTask,
    showPicker,
    hideDateTimePicker,
    onChange,
    dateTime,
    mode,
    toLocaleString
  );
}
