pluginManagement {
    plugins {
        id("org.springframework.boot") version "2.7.4"
        id("io.spring.dependency-management") version "1.0.11.RELEASE"
        kotlin("jvm") version "1.7.20"
        kotlin("plugin.spring") version "1.7.20"
        id("io.gatling.gradle") version "3.9.3"
        id("org.jlleitschuh.gradle.ktlint") version "12.1.0"
    }
    repositories {
        mavenCentral()
        gradlePluginPortal()
    }
}
rootProject.name = "JvmConcurrencyBackend"
