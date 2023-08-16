const express = require('express');
const os = require('os');
const ps = require('ps-node');

const app = express();
const port = 2000;

app.get('/performance', (req, res) => {
    const performanceData = {
        cpuUsage: os.loadavg(),
        memoryUsage: {
            total: os.totalmem(),
            free: os.freemem()
        },
        diskUsage: os.cpus(),
        processes: []
    };

    ps.lookup({}, (err, resultList) => {
        if (err) {
            res.status(500).json({ error: 'Error fetching process data' });
            return;
        }
        resultList.forEach(process => {
            performanceData.processes.push({
                pid: process.pid,
                name: process.command,
                cpuUsage: process.cpu,
                memoryUsage: process.memory
            });
        });

        res.json(performanceData);
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
