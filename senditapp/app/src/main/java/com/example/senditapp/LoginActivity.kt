import androidx.appcompat.app.AppCompatActivity
import com.example.senditapp.MyApplication

class LoginActivity : AppCompatActivity() {
    // ...

    private fun login() {
        // Perform login logic
        // ...

        // Update the login status in MainActivity
        (applicationContext as? MyApplication)?.mainActivity?.updateLoginStatus(true)
    }
}
