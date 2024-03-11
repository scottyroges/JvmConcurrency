package com.scottrogener.concurrency.config

import com.fasterxml.jackson.databind.PropertyNamingStrategies
import io.ktor.client.HttpClient
import io.ktor.client.engine.cio.CIO
import io.ktor.client.plugins.contentnegotiation.ContentNegotiation
import io.ktor.client.plugins.logging.DEFAULT
import io.ktor.client.plugins.logging.LogLevel
import io.ktor.client.plugins.logging.Logger
import io.ktor.client.plugins.logging.Logging
import io.ktor.serialization.jackson.jackson
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class KtorConfig {
    @Bean("ktorHttpClient")
    fun httpClient(): HttpClient {
        val httpClient = HttpClient(CIO) {
            expectSuccess = true
            followRedirects = false
            engine {
                threadsCount = 200
            }
            install(ContentNegotiation) {
                jackson(streamRequestBody = false) {
                    propertyNamingStrategy = PropertyNamingStrategies.SnakeCaseStrategy()
                }
            }
            install(Logging) {
                logger = Logger.DEFAULT
                level = LogLevel.ALL
            }
        }
        return httpClient
    }
}
