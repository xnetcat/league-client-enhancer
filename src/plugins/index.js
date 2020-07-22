/* eslint-disable prettier/prettier */
import DodgeQueueInfo, {
  EasyQueueDodgeSettings,
} from "./easy-queue-dodge"

export { 
  EasyQueueDodgeSettings,
}

export default function pluginsInfo() {
  return [DodgeQueueInfo()]
}
