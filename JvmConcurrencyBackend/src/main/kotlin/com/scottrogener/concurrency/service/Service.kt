package com.scottrogener.concurrency.service

import com.scottrogener.concurrency.external.JavaHttpNetworkCall
import com.scottrogener.concurrency.external.KtorNetworkCall
import com.scottrogener.concurrency.util.ThreadLogger
import kotlinx.coroutines.Deferred
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.asCoroutineDispatcher
import kotlinx.coroutines.async
import kotlinx.coroutines.awaitAll
import kotlinx.coroutines.runBlocking
import kotlinx.coroutines.slf4j.MDCContext
import kotlinx.coroutines.withTimeout
import org.slf4j.MDC
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.stereotype.Component
import java.util.Timer
import java.util.TimerTask
import java.util.concurrent.ExecutorService
import java.util.concurrent.Executors
import java.util.concurrent.Future
import java.util.concurrent.TimeUnit
import kotlin.random.Random

@Component
class Service(
    @Autowired private val ktorNetworkCall: KtorNetworkCall,
    @Autowired private val javaHttpNetworkCall: JavaHttpNetworkCall,
    @Autowired @Qualifier("unboundPoolExecutor") private val unboundExecutorService: ExecutorService,
    @Autowired @Qualifier("fixedPoolExecutor") private val fixedExecutorService: ExecutorService,
    @Autowired @Qualifier("virtualPoolExecutor") private val virtualExecutorService: ExecutorService,
) {
    fun javaNetworkCallsSameThread(token: String): String {
        ThreadLogger.info("Service.javaNetworkCallsSameThread", "start")
        javaHttpNetworkCall.execute(1400, token)
        javaHttpNetworkCall.execute(500, token)
        ThreadLogger.info("Service.javaNetworkCallsSameThread", "end")
        return "success"
    }

    fun javaNetworkCallsExecutor(token: String): String {
        ThreadLogger.info("Service.javaNetworkCallsExecutor", "start")
        val context = MDC.getCopyOfContextMap()
        val future1 = unboundExecutorService.submit {
            MDC.setContextMap(context)
            javaHttpNetworkCall.execute(1400, token)
        }
        val future2 = unboundExecutorService.submit {
            MDC.setContextMap(context)
            javaHttpNetworkCall.execute(500, token)
        }
        future1.get()
        future2.get()
        ThreadLogger.info("Service.javaNetworkCallsExecutor", "end")
        return "success"
    }

    fun javaNetworkCallsExecutorManyCallsFixedPool(token: String): String {
        ThreadLogger.info("Service.javaNetworkCallsExecutorManyCallsFixedPool", "start")
        val context = MDC.getCopyOfContextMap()
        val futures = mutableListOf<Future<*>>()
        for (i in 1..20) {
            futures.add(
                fixedExecutorService.submit {
                    MDC.setContextMap(context)
                    javaHttpNetworkCall.execute(Random.nextLong(700L, 1400L), token)
                },
            )
        }
        futures.forEach { it.get() }
        ThreadLogger.info("Service.javaNetworkCallsExecutorManyCallsFixedPool", "end")
        return "success"
    }

    fun javaNetworkCallsExecutorManyCallsUnboundPool(token: String): String {
        ThreadLogger.info("Service.javaNetworkCallsExecutorManyCallsUnboundPool", "start")
        val context = MDC.getCopyOfContextMap()
        val futures = mutableListOf<Future<*>>()
        for (i in 1..20) {
            futures.add(
                unboundExecutorService.submit {
                    MDC.setContextMap(context)
                    javaHttpNetworkCall.execute(Random.nextLong(700L, 1400L), token)
                },
            )
        }
        futures.forEach { it.get() }
        ThreadLogger.info("Service.javaNetworkCallsExecutorManyCallsUnboundPool", "end")
        return "success"
    }

    fun javaNetworkCallsManyCallsCoroutinesBlocking(token: String): String {
        return runBlocking(Executors.newFixedThreadPool(2).asCoroutineDispatcher() + MDCContext()) {
            ThreadLogger.infoCoroutine("Service.javaNetworkCallsManyCallsCoroutinesBlocking", "start")
            val jobs = mutableListOf<Deferred<*>>()
            for (i in 1..20) {
                jobs.add(
                    async(MDCContext()) {
                        javaHttpNetworkCall.execute(Random.nextLong(700L, 1400L), token)
                    },
                )
            }
            jobs.awaitAll()
            ThreadLogger.infoCoroutine("Service.javaNetworkCallsManyCallsCoroutinesBlocking", "end")
            "success"
        }
    }

    fun javaNetworkCallsManyCallsCoroutinesNonBlocking(token: String): String {
        return runBlocking(Executors.newFixedThreadPool(2).asCoroutineDispatcher() + MDCContext()) {
            ThreadLogger.infoCoroutine("Service.javaNetworkCallsManyCallsCoroutinesNonBlocking", "start")
            val jobs = mutableListOf<Deferred<*>>()
            for (i in 1..20) {
                jobs.add(
                    async {
                        javaHttpNetworkCall.executeAsync(Random.nextLong(700L, 1400L), token)
                    },
                )
            }
            jobs.awaitAll()
            ThreadLogger.infoCoroutine("Service.javaNetworkCallsManyCallsCoroutinesNonBlocking", "end")
            "success"
        }
    }

    fun javaNetworkCallsManyCallsCoroutinesAndVirtualThreads(token: String): String {
        return runBlocking(virtualExecutorService.asCoroutineDispatcher() + MDCContext()) {
            ThreadLogger.infoCoroutine("Service.javaNetworkCallsManyCallsCoroutinesAndVirtualThreads", "start")
            val jobs = mutableListOf<Deferred<*>>()
            for (i in 1..20) {
                jobs.add(
                    async {
                        javaHttpNetworkCall.executeAsync(Random.nextLong(700L, 1400L), token)
                    },
                )
            }
            jobs.awaitAll()
            ThreadLogger.infoCoroutine("Service.javaNetworkCallsManyCallsCoroutinesAndVirtualThreads", "end")
            "success"
        }
    }

    suspend fun ktorNetworkCallsSuspend(token: String): String {
        ThreadLogger.infoCoroutine("Service.ktorNetworkCallsSuspend", "start")
        ktorNetworkCall.execute(1400, token)
        ktorNetworkCall.execute(500, token)
        ThreadLogger.infoCoroutine("Service.ktorNetworkCallsSuspend", "end")
        return "success"
    }

    @OptIn(ExperimentalCoroutinesApi::class)
    fun ktorNetworkCalls(token: String): String {
        return runBlocking(Executors.newFixedThreadPool(2).asCoroutineDispatcher() + MDCContext()) {
            ThreadLogger.infoCoroutine("Service.ktorNetworkCalls", "start")
            val jobs = mutableListOf<Deferred<*>>()
            for (i in 1..20) {
                jobs.add(
                    async {
                        ktorNetworkCall.execute(Random.nextLong(700L, 1400L), token)
                    },
                )
            }
            jobs.awaitAll()
            ThreadLogger.infoCoroutine("Service.ktorNetworkCalls", "end")
            "success"
        }
    }

    fun javaNetworkCallsVirtualPoolTimeout(token: String): String {
        ThreadLogger.info("Service.javaNetworkCallsVirtualPoolTimeout", "start")
        val context = MDC.getCopyOfContextMap()
        val futures = mutableListOf<Future<String>>()
        for (i in 1..20) {
            futures.add(
                virtualExecutorService.submit<String> {


                    // nested threads
//                    virtualExecutorService.submit {
                        MDC.setContextMap(context)
                        val result = javaHttpNetworkCall.execute(Random.nextLong(700L, 1400L), token)
//                    }
                    val currentThread = Thread.currentThread()
                    val timer = Timer()
                    timer.schedule(object : TimerTask(){
                        override fun run() {
                            ThreadLogger.info("Service.javaNetworkCallsVirtualPoolTimeout", "interrupt")
                            currentThread.interrupt()
                        }

                    }, 1L)
                    result
                },
            )
        }
        futures.forEach {
            try {
                val r = it.get()
                ThreadLogger.info("Service.javaNetworkCallsVirtualPoolTimeout", r)
            } catch (e: Exception) {
                ThreadLogger.info("Service.javaNetworkCallsVirtualPoolTimeout", "timeout")
            }
        }
        ThreadLogger.info("Service.javaNetworkCallsVirtualPoolTimeout", "end")
        return "success"
    }

    fun javaNetworkCallsCoroutinesCancellations(token: String): String {
        return runBlocking(Executors.newFixedThreadPool(2).asCoroutineDispatcher() + MDCContext()) {
            ThreadLogger.infoCoroutine("Service.javaNetworkCallsCoroutinesCancellations", "start")
            val jobs = mutableListOf<Deferred<*>>()
            for (i in 1..20) {
                jobs.add(
                    async {
                        try {
                            withTimeout(5L) {
                                javaHttpNetworkCall.executeAsync(Random.nextLong(700L, 1400L), token)
                            }
                        } catch (e: Exception) {
                            ThreadLogger.infoCoroutine("Service.javaNetworkCallsCoroutinesCancellations", "timeout")
                        }
                    },
                )
            }
            jobs.awaitAll()
            ThreadLogger.infoCoroutine("Service.javaNetworkCallsCoroutinesCancellations", "end")
            "success"
        }
    }
}
