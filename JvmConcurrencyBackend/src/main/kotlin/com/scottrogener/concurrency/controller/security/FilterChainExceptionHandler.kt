package com.scottrogener.concurrency.controller.security

import jakarta.servlet.FilterChain
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import mu.KotlinLogging
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component
import org.springframework.web.filter.OncePerRequestFilter
import org.springframework.web.servlet.HandlerExceptionResolver

@Component
class FilterChainExceptionHandler(
    @Autowired val handlerExceptionResolver: HandlerExceptionResolver,
) : OncePerRequestFilter() {
    private val logger = KotlinLogging.logger { }

    override fun doFilterInternal(
        request: HttpServletRequest,
        response: HttpServletResponse,
        filterChain: FilterChain,
    ) {
        try {
            filterChain.doFilter(request, response)
        } catch (e: Exception) {
            logger.error("Spring Security Filter Chain Exception:", e)
            handlerExceptionResolver.resolveException(request, response, null, e)
        }
    }
}
