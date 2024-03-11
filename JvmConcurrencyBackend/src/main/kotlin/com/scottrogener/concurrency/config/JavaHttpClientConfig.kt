package com.scottrogener.concurrency.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import java.net.http.HttpClient
import java.net.http.HttpResponse

@Configuration
class JavaHttpClientConfig {
    @Bean("javaHttpClient")
    fun httpClient(): HttpClient {
        return HttpClient.newBuilder()
            .build()
    }
}

fun <T> HttpResponse<T>.isOk(): Boolean {
    return this.statusCode() in 200..299
}

fun <T> HttpResponse<T>.isError(): Boolean {
    return this.isOk().not()
}
