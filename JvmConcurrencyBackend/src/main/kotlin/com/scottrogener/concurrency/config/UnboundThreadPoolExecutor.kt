package com.scottrogener.concurrency.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import java.util.concurrent.ExecutorService
import java.util.concurrent.Executors

@Configuration
class UnboundThreadPoolExecutor {
    @Bean("unboundPoolExecutor")
    fun unboundPoolExecutor(): ExecutorService {
        return Executors.newCachedThreadPool()
    }
}
