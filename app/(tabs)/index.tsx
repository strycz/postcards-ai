import { Check, Trash } from '@tamagui/lucide-icons';
import {
  Button,
  Checkbox,
  Form,
  H2,
  H4,
  Input,
  ScrollView,
  Spinner,
  Text,
  XStack,
  YStack,
} from 'tamagui';
import { useMutation, useQuery } from 'convex/react';
import { api } from 'convex/_generated/api';
import { useEffect, useState } from 'react';
import TaskCheckbox from './TaskCheckbox';

const SubmitForm = ({ input, setInput, addTask, status, setStatus }) => (
  <Form
    alignItems="center"
    width="fit-content"
    height="fit-content"
    gap="$4"
    onSubmit={() => setStatus('submitting')}
    borderWidth={2}
    borderRadius="$6"
    backgroundColor="$blue2"
    borderColor="$blue5"
    padding="$6"
  >
    <XStack gap="$4">
      <Input
        value={input}
        onChangeText={setInput}
        placeholder="Add a task"
        borderColor="$blue7"
        focusStyle={{ borderColor: '$blue10' }}
      />
      <Button
        onPress={addTask}
        backgroundColor="$green8"
        color="white"
        pressStyle={{ backgroundColor: '$green9' }}
      >
        Add
      </Button>
    </XStack>

    <Form.Trigger asChild disabled={status !== 'off'}>
      <Button
        icon={status === 'submitting' ? () => <Spinner /> : undefined}
        backgroundColor="$blue8"
        color="white"
        pressStyle={{ backgroundColor: '$blue9' }}
      >
        Submit
      </Button>
    </Form.Trigger>
  </Form>
);

const TaskList = ({ tasks, sendLike }) => (
  <YStack gap="$4" width="50%">
    <H4 color="$blue10">Your Tasks</H4>
    {tasks?.map(({ _id, text }) => (
      <XStack
        key={_id}
        alignItems="center"
        justifyContent="space-between"
        gap="$4"
        borderWidth={1}
        borderRadius="$4"
        borderColor="$blue5"
        backgroundColor="$blue2"
        padding="$4"
      >
        <XStack alignItems="center" gap="$2" flex={1}>
          <TaskCheckbox
            id={_id}
            text={text}
            onCheckedChange={() => sendLike({ liker: text, messageId: _id })}
          />

          <Text color="$gray11" flex={1}>
            {text}
          </Text>
        </XStack>

        <Button
          padding="$2"
          hoverStyle={{
            scale: 1.1,
          }}
          icon={<Trash color="$red10" />}
          backgroundColor="$red2"
          pressStyle={{ backgroundColor: '$red3' }}
        >
          Delete
        </Button>
      </XStack>
    ))}
  </YStack>
);

export default function TabOneScreen() {
  const tasks = useQuery(api.tasks.get);
  const sendTask = useMutation(api.tasks.send);
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
    console.log('Liking task');
    await likeTask({ liker, messageId });
  };

  return (
    <YStack f={1} ai="center" backgroundColor="$blue1">
      <ScrollView showsHorizontalScrollIndicator={false} p="$4" br="$4">
        <YStack ai="center" gap="$8" width="100%">
          <H2 color="$blue10">Task Manager</H2>

          <XStack gap="$4" width="100%">
            <SubmitForm
              input={input}
              setInput={setInput}
              addTask={addTask}
              status={status}
              setStatus={setStatus}
            />
            <TaskList tasks={tasks} sendLike={sendLike} />
          </XStack>
        </YStack>
      </ScrollView>
    </YStack>
  );
}
