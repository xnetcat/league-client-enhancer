import DodgeQueueInfo, {
  DodgeQueueSettings,
  doInBackground as DodgeQueueJob,
} from "./easy-queue-dodge"

export { DodgeQueueSettings, DodgeQueueJob }

export default function pluginsInfo() {
  return [DodgeQueueInfo()]
}
