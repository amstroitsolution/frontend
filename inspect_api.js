import https from 'https';

https.get('http://localhost:5000/api/women-products', (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
        try {
            const json = JSON.parse(data);
            if (Array.isArray(json) && json.length > 0) {
                const item = json[0];
                console.log('Keys:', JSON.stringify(Object.keys(item)));
                console.log('Category value:', item.category);
                console.log('Type value:', item.type);
            }
        } catch (e) {
            console.error(e.message);
        }
    });
});
