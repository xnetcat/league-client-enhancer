/* eslint-disable prettier/prettier */
import DodgeQueueInfo, {
  EasyQueueDodgeSettings,
} from "./easy-queue-dodge"

import AutoSaveRunesInfo, {
  AutoSaveRunesSettings,
} from "./auto-save-runes"

export { 
  EasyQueueDodgeSettings,
  AutoSaveRunesSettings,
}

export default function pluginsInfo() {
  return [DodgeQueueInfo(), AutoSaveRunesInfo()]
}
