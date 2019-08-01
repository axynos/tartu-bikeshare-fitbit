import { me } from 'companion'
import * as messaging from "messaging";
import { getStations } from './stations'
import sizeof from 'object-sizeof'
import { outbox } from 'file-transfer'
import { encode } from 'cbor'

// Helper
const MS_PER_MINUTE = 1000 * 60
me.wakeInterval = 30 * MS_PER_MINUTE

// The companion started due to a periodic timer
if (me.launchReasons.wokenUp) {
  console.log("Started due to wake interval!")
} else {
  // Close the companion and wait to be awoken
  me.yield()
}

messaging.peerSocket.onopen = () => {
  sendData()
}

messaging.peerSocket.onerror = function(err) {
  console.log("Connection error: " + err.code + " - " + err.message);
}

const sendData = async () => {
  const stations = await getStations()

  try {
    const data = encode(stations)
    await outbox.enqueue('stations.json', data)
  } catch (e) {
    throw e
  }
}

/*

  Primary locked cycle count is the normal bike count
  Secondary locked cycle count is the electric bike count
  Total locked cycle count is the combined count of cycles in the docks.


*/
