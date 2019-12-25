import * as messaging from "messaging";
import { inbox } from "file-transfer"
import document from "document";
import { processIncomingFiles } from './events/processIncomingFiles'
import { update } from './ui'

console.log('Hello world!');

messaging.peerSocket.onmessage = (evt) => {
  console.log(JSON.stringify(evt.data));
}


inbox.addEventListener('newfile', processIncomingFiles);
