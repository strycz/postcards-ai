import { Check } from '@tamagui/lucide-icons';
import { Checkbox } from 'tamagui';

const TaskCheckbox = ({ id, text, onCheckedChange }) => (
  <Checkbox id={id} size="$4" defaultChecked={true} onCheckedChange={onCheckedChange}>
    <Checkbox.Indicator>
      <Check color="$green10" />
    </Checkbox.Indicator>
  </Checkbox>
);

export default TaskCheckbox;
