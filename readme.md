## Simple tests project usind WDIO + Docker + Allure. Results are posted on gh pages


Tests description

Verify response status - 200:
Ensure that the API responds with status code 200 when accessed.

Verify response status - 404, if the endpoint is incorrect:
Test the response status code when accessing an incorrect endpoint.

Verify areas inside JSON:
Ensure that the response contains data for all expected regions.

Verify the number of holidays in each area:
Check if the number of holidays matches the expected count for each region.

Verify the type of holidays in each area:
Make sure each holiday event has the expected properties such as title, date, notes, and bunting.

Verify the date of each event:
Check if the date format of each event is as expected.

Verify the title of each event:
Ensure that each event title follows a specific pattern.

Verify the bunting of each event to be boolean:
Ensure that the 'bunting' property of each event is a boolean value.

Compare received response to JSON file:
Compare the response data with a known JSON file to ensure consistency.