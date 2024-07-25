package com.example.microbit_kotlin

import android.content.Context
import android.os.Bundle
import android.os.Vibrator
import android.util.Log
import android.widget.ImageButton
import androidx.appcompat.app.AppCompatActivity
import com.example.microbit_kotlin.R
import okhttp3.Call
import okhttp3.Callback
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.Response
import java.io.IOException

class MainActivity : AppCompatActivity() {

    private val client = OkHttpClient()
    private val baseUrl = "http://192.168.4.1/"
    private var isLedOn = false
    private lateinit var vibrator: Vibrator

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        vibrator = getSystemService(Context.VIBRATOR_SERVICE) as Vibrator

        val buttonForward = findViewById<ImageButton>(R.id.button_forward)
        val buttonBackward = findViewById<ImageButton>(R.id.button_backward)
        val buttonLeft = findViewById<ImageButton>(R.id.button_left)
        val buttonRight = findViewById<ImageButton>(R.id.button_right)
        val buttonStop = findViewById<ImageButton>(R.id.button_stop)
        val buttonLed = findViewById<ImageButton>(R.id.button_led)
        val buttonHoot = findViewById<ImageButton>(R.id.button_hoot)

        buttonForward.setOnClickListener {
            sendCommand("forward")
            vibrate()
        }
        buttonBackward.setOnClickListener {
            sendCommand("backward")
            vibrate()
        }
        buttonLeft.setOnClickListener {
            sendCommand("left")
            vibrate()
        }
        buttonRight.setOnClickListener {
            sendCommand("right")
            vibrate()
        }
        buttonStop.setOnClickListener {
            sendCommand("stop")
            vibrate()
        }
        buttonLed.setOnClickListener {
            toggleLed()
            vibrate()
        }
        buttonHoot.setOnClickListener {
            sendCommand("hoot")
            vibrate()
        }
    }

    private fun sendCommand(command: String) {
        val url = "$baseUrl$command"
        val request = Request.Builder().url(url).build()

        client.newCall(request).enqueue(object : Callback {
            override fun onFailure(call: Call, e: IOException) {
                Log.e("MainActivity", "Command failed: ${e.message}")
            }

            override fun onResponse(call: Call, response: Response) {
                if (!response.isSuccessful) {
                    Log.e("MainActivity", "Unexpected code: ${response.code}")
                }
                response.close()
            }
        })
    }

    private fun toggleLed() {
        val command = if (isLedOn) "led_off" else "led_on"
        sendCommand(command)
        isLedOn = !isLedOn
    }

    private fun vibrate() {
        if (vibrator.hasVibrator()) {
            vibrator.vibrate(80)
        }
    }
}
