import { inbox } from "file-transfer"
import { updateMainWithData } from './updateMainWithData'

export const processIncomingFiles = () => {
  let file;
  while (file = inbox.nextFile()) {
    console.log(`/private/data/${file} received by peer application.`);
    if (file == 'stations.json') {
      updateMainWithData(file)
    }
  }
}
