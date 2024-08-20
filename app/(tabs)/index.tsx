import { H2, ScrollView, XStack, YStack } from 'tamagui';
import { useMutation, useQuery } from 'convex/react';
import { api } from 'convex/_generated/api';
import { useEffect, useState } from 'react';
import SubmitForm from './components/SubmitForm';
import TaskList from './components/TaskList';

export default function TabOneScreen() {
  const tasks = useQuery(api.tasks.get);
  const sendTask = useMutation(api.tasks.send);
  const likeTask = useMutation(api.tasks.like);
  const deleteTask = useMutation(api.tasks.deleteTask);

  const [status, setStatus] = useState<'off' | 'submitting' | 'submitted'>('off');
  const [input, setInput] = useState<string>('');

  useEffect(() => {
    if (status === 'submitting') {
      const timer = setTimeout(() => setStatus('off'), 2000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [status]);

  const addTask = async () => {
    console.log('Adding task');
    await sendTask({ text: input, isCompleted: false });
  };

  const sendLike = async ({ liker, messageId }) => {
    console.log('Liking task');
    await likeTask({ liker, messageId });
  };

  const handleDeleteTask = async (id) => {
    console.log('Deleting task');
    await deleteTask({ id });
  };

  return (
    <YStack f={1} ai="center" backgroundColor="$blue1">
      <ScrollView width="100%" padding="$4">
        <YStack ai="center" gap="$8" width="100%" pt={120} px="$4">
          <H2 color="$blue10">Task Manager</H2>

          <XStack gap="$4" width="100%" jc="center">
            <XStack width="50%" gap="$4">
              <SubmitForm
                input={input}
                setInput={setInput}
                addTask={addTask}
                status={status}
                setStatus={setStatus}
              />
              <TaskList tasks={tasks} sendLike={sendLike} deleteTask={handleDeleteTask} />
            </XStack>
          </XStack>
        </YStack>
      </ScrollView>
    </YStack>
  );
}
