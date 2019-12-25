import { me } from 'companion'
import * as messaging from "messaging";
import { getStations } from './stations'
import sizeof from 'object-sizeof'
import { outbox } from 'file-transfer'
import { encode } from 'cbor'

const sendData = async () => {
  const stations = await getStations()
  try {
    const data = encode(stations)
    await outbox.enqueue('stations.json', data)
  } catch (e) {
    throw e
  }
}

// Send initial data when device is ready for information transfer
messaging.peerSocket.onopen = () => {
  sendData()
}

// Send fresh data every 45 seconds
setInterval(sendData, 10 * 1000)

messaging.peerSocket.onerror = function(err) {
  console.log("Connection error: " + err.code + " - " + err.message);
  // TODO: Change UI screen to error screen when error occurs.
}
