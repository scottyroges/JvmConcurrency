package com.scottrogener.concurrency

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration
import org.springframework.boot.runApplication

@SpringBootApplication(
    scanBasePackages = ["com.scottrogener"],
    exclude = [DataSourceAutoConfiguration::class],
)
class Application

fun main(args: Array<String>) {
    runApplication<Application>(*args)
}
