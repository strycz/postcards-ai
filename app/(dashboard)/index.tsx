import { ExternalLink } from '@tamagui/lucide-icons'
import { Anchor, H2, Paragraph, XStack, YStack } from 'tamagui'
import { Link } from 'expo-router'
import { ToastControl } from 'components/CurrentToast'
import TaskList from 'components/TaskList'

export default function Dashboard() {
  return (
    <YStack f={1} ai="center" gap="$8" px="$10" pt="$5">
      <H2>ODSOKDSO</H2>
      <Link href={'/(dashboard)/pricing'}>
      <H2>LETS GO TO PRICING</H2>
      </Link>

      <ToastControl />
    </YStack>
  )
}
