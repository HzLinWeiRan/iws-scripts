import net from 'net'

export default async (port) => {
    const result = await new Promise((resolve) => {
        let portTemp = port;
        (function comparePort() {
            const server = net.createServer().listen(portTemp)
            server.on('listening', () => { 
                server.close()
                resolve(portTemp)
            })
            server.on('error', (err) => {
                if (err.code === 'EADDRINUSE') {
                    portTemp += 1
                    comparePort()
                }
            })
        })()
    })
    return result
}