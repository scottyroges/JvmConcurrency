package com.scottrogener.concurrency.controller.security

import jakarta.servlet.FilterChain
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.slf4j.MDC
import org.springframework.stereotype.Component
import org.springframework.web.filter.OncePerRequestFilter
import java.util.UUID

const val ACTIVITY_ID = "activityId"
const val URL = "url"

@Component
class CommonLoggingHandler() : OncePerRequestFilter() {
    override fun doFilterInternal(
        request: HttpServletRequest,
        response: HttpServletResponse,
        filterChain: FilterChain,
    ) {
        val activityIdFromHeader = request.getHeader("x-activity-id") ?: request.getHeader("CF-Ray")
        val activityId = activityIdFromHeader ?: UUID.randomUUID().toString()
        MDC.put(ACTIVITY_ID, activityId)
        MDC.put(URL, request.requestURI.toString())

        filterChain.doFilter(request, response)
    }
}
