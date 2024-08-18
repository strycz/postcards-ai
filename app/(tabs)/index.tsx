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
    <YStack f={1} ai="center" gap="$8" px="$10" pt="$5">
      <XStack gap="$4">
        <ToastControl />
      </XStack>

      <XStack gap="$4">
        <Form
          alignItems="center"
          minWidth={300}
          gap="$2"
          onSubmit={() => setStatus('submitting')}
          borderWidth={1}
          borderRadius="$4"
          backgroundColor="$blue1"
          borderColor="$borderColor"
          padding="$8"
        >
          <XStack gap="$4">
            <Input value={input} onChangeText={setInput} placeholder="Add a task" />
            <Button onPress={addTask}>Add</Button>
          </XStack>

          <Form.Trigger asChild disabled={status !== 'off'}>
            <Button icon={status === 'submitting' ? () => <Spinner /> : undefined}>Submit</Button>
          </Form.Trigger>
        </Form>

        <YStack gap="$2">
          {tasks?.map(({ _id, text }) => (
            <XStack
              key={_id}
              alignItems="center"
              gap="$2"
              borderWidth={1}
              borderRadius="$4"
              borderColor="$borderColor"
              padding="$2"
            >
              <Checkbox
                id={_id}
                size="$3"
                defaultChecked={true}
                onCheckedChange={() => sendLike({ liker: text, messageId: _id })}
              >
                <Checkbox.Indicator>
                  <Check />
                </Checkbox.Indicator>
              </Checkbox>

              <Text key={_id}>{text}</Text>

              <Button padding="$1" height="$1" icon={<Trash />}>
                Delete
              </Button>
            </XStack>
          ))}
        </YStack>
      </XStack>

      <XStack ai="center" jc="center" fw="wrap" gap="$1.5" pos="absolute" b="$8">
        <Paragraph fos="$5">Add</Paragraph>

        <Paragraph fos="$5" px="$2" py="$1" col="$blue10" bg="$blue5" br="$3">
          tamagui.config.ts
        </Paragraph>

        <Paragraph fos="$5">to root and follow the</Paragraph>

        <XStack
          ai="center"
          gap="$1.5"
          px="$2"
          py="$1"
          br="$3"
          bg="$purple5"
          hoverStyle={{ bg: '$purple6' }}
          pressStyle={{ bg: '$purple4' }}
        >
          <Anchor
            href="https://tamagui.dev/docs/core/configuration"
            textDecorationLine="none"
            col="$purple10"
            fos="$5"
          >
            Configuration guide
          </Anchor>
          <ExternalLink size="$1" col="$purple10" />
        </XStack>

        <Paragraph fos="$5" ta="center">
          to configure your themes and tokens.
        </Paragraph>
      </XStack>
    </YStack>
  );
}
