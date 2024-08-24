import { H2, H4, ScrollView, Text, XStack, YStack } from 'tamagui';
import { Authenticated, Unauthenticated, useMutation, useQuery } from 'convex/react';
import { api } from 'convex/_generated/api';
import { useEffect, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import SubmitForm from './components/SubmitForm';
import TaskList from './components/TaskList';
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo';
import { Link } from 'expo-router';
import Page from 'app/(auth)/sign-in';

export default function Dashboard() {
  const { user } = useUser();
  const tasks = useQuery(api.tasks.get);
  const sendTask = useMutation(api.tasks.send);
  const deleteTask = useMutation(api.tasks.deleteTask);

  const [status, setStatus] = useState<'off' | 'submitting' | 'submitted'>('off');
  const [input, setInput] = useState<string>('');
  const { width } = useWindowDimensions();

  const isSmallScreen = width < 768;

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
    // await likeTask({ liker, messageId });
  };

  const handleDeleteTask = async (id) => {
    console.log('Deleting task');
    await deleteTask({ id });
  };

  function Content() {
    const messages = useQuery(api.tasks.getForCurrentUser);
    return <div>Authenticated content: {JSON.stringify(messages)}</div>;
  }

  return (
    <YStack f={1} ai="center" backgroundColor="$blue1">
      <ScrollView width="100%" padding="$4">
        <YStack ai="center" gap="$8" width="100%" pt={120} px="$4">
          <H2 color="$blue10">Task Manager</H2>

          <Unauthenticated>
            <Page />
          </Unauthenticated>
          <Authenticated>
            <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
            <Content />
          </Authenticated>
          <XStack
            flexDirection={isSmallScreen ? 'column' : 'row'}
            gap="$4"
            width="100%"
            jc="center"
          >
            <XStack
              width={isSmallScreen ? '100%' : '50%'}
              flexDirection={isSmallScreen ? 'column' : 'row'}
              gap="$4"
            >
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
