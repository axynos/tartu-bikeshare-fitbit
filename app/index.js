import * as messaging from "messaging";
import { inbox } from "file-transfer"
import { readFileSync } from 'fs'
import { update } from './ui'
import document from "document";

console.log('Hello world!');

messaging.peerSocket.onmessage = (evt) => {
  console.log(JSON.stringify(evt.data));
}


const processIncomingFiles = () => {
  let file;
  while (file = inbox.nextFile()) {
    console.log(`/private/data/${file} received by peer application.`);
    if (file == 'stations.json') {
      const json = readFileSync(file, 'cbor')
      update({ type: 'withData', data: json })
      showApp()
    }
  }
}

inbox.addEventListener('newfile', processIncomingFiles);

const loadingScreen = document.getElementById('#loading')
const app = document.getElementById('#main')

const showApp = _ => {
  loadingScreen.style.display = "none";
  app.style.display = "inline";
}
