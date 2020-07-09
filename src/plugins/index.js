import DodgeQueueInfo, { DodgeQueueSettings, doInBackground as DodgeQueueJob } from './DodgeQueue'
import DisableChatInfo, { DisableChatSettings, doInBackground as DisableChatJob } from './DisableChat'

export {
   DodgeQueueSettings, DodgeQueueJob,
   DisableChatSettings, DisableChatJob,
}

export default function pluginsInfo() {
   return [DodgeQueueInfo(), DisableChatInfo()]
}