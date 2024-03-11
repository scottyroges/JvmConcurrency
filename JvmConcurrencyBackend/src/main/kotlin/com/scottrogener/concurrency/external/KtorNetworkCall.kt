package com.scottrogener.concurrency.external

import com.scottrogener.concurrency.util.ThreadLogger
import io.ktor.client.HttpClient
import io.ktor.client.call.body
import io.ktor.client.request.get
import io.ktor.client.request.header
import io.ktor.http.ContentType
import io.ktor.http.contentType
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component
import javax.annotation.Resource

@Component
class KtorNetworkCall {
    @Resource(name = "ktorHttpClient")
    private lateinit var httpClient: HttpClient

    @Value("\$url")
    private lateinit var baseUrl: String

    suspend fun execute(latency: Long, token: String): String {
        ThreadLogger.infoCoroutine("KtorNetworkCall.execute", "start")
        val url = "$baseUrl/latency?delay=$latency"

        // TODO: try wrapping it in its own coroutine
        val response: Response = httpClient.get(url) {
            header("Authorization", token)
            contentType(ContentType.Application.Json)
        }.body()
        val message = response.message
        ThreadLogger.infoCoroutine("KtorNetworkCall.execute", "end")
        return message
    }

    data class Response(
        val message: String,
    )
}
