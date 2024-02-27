import Page from './page.js';
import fs from 'fs';
import path from 'path';
const __dirname = path.resolve();

class OtherMethodsPage extends Page {
  async readJson(file) {
    const filePath = path.join(__dirname, file);
    const fileData = fs.readFileSync(filePath);
    return JSON.parse(fileData);
  }
}

export default new OtherMethodsPage();
