/*
import io from 'socket.io-client'

export const overrideStyle = {
    display: 'flex',
    margin: '0 auto',
    height: '24px',
    justifyContent: 'center',
    alignItems: 'center'
}
export const socket = io('http://localhost:5000')
*/
import io from 'socket.io-client'

const socketURL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000'

export const socket = io(socketURL)

export const overrideStyle = {
    display: 'flex',
    margin: '0 auto',
    height: '24px',
    justifyContent: 'center',
    alignItems: 'center'
}