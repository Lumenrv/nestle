import { expect } from '@wdio/globals';
import apiPage from '../pageobjects/api.page.js';
import otherPage from '../pageobjects/other.page.js';
const baseUrl = 'https://www.gov.uk/bank-holidays.json';

const regions = ['england-and-wales', 'scotland', 'northern-ireland'];

let response;
describe('Simple testing of bank holidays', () => {
  it('Verify response status - 200', async () => {
    response = await apiPage.getResponse(baseUrl);
    expect(response.status).toBe(200);
  });

  it('Verify response status - 404, if the endpoint is incorrect', async () => {
    response = await apiPage.getResponse(baseUrl + '&random=123');
    expect(response.status).toBe(404);
  });

  it('Verify areas inside JSON', async () => {
    response = await apiPage.getResponse(baseUrl);
    expect(Object.keys(response.data)).toHaveLength(3);
    for (let i = 0; i < regions.length; i++) {
      expect(response.data).toHaveProperty(regions[i]);
    }
  });

  it('Verify the number of holidays in each area', async () => {
    response = await apiPage.getResponse(baseUrl);
    expect(response.data['england-and-wales'].events).toHaveLength(75);
    expect(response.data.scotland.events).toHaveLength(84);
    expect(response.data['northern-ireland'].events).toHaveLength(93);
  });

  it('Verify the type of holidays in each area', async () => {
    response = await apiPage.getResponse(baseUrl);
    for (let i = 0; i < regions.length; i++) {
      for (let j = 0; j < response.data[regions[i]].events.length; j++) {
        expect(response.data[regions[i]].events[j]).toHaveProperty('title');
        expect(response.data[regions[i]].events[j]).toHaveProperty('date');
        expect(response.data[regions[i]].events[j]).toHaveProperty('notes');
        expect(response.data[regions[i]].events[j]).toHaveProperty('bunting');
      }
    }
  });

  it('Verify the date of each event', async () => {
    response = await apiPage.getResponse(baseUrl);
    for (let i = 0; i < regions.length; i++) {
      for (let j = 0; j < response.data[regions[i]].events.length; j++) {
        expect(response.data[regions[i]].events[j].date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      }
    }
  });

  it('Verify the title of each event', async () => {
    response = await apiPage.getResponse(baseUrl);
    for (let i = 0; i < regions.length; i++) {
      for (let j = 0; j < response.data[regions[i]].events.length; j++) {
        expect(response.data[regions[i]].events[j].title).toMatch(/^[A-Za-z0-9\s’'()]+$/);
      }
    }
  });

  it('Verify the bunting of each event to be boolean', async () => {
    response = await apiPage.getResponse(baseUrl);
    for (let i = 0; i < regions.length; i++) {
      for (let j = 0; j < response.data[regions[i]].events.length; j++) {
        expect(typeof response.data[regions[i]].events[j].bunting).toEqual('boolean');
      }
    }
  });

  it('Compare received response to json file', async () => {
    const fileJson = await otherPage.readJson('test/resources/test.json');
    response = await apiPage.getResponse(baseUrl);
    expect(response.data).toEqual(fileJson);
  });
});
