package com.scottrogener.concurrency.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import java.util.concurrent.ExecutorService
import java.util.concurrent.Executors

@Configuration
class VirtualThreadPoolExecutor {
    @Bean("virtualPoolExecutor")
    fun unboundPoolExecutor(): ExecutorService {
        return Executors.newThreadPerTaskExecutor(Thread.ofVirtual().name("my-pool-", 0).factory())
    }
}
