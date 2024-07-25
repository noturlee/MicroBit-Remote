![banner](https://github.com/user-attachments/assets/450a3c1c-e9cf-486c-9ed9-895174021d09)

<div align =center>
   
# MacQueen Remote Control App

</div>

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Prerequisites](#prerequisites)
4. [Getting Started](#getting-started)
   - [Setup the Android App](#setup-the-android-app)
   - [Setup the MacQueen Plus v2 Robot](#setup-the-macqueen-plus-v2-robot)
5. [Code Explanation](#code-explanation)
6. [Troubleshooting](#troubleshooting)
7. [Roadmap](#roadmap)
8. [License](#license)
   
## Overview

The MacQueen Remote Control App is an Android application designed to control a MacQueen Plus v2 robot via WiFi. The app enables users to send movement commands to the robot, toggle its LED light, and activate its sound feature. It also provides haptic feedback (vibration) for each button press to enhance user interaction.

## Features

- **Robot Movement Control**: Move the robot forward, backward, left, or right.
- **LED Control**: Toggle the robot's LED light on and off.
- **Sound Control**: Activate the robot's sound feature.
- **Haptic Feedback**: Vibration feedback for each button press.

<img src ="https://media3.giphy.com/media/CjVw8uycZaLMxeR149/giphy.gif?cid=6c09b952niercwen66tqrvyw44kjjq9ncokx0vwo7xd444sx&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=s" width="250"/>

## Prerequisites

- Android device running API level 21 or higher.
- MacQueen Plus v2 robot connected to the same WiFi network as the Android device.

## Getting Started

### 1. Setup the Android App

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-repository/macqueen-remote-control.git
   cd macqueen-remote-control
2. **Open the Project**

Open the project in Android Studio.

3. **Update Network Configuration**

Ensure that your network_security_config.xml (referenced in AndroidManifest.xml) allows cleartext traffic if using HTTP:

```
<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <domain-config cleartextTrafficPermitted="true">
        <domain includeSubdomains="true">192.168.4.1</domain>
    </domain-config>
</network-security-config>
```

4. **Add Permissions**

Add the following permissions to your AndroidManifest.xml:

```
<uses-permission android:name="android.permission.INTERNET"/>
<uses-permission android:name="android.permission.VIBRATE"/>
```

5. ## Set up Microbit Code

Below is a link to my Code, it is important to understand the concepts of it and how it integrates and works with the Kotlin application, download and add this code to your microbit IDE:

https://makecode.microbit.org/S19893-69610-13178-56347

<h2 align="left" id="tech-stack">Technology Stack</h2>

> Tools and languages used.

<table>
  <tr>
    <td align="center" width="96">
      <a href="#canva">
        <img src="https://freepnglogo.com/images/all_img/1691829400logo-canva-png.png" width="48" height="48" alt="Canva" />
      </a>
      <br>Canva
    </td>
    <td align="center" width="96">
      <a href="#kotlin">
        <img src="https://upload.wikimedia.org/wikipedia/commons/7/74/Kotlin_Icon.png" width="48" height="48" alt="Kotlin" />
      </a>
      <br>Kotlin
    </td>
    <td align="center" width="96">
      <a href="#react">
        <img src="https://reactjs.org/logo-og.png" width="48" height="48" alt="React" />
      </a>
      <br>React
    </td>
    <td align="center" width="96">
      <a href="#typescript">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1200px-Typescript_logo_2020.svg.png" width="48" height="48" alt="TypeScript" />
      </a>
      <br>TypeScript
    </td>
  </tr>
</table>


5. **Build and Run**

Build and run the app on your Android device.

## Setup the MacQueen Plus v2 Robot

Ensure the MacQueen Plus v2 robot is connected to your WiFi network. The robot should be reachable at http://192.168.4.1/. Adjust the baseUrl in MainActivity if your robot's IP address is different.

## Code Explanation

- Network Requests: The app uses OkHttpClient to send HTTP requests to the robot for controlling various functions. Each button press triggers a specific command sent to the robot.

- Haptic Feedback: The app utilizes the Vibrator service to provide haptic feedback when a button is pressed, enhancing the user experience.

- Command Handling: The app handles commands to control robot movement, toggle the LED, and activate sound. The toggleLed method manages the LED state, switching it between on and off with each press.

- Kotlin App: The app is built using Kotlin and follows standard Android practices for handling UI interactions and network communication.

- MacQueen Plus v2 Robot: The MacQueen Plus v2 is a programmable robot that can be controlled over WiFi. It supports various commands for movement, LED control, and sound activation. Ensure the robot's firmware supports the commands sent by the app.

## Troubleshooting

- Robot Not Responding: Ensure the robot is connected to the same WiFi network as the Android device and that the IP address is correctly configured in the app.

- Vibration Not Working: Verify that the Android device has vibration hardware and that the vibration permission is correctly set in the app's manifest.

- Network Issues: Check network configurations and ensure that the network_security_config.xml permits cleartext traffic if using HTTP.


## Roadmap

| Phase       | Description                                  | Target Date     |
|-------------|----------------------------------------------|-----------------|
| **Phase 1** | Initial Development and Setup                | July 2024     |
| **Phase 2** | Core Features Implementation                 | July 2024  |
| **Phase 3** | Testing and Debugging                        | August 2024    |
| **Phase 4** | Final Review and Release                     | September 2024   |
| **Phase 5** | Post-Release Support and Updates             | September 2024   |


## License

This project is licensed under the MIT License. See the LICENSE file for details.

<br>
<br>

<div align = center>

<img src="https://github.com/user-attachments/assets/5e004f5a-037f-419c-b561-a0bbd01458d5" alt="image" width="350" height="300">

</div>


