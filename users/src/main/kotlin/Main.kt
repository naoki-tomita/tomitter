import driver.Database
import gateway.SessionGateway
import gateway.UsersGateway
import port.SessionPort
import port.UsersPort
import rest.createServer

fun main(args: Array<String>) {
    register(Database())
    register(UsersGateway(), UsersPort::class.java)
    register(SessionGateway(), SessionPort::class.java)

    val server = createServer()
    server.start()
}
