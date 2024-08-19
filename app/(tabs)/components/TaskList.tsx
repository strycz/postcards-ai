import { Button, H4, Text, XStack, YStack } from 'tamagui';
import TaskCheckbox from './TaskCheckbox';
import { Trash } from '@tamagui/lucide-icons';

const TaskList = ({ tasks, sendLike, deleteTask }) => (
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
          onPress={() => deleteTask(_id)}
        >
          Delete
        </Button>
      </XStack>
    ))}
  </YStack>
);

export default TaskList;
