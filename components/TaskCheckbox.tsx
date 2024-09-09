import { Check } from '@tamagui/lucide-icons';
import { Checkbox, Text, XStack } from 'tamagui';

const TaskCheckbox = ({ id, text, onCheckedChange }) => (
  <XStack alignItems="center" gap="$2" flex={1}>
    <Checkbox id={id} size="$4" defaultChecked={true} onCheckedChange={onCheckedChange}>
      <Checkbox.Indicator>
        <Check color="$green10" />
      </Checkbox.Indicator>
    </Checkbox>
    <Text color="$gray11" flex={1}>
      {text}
    </Text>
  </XStack>
);

export default TaskCheckbox;
