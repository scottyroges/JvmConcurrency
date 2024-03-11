@file:Suppress("INVISIBLE_REFERENCE", "EXPOSED_PARAMETER_TYPE", "INVISIBLE_MEMBER")

package com.scottrogener.concurrency.util

import kotlinx.coroutines.CoroutineId
import kotlinx.coroutines.CoroutineName
import kotlinx.coroutines.currentCoroutineContext
import mu.KotlinLogging
import org.slf4j.MDC

object ThreadLogger {
    private val logger = KotlinLogging.logger {}

    fun info(prefix: String, message: String) {
        addAdditionalLogs()
        logger.info("$prefix:$message")
    }

    suspend fun infoCoroutine(prefix: String, message: String) {
        coAddAdditionalLogs()
        logger.info("$prefix:$message")
    }
}

fun addAdditionalLogs() {
    addAdditionalThreadLogs()
    addAdditionalVirtualThreadLogs()
    addAdditionalCoroutineLogs()
}

suspend fun coAddAdditionalLogs() {
    addAdditionalThreadLogs()
    addAdditionalVirtualThreadLogs()
    addAdditionalCoroutineLogs()
}

const val OS_THREAD = "osThread"

fun addAdditionalThreadLogs() {
    val thread = Thread.currentThread()
    if (thread.toString().startsWith("VirtualThread")) {
        MDC.put(OS_THREAD, thread.toString().split("/")[1].split("@")[1].trim())
    } else {
        MDC.put(OS_THREAD, thread.name.split("@").first().trim())
    }
}

const val VIRTUAL_THREAD = "virtualThread"

fun addAdditionalVirtualThreadLogs() {
    val thread = Thread.currentThread()
    if (thread.toString().startsWith("VirtualThread")) {
        MDC.put(VIRTUAL_THREAD, thread.name.split("@").first().trim())
    }
}

const val COROUTINE = "coroutine"

fun addAdditionalCoroutineLogs() {
    val thread = Thread.currentThread()
    if (thread.toString().contains("coroutine")) {
        MDC.put(COROUTINE, thread.name.split("@")[1].trim())
    }
}

suspend fun coAddAdditionalCoroutineLogs() {
    val coroutineContext = currentCoroutineContext()
    val identifier = coroutineContext[CoroutineName]?.let { it } ?: coroutineContext[CoroutineId]
    MDC.put(COROUTINE, identifier.toString())
}
