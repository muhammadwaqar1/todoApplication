// import {create} from 'zustand';
// import {persist, createJSONStorage} from 'zustand/middleware';
// export const useStore = create(
//   persist(
//     set => ({
//       tasks: [],
//       isEdit: true,
//       currentTask: [],
//       completedTask: [],
//       addTasks: async item => {
//         set(state => ({tasks: [...state.tasks, item]}));
//       },
//       handleCompletedTask: async item => {
//         set(state => ({completedTask: [...state.completedTask, item]}));
//       },
//       handleCurrentTasks: async data => {
//         set({currentTask: data});
//       },
//       deleteTasks: async data => {
//         set({tasks: data});
//       },
//       updateIsEdit: async data => {
//         set({isEdit: data});
//       },
//     }),
//     {
//       name: 'userStore',
//       // storage: createJSONStorage(() => AsyncStorage),
//       getStorage: () => localStorage,
//     },
//   ),
// );

import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const useStore = create(
  persist(
    set => ({
      tasks: [],
      isEdit: true,
      currentTask: [],
      completedTask: [],
      addTasks: async item => {
        set(state => ({tasks: [...state.tasks, item]}));
      },
      handleCompletedTask: async item => {
        set(state => ({completedTask: [...state.completedTask, item]}));
      },
      handleCurrentTasks: async data => {
        set({currentTask: data});
      },
      deleteTasks: async data => {
        set({tasks: data});
      },
      updateIsEdit: async data => {
        set({isEdit: data});
      },
    }),
    {
      name: 'userStore',
      getStorage: () => AsyncStorage,
      storage: AsyncStorage,
      blacklist: [],
    },
  ),
);
