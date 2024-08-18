import { Check, ExternalLink, Trash } from '@tamagui/lucide-icons';
import {
  Anchor,
  Button,
  Checkbox,
  Form,
  H2,
  H4,
  Input,
  Paragraph,
  Spinner,
  Text,
  XStack,
  YStack,
} from 'tamagui';
import { ToastControl } from 'app/CurrentToast';
import { useMutation, useQuery } from 'convex/react';
import { api } from 'convex/_generated/api';
import { useEffect, useState } from 'react';

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
    <YStack f={1} ai="center" gap="$8" px="$10" pt="$5" backgroundColor="$blue1">
      <XStack gap="$4">
        <ToastControl />
      </XStack>

      <H2 color="$blue10">Task Manager</H2>

      <XStack gap="$4" width="100%">
        <Form
          alignItems="center"
          width="100%"
          gap="$4"
          onSubmit={() => setStatus('submitting')}
          borderWidth={2}
          borderRadius="$6"
          backgroundColor="$blue2"
          borderColor="$blue5"
          padding="$6"
        >
          <XStack gap="$4" width="100%">
            <Input
              flex={1}
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
      </XStack>

      <YStack gap="$4" width="100%">
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
              <Checkbox
                id={_id}
                size="$4"
                defaultChecked={true}
                onCheckedChange={() => sendLike({ liker: text, messageId: _id })}
              >
                <Checkbox.Indicator>
                  <Check color="$green10" />
                </Checkbox.Indicator>
              </Checkbox>

              <Text color="$gray11" flex={1}>
                {text}
              </Text>
            </XStack>

            <Button
              padding="$2"
              icon={<Trash color="$red10" />}
              backgroundColor="$red2"
              pressStyle={{ backgroundColor: '$red3' }}
            >
              Delete
            </Button>
          </XStack>
        ))}
      </YStack>

      <XStack ai="center" jc="center" fw="wrap" gap="$3" pos="absolute" b="$8">
        <Paragraph fos="$4" color="$gray11">
          Need help? Check out our
        </Paragraph>

        <XStack
          ai="center"
          gap="$2"
          px="$3"
          py="$2"
          br="$4"
          bg="$purple5"
          hoverStyle={{ bg: '$purple6' }}
          pressStyle={{ bg: '$purple4' }}
        >
          <Anchor
            href="https://tamagui.dev/docs/core/configuration"
            textDecorationLine="none"
            col="$purple10"
            fos="$4"
            fontWeight="bold"
          >
            Configuration guide
          </Anchor>
          <ExternalLink size="$2" col="$purple10" />
        </XStack>
      </XStack>
    </YStack>
  );
}
