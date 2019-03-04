package domain

open class FCC<T>(val values: List<T>) {
    fun <P>map(predicate: (T) -> P) = values.map(predicate)
}