import { ScrollView, YStack } from 'tamagui';
import { ToastControl } from 'components/CurrentToast';
import TaskList from 'components/TaskList';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'convex/react';
import { api } from 'convex/_generated/api';
import SubmitForm from 'components/SubmitForm';

export default function Dashboard() {
  const tasks = useQuery(api.tasks.get);
  const sendTask = useMutation(api.tasks.send);
  const deleteTask = useMutation(api.tasks.deleteTask);
  const likeTask = useMutation(api.tasks.like);

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
    console.log('Liking task turned off');
    likeTask({ liker, messageId });
  };

  const handleDeleteTask = async (id) => {
    console.log('Deleting task');
    await deleteTask({ id });
  };

  return (
    <ScrollView w="100%" p="$4">
      <YStack f={1} ai="center" gap="$8" px="$10" pt="$5">
        <SubmitForm
          input={input}
          setInput={setInput}
          addTask={addTask}
          status={status}
          setStatus={setStatus}
        />
        <TaskList tasks={tasks} sendLike={sendLike} deleteTask={handleDeleteTask} />

        <ToastControl />
      </YStack>
    </ScrollView>
  );
}
