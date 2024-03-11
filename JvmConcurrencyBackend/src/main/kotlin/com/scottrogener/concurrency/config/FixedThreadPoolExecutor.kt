package com.scottrogener.concurrency.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import java.util.concurrent.ExecutorService
import java.util.concurrent.Executors

@Configuration
class FixedThreadPoolExecutor {
    @Bean("fixedPoolExecutor")
    fun fixedPoolExecutor(): ExecutorService {
        return Executors.newFixedThreadPool(10)
    }
}
