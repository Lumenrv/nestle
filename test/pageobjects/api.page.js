import { $ } from '@wdio/globals';
import Page from './page.js';
import axios from 'axios';

class ApiPage extends Page {
  async login(username, password) {
    await this.inputUsername.setValue(username);
    await this.inputPassword.setValue(password);
    await this.btnSubmit.click();
  }

  async getResponse(endpoint) {
    try {
      const response = await axios.get(endpoint);
      return response;
    } catch (error) {
      return error.response;
    }
  }
}

export default new ApiPage();
