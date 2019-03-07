package gateway

import kotlin.reflect.KClass
import kotlin.reflect.full.createInstance
import kotlin.reflect.jvm.internal.impl.metadata.ProtoBuf

class Singleton {
    companion object {
        private val map = mutableMapOf<KClass<*>, Any>()
        fun get(clazz: KClass<*>): Any {
            if (map.containsKey(clazz)) {
                return map.get(clazz)!!
            }
            val instance = clazz.createInstance()
            map.set(clazz, instance)
            return instance
        }
    }
}
