package simulations

import io.gatling.javaapi.core.CoreDsl.constantUsersPerSec
import io.gatling.javaapi.core.CoreDsl.scenario
import io.gatling.javaapi.core.Simulation
import io.gatling.javaapi.http.HttpDsl.http
import io.gatling.javaapi.http.HttpProtocolBuilder
import java.time.Duration
import java.util.UUID

class ConcurrencySimulation : Simulation() {
    init {

        val httpProtocol: HttpProtocolBuilder = http.baseUrl("http://localhost:8080")
            .header("Authorization", "Bearer eyJraWQiOiJKYl9kTC0zUTRCZGx3TlczRm5XNVNTaGp2TWtaclV3cVNVVFFRZ2hxMjQ4IiwidHlwIjoiSldUIiwiYWxnIjoiUlMyNTYifQ.eyJhdWQiOiJ1cm46b25lcGVsb3RvbjoqIiwic3ViIjoiYXV0aDB8ZGFiNmYzYTMxYzhmNGVlZTkwMmUzNjU0NjgxM2IyN2IiLCJodHRwOi8vb25lcGVsb3Rvbi5jb20vZW1haWwiOiJzY290dC5yb2dlbmVyQG9uZXBlbG90b24uY29tIiwiYXpwIjoiWU9VUl9DTElFTlRfSUQiLCJzY29wZSI6InBlbG90b24tYXBpLm1lbWJlcnM6ZGVmYXVsdCIsImlzcyI6Imh0dHBzOi8vbW9jay1vYXV0aC5tb2NrLW9hdXRoLnN0YWdlLms4cy5wZWxvdGltZS5jb20vIiwiaHR0cDovL29uZXBlbG90b24uY29tL3VzZXJfaWQiOiJkYWI2ZjNhMzFjOGY0ZWVlOTAyZTM2NTQ2ODEzYjI3YiIsImV4cCI6MTcwOTA2NjA3MCwiaWF0IjoxNzA5MDYyNDcwLCJndHkiOiJwYXNzd29yZCJ9.Jih76kKZLdmpZsenBbUVHvFwrcIVqvWR6OOa8HQ83dg3joFoqN7EO_IrIGNBHM8iuHzdEiNBpzQjKdXH78e4waStdcMsuC5XjuCdkrWyoNIyFb3ph5pFo41GxM0tlmiOxTWoy9eBkWxeFOehQ8ifOI9hsbcgrek4M5W3HGY0EaFqB7HeQHkROZob5Jv0jRbbuhH-3Qbsm47J-fADAMxsfHmNiPPwa8MiVyjU5PVLUfM2SRof0WN77PeojAFYQ5_kYl3wjWh9WVP7MZcsyoKq2AU-An-vzoz8Y6170Kw_WHD3bvIUXLhHiKr-BGwfxRzjK-l5jZPm_SUYyuCsafGNbg")

        val scn = scenario("Simulation")
            .exec(
                http("Request 1").get("/api/${UUID.randomUUID()}"),
            )

        this.setUp(
            scn.injectOpen(
                constantUsersPerSec(10.0).during(Duration.ofSeconds(5)),
            ).protocols(httpProtocol),
        )
    }
}
