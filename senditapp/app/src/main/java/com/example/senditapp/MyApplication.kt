package com.example.senditapp

import LoginActivity
import android.app.Application

class MyApplication : Application() {
    // Add your custom application logic here
    var mainActivity: MainActivity? = null
    var loginActivity: LoginActivity? = null

}
