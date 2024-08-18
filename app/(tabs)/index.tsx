import { ExternalLink } from '@tamagui/lucide-icons';
import {
  Anchor,
  Button,
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

  const [status, setStatus] = useState<'off' | 'submitting' | 'submitted'>('off');

  useEffect(() => {
    if (status === 'submitting') {
      const timer = setTimeout(() => setStatus('off'), 2000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [status]);

  const addTask = async () => {
    await sendTask({ text: 'Hello, Tamagui!', isCompleted: false });
  };

  return (
    <YStack f={1} ai="center" gap="$8" px="$10" pt="$5">
      <XStack gap="$4">
        <H2>Tamagui + Expo22</H2>
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
          <H4>{status[0].toUpperCase() + status.slice(1)}</H4>
          <XStack gap="$4">
            <Input placeholder="Add a task" />
            <Button onPress={addTask}>Add</Button>
          </XStack>

          <Form.Trigger asChild disabled={status !== 'off'}>
            <Button icon={status === 'submitting' ? () => <Spinner /> : undefined}>Submit</Button>
          </Form.Trigger>
        </Form>

        <YStack gap="$2">
          {tasks?.map(({ _id, text, author, body }) => (
            <Text key={_id}>
              {text}
              {body}
            </Text>
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
