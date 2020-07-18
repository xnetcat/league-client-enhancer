import DodgeQueueInfo, {
  DodgeQueueSettings,
  doInBackground as DodgeQueueJob,
} from "./easy-queue-dodge"
import DisableChatInfo, {
  DisableChatSettings,
  doInBackground as DisableChatJob,
} from "./disable-chat"

export {
  DodgeQueueSettings,
  DodgeQueueJob,
  DisableChatSettings,
  DisableChatJob,
}

export default function pluginsInfo() {
  return [DodgeQueueInfo(), DisableChatInfo()]
}
