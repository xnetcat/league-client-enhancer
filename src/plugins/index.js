import DodgeQueueInfo, {
  DodgeQueueSettings,
  doInBackground as DodgeQueueJob,
} from "./easy-queue-dodge"

import AutoSaveRunesInfo, {
  AutoSaveRunesSettings,
  doInBackground as AutoSaveRunesJob,
} from "./auto-save-runes"

export {
  DodgeQueueSettings,
  DodgeQueueJob,
  AutoSaveRunesSettings,
  AutoSaveRunesJob,
}

export default function pluginsInfo() {
  return [DodgeQueueInfo(), AutoSaveRunesInfo()]
}
