package domain

import org.amshove.kluent.shouldEqual
import org.junit.jupiter.api.Test

class SessionTest {
    @Test
    fun SessionCodeを生成するとランダムなStringを生成する() {
        SessionCode().value.length shouldEqual 8
    }
}