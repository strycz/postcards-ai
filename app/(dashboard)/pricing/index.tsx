import { ExternalLink } from '@tamagui/lucide-icons'
import { H2, YStack } from 'tamagui'

export default function TabOneScreen() {
  return (
    <YStack f={1} ai="center" gap="$8" px="$10" pt="$5">
      <H2>PRICING</H2>
      <ExternalLink />
    </YStack>
  )
}
