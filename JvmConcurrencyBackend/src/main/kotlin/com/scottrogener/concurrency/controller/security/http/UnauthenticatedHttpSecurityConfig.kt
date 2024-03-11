package com.scottrogener.contentpresentation.api.http.config.security.http

import com.scottrogener.concurrency.controller.security.http.BASE_HTTP_SECURITY
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.core.annotation.Order
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.web.SecurityFilterChain
import javax.annotation.Resource

@Configuration
class UnauthenticatedHttpSecurityConfig {
    @Resource(name = BASE_HTTP_SECURITY)
    private lateinit var http: HttpSecurity

    @Bean
    @Order(1)
    fun unauthenticatedHttpSecurity(): SecurityFilterChain {
        return http
            .securityMatcher("/**")
            .sessionManagement {
                it.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            }
            .authorizeHttpRequests {
                it.requestMatchers("/**").permitAll()
            }
            .build()
    }
}
