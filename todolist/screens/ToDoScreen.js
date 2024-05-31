import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import TaskInput from '../components/TaskInput';
import TaskItem from '../components/TaskItem';
import styles from '../styles';

// экран для отображения и добавления тасок
const ToDoScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState([]); // локальное состояние для хранения списка тасок

  // добавление таски в список, проверяется, что таска не пуста и добавляется новая таска с уникальным ключом
  const addTask = (task) => {
    if (task.length > 0) {
      setTasks((prevTasks) => [...prevTasks, { key: Math.random().toString(), value: task }]);
    }
  };
  // рендеринг отдельного айтема таски, TouchableOpacity используется для обработки нажатий, текст передается в компонент taskitem 
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('TaskScreen', { task: item.value })}>
      <TaskItem task={item.value} />
    </TouchableOpacity>
  );
  // flatlist использовал для отображения задач, так как он вроде бы лучше справляетяс с большим количестом
  return (
    <View style={styles.container}>
      <TaskInput onAddTask={addTask} />
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        style={styles.list}
      />
    </View>
  );
};

export default ToDoScreen;
