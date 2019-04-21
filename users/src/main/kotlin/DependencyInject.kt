val map: MutableMap<Class<*>, Any> = mutableMapOf()
inline fun <reified T: Any>register(instance: T, `as`: Class<*>? = null) {
    map[`as` ?: T::class.java] = instance
}

inline fun <reified T: Any> inject(): T {
    return map[T::class.java] as T
}

fun reset() {
    map.clear()
}