package com.scottrogener.concurrency.controller

import com.fasterxml.jackson.annotation.JsonInclude
import jakarta.servlet.http.HttpServletRequest
import mu.KotlinLogging
import org.slf4j.MDC
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.HttpRequestMethodNotSupportedException
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler

@ControllerAdvice
class RestExceptionHandler : ResponseEntityExceptionHandler() {
    private val myLogger = KotlinLogging.logger { }

    @ExceptionHandler(value = [Exception::class])
    fun defaultErrorHandler(req: HttpServletRequest, e: Exception): ResponseEntity<RestException>? {
        val activityId = MDC.get("activityId")
        try {
            myLogger.info("Error handler: ${e.javaClass.simpleName}")
            myLogger.info(e.message)
            myLogger.error("Exception $activityId", e)

            return when (e) {
                is HttpRequestMethodNotSupportedException -> createResponseEntity(HttpStatus.BAD_REQUEST, message = "Method not supported for this endpoint", activityId = activityId)
                else -> createResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR, activityId = activityId)
            }
        } catch (e: Exception) {
            myLogger.error("error in exception handler ${e.javaClass.simpleName}")
            return createResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR, activityId = activityId)
        }
    }

    private fun createResponseEntity(httpStatus: HttpStatus, message: String? = null, activityId: String?): ResponseEntity<RestException> {
        val exception = RestException(
            error = httpStatus.reasonPhrase,
            message = message,
            activityId = activityId,
        )
        return ResponseEntity(exception, httpStatus)
    }
}

@JsonInclude(JsonInclude.Include.NON_NULL)
data class RestException(
    val error: String?,
    val message: String?,
    val activityId: String?,
)
