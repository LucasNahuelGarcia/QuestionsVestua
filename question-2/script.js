/**
 * On this module you should write your answer to question #2.
 * This file would be executed with the following command:
 * $ node scritp.js BrowsingEvents.csv
 */
const fs = require("fs");
const readline = require("readline");
const HashMap = require("hashmap");

const args = process.argv.slice(-1);
console.log(`Running question #2 with args ${args}`);

const readableStream = fs.createReadStream(args[0], 'utf8');
readableStream.on('error', (err) => console.log("error: " + err.message));

const rl = readline.createInterface({
    input: readableStream,
    output: process.stdout,
    terminal: false
});

const products = new HashMap();

rl.on('line', (line) => {
    // 0  ,   1    ,    2     ,   3
    //user,entityId,entityType,eventType
    const fields = line.split(',');
    const event = {
        user: fields[0],
        entityId: fields[1],
        entityType: fields[2],
        eventType: fields[3]
    };

    var productEventsCount = products.get(event.entityId) ??
        {
            impressions: 0,
            clicks: 0,
            users: {
                click: [],
                impression: []
            }
        };

    if (event.eventType === "impression" && !productEventsCount.users.impression.includes(event.user)) {
        productEventsCount.impressions ++;
        productEventsCount.users.impression.push(event.user);
    }
    else if (event.eventType === "click" && !productEventsCount.users.click.includes(event.user)) {
        productEventsCount.clicks ++;
        productEventsCount.users.click.push(event.user);
    }
    products.set(event.entityId, productEventsCount);
});

rl.on('close', () => {
    fs.writeFile("output.csv", "", (err) => { if(err) throw err; });
    fs.appendFile("output.csv", ["entityId", "clicks", "impressions", "CTR"].join(',') + '\n', (err) => {
        if (err)
            throw err;
    });
    products.forEach((val, key) => {
        var CTR = ( val.clicks / val.impressions ) * 100;
        if(CTR === Infinity)
            CTR = 100;
        const line = [val.clicks, val.impressions, key, CTR].join(',');
        console.log(line);
        fs.appendFile("output.csv", line + '\n', (err) => {
            if (err)
                throw err;
        });
    });
});


