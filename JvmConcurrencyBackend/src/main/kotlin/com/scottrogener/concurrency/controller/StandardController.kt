package com.scottrogener.concurrency.controller

import com.scottrogener.concurrency.service.Service
import com.scottrogener.concurrency.util.ThreadLogger
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.slf4j.MDCContext
import kotlinx.coroutines.withContext
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestHeader
import org.springframework.web.bind.annotation.ResponseBody

@Controller
class StandardController(
    @Autowired private val service: Service,
) {
    @GetMapping("/api/co/{identifier}")
    @ResponseBody
    suspend fun coGetApi(@PathVariable identifier: String, @RequestHeader(name = "Authorization") token: String): String =
        withContext(Dispatchers.IO + MDCContext()) {
            ThreadLogger.infoCoroutine("StandardController.coGetApi", "start")
            val response = service.ktorNetworkCallsSuspend(token)
            ThreadLogger.infoCoroutine("StandardController.coGetApi", "end")
            response
        }

    @GetMapping("/api/{identifier}")
    @ResponseBody
    fun getApi(@PathVariable identifier: String, @RequestHeader(name = "Authorization") token: String): String {
        ThreadLogger.info("StandardController.getApi", "start")
        val response = service.javaNetworkCallsCoroutinesCancellations(token)
        ThreadLogger.info("StandardController.getApi", "end")
        return response
    }
}
