package com.scottrogener.concurrency.controller.security.http

import com.scottrogener.concurrency.controller.security.CommonLoggingHandler
import com.scottrogener.concurrency.controller.security.FilterChainExceptionHandler
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Primary
import org.springframework.context.annotation.Scope
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.web.authentication.logout.LogoutFilter

const val BASE_HTTP_SECURITY = "baseHttpSecurity"

@Configuration
class BaseHttpSecurityConfiguration {
    @Autowired
    private lateinit var filterChainExceptionHandler: FilterChainExceptionHandler

    @Autowired
    private lateinit var commonLoggingHandler: CommonLoggingHandler

    @Bean(BASE_HTTP_SECURITY)
    @Scope("prototype")
    @Primary
    fun baseHttpSecurity(http: HttpSecurity): HttpSecurity {
        http.addFilterBefore(commonLoggingHandler, LogoutFilter::class.java)
        http.addFilterBefore(filterChainExceptionHandler, LogoutFilter::class.java)
        return http
    }
}
