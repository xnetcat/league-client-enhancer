/* eslint-disable prettier/prettier */
import DodgeQueueInfo, {
  EasyQueueDodgeSettings,
} from "./easy-queue-dodge"

import MoreRunesInfo, {
  MoreRunesSettings,
  MoreRunesWindow
} from "./more-runes"

export { 
  EasyQueueDodgeSettings,
  MoreRunesSettings, MoreRunesWindow
}

export default function pluginsInfo() {
  return [DodgeQueueInfo(), MoreRunesInfo()]
}
