package com.scottrogener.concurrency.controller

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.ResponseBody

@Controller
class ThreadController {
    @GetMapping("/threads")
    @ResponseBody
    fun getThreads(): List<String> {
        var rootGroup = Thread.currentThread().threadGroup
        var parentGroup: ThreadGroup? = rootGroup.parent
        while (parentGroup != null) {
            rootGroup = parentGroup
            parentGroup = rootGroup.parent
        }
        var threads = arrayOfNulls<Thread>(rootGroup.activeCount())
        while (rootGroup.enumerate(threads, true) == threads.size) {
            threads = arrayOfNulls(threads.size * 2)
        }
        return threads.toList().filterNotNull().map { it.name }
    }
}
