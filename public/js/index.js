import '../socket.io/socket.io.js'

// /^\/socket\.io\/socket\.io(\.min|\.msgpack\.min)?\.js(\.map)?$/
console.log('HELLOOOOO CLIENT!')

const baseURL = document.querySelector('base').getAttribute('href')
const socket = window.io({ path: `${baseURL}socket.io` })

console.log('HELLO AGAIN')
