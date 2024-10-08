import { useConvexAuth } from 'convex/react';
import { Button, Form, Input, Spinner, Text, XStack } from 'tamagui';

const SubmitForm = ({ input, setInput, addTask, status, setStatus }) => {
  const { isLoading, isAuthenticated } = useConvexAuth();

  return (
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

      <Text>{isAuthenticated ? 'Authenticated' : 'Not Authenticated'}</Text>
      <Text>{isLoading ? 'Clerk Loading...' : 'Clerk Loaded'}</Text>

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
};

export default SubmitForm;
