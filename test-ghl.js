import fetch from 'node-fetch';

const GHL_API_KEY = 'pit-c2cd0560-41a1-4bc9-83c9-3e0b46ab0e62';
const CALENDAR_ID = 'lZdUtuT0ufJlVxYH6Sjn';

async function testGHL() {
    const startDate = new Date().getTime();
    const endDate = new Date(new Date().setDate(new Date().getDate() + 14)).getTime(); // 2 weeks from now
    const timezone = 'America/New_York';

    const url = `https://services.leadconnectorhq.com/calendars/${CALENDAR_ID}/free-slots?startDate=${startDate}&endDate=${endDate}&timezone=${timezone}`;

    console.log(`Fetching from: ${url}`);

    try {
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${GHL_API_KEY}`,
                'Version': '2021-04-15',
                'Accept': 'application/json'
            }
        });

        console.log(`Status: ${response.status}`);
        const text = await response.text();
        console.log(`Response: ${text}`);

    } catch (error) {
        console.error('Error:', error);
    }
}

testGHL();
