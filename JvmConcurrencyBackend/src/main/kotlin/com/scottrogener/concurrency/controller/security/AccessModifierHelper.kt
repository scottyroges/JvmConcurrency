@file:Suppress("INVISIBLE_REFERENCE", "EXPOSED_PARAMETER_TYPE", "INVISIBLE_MEMBER")

package com.scottrogener.concurrency.controller.security

import java.lang.reflect.Field

inline fun <reified A> Any.declaredFieldValue(name: String): A =
    declaredField(name).get(this) as A

fun Any.declaredField(name: String): Field =
    this::class.java.getDeclaredField(name).apply {
        isAccessible = true
    }
