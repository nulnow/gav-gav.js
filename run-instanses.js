const http = require('http');
const httpProxy = require('http-proxy');
const proxy = httpProxy.createProxyServer({});

const PROXY_PORT = 9000;

const PORTS = [7777,8888,9999];

runInstanses(PORTS);

http.createServer((req, res) => {
    const port = getRandomElem(PORTS)
    console.log(port)
    proxy.web(req, res, { target: `http://localhost:${port}` });
}).listen(PROXY_PORT, () => {
    console.log(`Proxy is runnin on ${PROXY_PORT} port`);
});

function getRandomElem(arr) {
    return arr[Math.floor(Math.random()*arr.length)];
}

function runInstanses(ports) {
    const path = require('path');
    const { spawn } = require('child_process');
    
    const processes = ports.map(port => {
        let process = spawn('node', [path.join(__dirname, 'gav-gav.js'), 'serve', `--port=${port}`]);
        process.stdout.on('data', data => {
            console.log(`DATA PS${port}:`, data.toString('utf8'));
        });
        process.stderr.on('data', data => {
            console.log(`ERROR PS${port}:`, data.toString('utf8'));
        });
        process.on('close', () => {
            console.log(`CLOSED PS${port}. CODE: `, code);
        });
        return process;
    });
    console.log('INSTANCES ARE RUNNING ON PORTS', ports);

    return processes;
}