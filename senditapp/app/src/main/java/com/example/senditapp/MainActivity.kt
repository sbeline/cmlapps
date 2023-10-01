package com.example.senditapp

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import android.view.Menu
import android.view.MenuItem
import androidx.appcompat.widget.Toolbar
import com.example.senditapp.R.id.navigation_dashboard
import com.google.android.material.bottomnavigation.BottomNavigationView

class MainActivity : AppCompatActivity() {

    private lateinit var bottomNavView: BottomNavigationView
    private var isLoggedIn = false

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val toolbar: Toolbar = findViewById(R.id.toolbar)
        setSupportActionBar(toolbar)

        bottomNavView = findViewById(R.id.bottomNavView)
        bottomNavView.setOnItemSelectedListener { menuItem ->
            if (isLoggedIn) {
                when (menuItem.itemId) {
                    navigation_dashboard -> {
                        // Handle home menu item selection
                        true
                    }

                    R.id.navigation_plans -> {
                        // Handle dashboard menu item selection
                        true
                    }

                    R.id.navigation_program -> {
                        // Handle notifications menu item selection
                        true
                    }

                    else -> false
                    }
                } else {
                    // Show login screen or prompt user to log in
                    // Return false to prevent item selection
                    false
                }
            }
        }



    override fun onCreateOptionsMenu(menu: Menu): Boolean {
        // Inflate the menu; this adds items to the action bar if it is present.
        menuInflater.inflate(R.menu.menu_main, menu)
        return true
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        return when (item.itemId) {
            R.id.action_settings -> true
            else -> super.onOptionsItemSelected(item)
        }
    }
    fun updateLoginStatus(isLoggedIn: Boolean) {
        this.isLoggedIn = isLoggedIn
        invalidateOptionsMenu() // Refresh the options menu
    }

}