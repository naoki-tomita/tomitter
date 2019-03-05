package domain

open class FCC<T>(val values: List<T>) {
    fun <R>map(predicate: (T) -> R) = values.map(predicate)
}