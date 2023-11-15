import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
export const useStore = create(
  persist(
    set => ({
      tasks: [],
      isEdit: true,
      currentTask: [],
      completedTask: [],
      addTasks: item => {
        set(state => ({tasks: [...state.tasks, item]}));
      },
      handleCompletedTask: item => {
        set(state => ({completedTask: [...state.completedTask, item]}));
        // set(state => ({completedTask: [...state.completedTask, item]}));
      },
      handleCurrentTasks: data => {
        set({currentTask: data});
      },
      deleteTasks: data => {
        set({tasks: data});
      },
      updateIsEdit: data => {
        set({isEdit: data});
      },
      // addTasks: data => {
      //   set({tasks: data});
      // },
    }),
    {
      name: 'userStore',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
