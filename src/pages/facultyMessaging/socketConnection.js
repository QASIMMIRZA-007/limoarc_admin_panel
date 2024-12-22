import { io } from "socket.io-client"
import { SOCKET_URL } from "../../Services/Constants"
export default io.connect(SOCKET_URL, {})
