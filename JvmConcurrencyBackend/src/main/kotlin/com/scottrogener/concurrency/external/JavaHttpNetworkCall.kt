package com.scottrogener.concurrency.external

import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import com.scottrogener.concurrency.config.isError
import com.scottrogener.concurrency.util.ThreadLogger
import kotlinx.coroutines.future.await
import mu.KotlinLogging
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component
import java.net.URI
import java.net.http.HttpClient
import java.net.http.HttpRequest
import java.net.http.HttpResponse
import javax.annotation.Resource

@Component
class JavaHttpNetworkCall {
    private val logger = KotlinLogging.logger { }

    private val jacksonObjectMapper = jacksonObjectMapper()

    @Resource(name = "javaHttpClient")
    private lateinit var httpClient: HttpClient

    @Value("\$url")
    private lateinit var baseUrl: String

    fun execute(latency: Long, token: String): String {
        ThreadLogger.info("JavaHttpNetworkCall.execute", "start")
        val url = "${baseUrl}/latency?delay=$latency"

        val request = HttpRequest.newBuilder()
            .uri(URI.create(url))
            .setHeader("Authorization", token)
            .setHeader("Content-Type", "application/json")
            .build()

        val response = httpClient.send(request, HttpResponse.BodyHandlers.ofString())
        if (response.isError()) {
            logger.error("${response.statusCode()}: ${response.body()}")
            throw RuntimeException("Error in JavaHttpNetworkCall.execute")
        }

        val body = response.body()
        val responseBody: Response = jacksonObjectMapper.readValue(body)
        ThreadLogger.info("JavaHttpNetworkCall.execute", "end")
        return responseBody.message
    }

    suspend fun executeAsync(latency: Long, token: String): String {
        ThreadLogger.infoCoroutine("JavaHttpNetworkCall.execute", "start")
        val url = "${baseUrl}/latency?delay=$latency"

        val request = HttpRequest.newBuilder()
            .uri(URI.create(url))
            .setHeader("Authorization", token)
            .setHeader("Content-Type", "application/json")
            .build()

        // TODO: wrap in its own coroutine
        val response = httpClient.sendAsync(request, HttpResponse.BodyHandlers.ofString()).await()
        if (response.isError()) {
            logger.error("${response.statusCode()}: ${response.body()}")
            throw RuntimeException("Error in JavaHttpNetworkCall.execute")
        }

        val body = response.body()
        val responseBody: Response = jacksonObjectMapper.readValue(body)
        ThreadLogger.infoCoroutine("JavaHttpNetworkCall.execute", "end")
        return responseBody.message
    }

    data class Response(
        val message: String,
    )
}
