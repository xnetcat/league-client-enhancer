/* eslint-disable prettier/prettier */
import DodgeQueueInfo, {
  EasyQueueDodgeSettings,
} from "./easy-queue-dodge"

import AutoSaveRunesInfo, {
  AutoSaveRunesSettings,
  AutoSaveRunesWindow
} from "./auto-save-runes"

export { 
  EasyQueueDodgeSettings,
  AutoSaveRunesSettings,
  AutoSaveRunesWindow
}

export default function pluginsInfo() {
  return [DodgeQueueInfo(), AutoSaveRunesInfo()]
}
