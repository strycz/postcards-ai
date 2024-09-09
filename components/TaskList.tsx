import { Button, H4, Text, XStack, YStack } from 'tamagui';
import TaskCheckbox from './TaskCheckbox';
import { Trash } from '@tamagui/lucide-icons';

const TaskList = ({ tasks, sendLike, deleteTask }) => (
  <YStack gap="$4" minWidth={30}>
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
        paddingVertical="$4"
        paddingHorizontal="$4"
      >
        <TaskCheckbox
          id={_id}
          text={text}
          onCheckedChange={() => sendLike({ liker: text, messageId: _id })}
        />

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
