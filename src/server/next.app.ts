import next from "next"
const dev = process.env.NODE_ENV !== 'production'
const nextServer = next({ dev: dev, dir: './src/client' })
export default nextServer