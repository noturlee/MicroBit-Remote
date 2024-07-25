const WIFI_MODE: number = 2
const Tx_pin: SerialPin = SerialPin.P12
const Rx_pin: SerialPin = SerialPin.P8
const LED_pin: DigitalPin = DigitalPin.P2
const SSID_1: string = "-----"
const PASSWORD_1: string = "-----"
const SSID_2: string = "Uncle-EB"
const PASSWORD_2: string = "IamSpeed"
let LED_status: number = 0 // 0 for off, 1 for on
let serial_str: string = ""
let rainbow_led_status: boolean = false // false means LEDs are off

pins.digitalWritePin(LED_pin, 0)
serial.redirect(Tx_pin, Rx_pin, 115200)
sendAT("AT+RESTORE", 1000)
sendAT("AT+RST", 1000)
sendAT("AT+CWMODE=" + WIFI_MODE)

if (WIFI_MODE == 1) {
    sendAT("AT+CWJAP=\"" + SSID_1 + "\",\"" + PASSWORD_1 + "\"")
    if (!waitForResponse("OK")) control.reset()
} else if (WIFI_MODE == 2) {
    sendAT("AT+CWSAP=\"" + SSID_2 + "\",\"" + PASSWORD_2 + "\",1,4", 1000)
}

sendAT("AT+CIPMUX=1")
sendAT("AT+CIPSERVER=1,80")
sendAT("AT+CIFSR")
basic.showIcon(IconNames.Yes)

while (true) {
    let incoming: string = serial.readString()
    serial_str += incoming
    if (serial_str.length > 200) {
        serial_str = serial_str.substr(serial_str.length - 200)
    }

    if (serial_str.includes("+IPD") && serial_str.includes("HTTP")) {
        let client_ID: string = serial_str.substr(serial_str.indexOf("IPD") + 4, 1)
        let GET_pos: number = serial_str.indexOf("GET")
        let HTTP_pos: number = serial_str.indexOf("HTTP")
        let GET_command: string = serial_str.substr(GET_pos + 5, (HTTP_pos - 1) - (GET_pos + 5))
        let GET_success: boolean = false

        switch (GET_command) {
            case "":
                GET_success = true
                break
            case "Sad":
                GET_success = true
                LED_status = 1 - LED_status
                pins.digitalWritePin(LED_pin, LED_status)
                basic.showIcon(IconNames.Sad)
                break
            case "Happy":
                GET_success = true
                LED_status = 1 - LED_status
                pins.digitalWritePin(LED_pin, LED_status)
                basic.showIcon(IconNames.Happy)
                break
            case "forward":
                GET_success = true
                maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.AllMotor, maqueenPlusV2.MyEnumDir.Forward, 45) // Increased speed
                break
            case "backward":
                GET_success = true
                maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.AllMotor, maqueenPlusV2.MyEnumDir.Backward, 45) // Increased speed
                break
            case "left":
                GET_success = true
                maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.LeftMotor, maqueenPlusV2.MyEnumDir.Backward, 45) // Increased speed
                maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.RightMotor, maqueenPlusV2.MyEnumDir.Forward, 45) // Increased speed
                break
            case "right":
                GET_success = true
                maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.LeftMotor, maqueenPlusV2.MyEnumDir.Forward, 45) // Increased speed
                maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.RightMotor, maqueenPlusV2.MyEnumDir.Backward, 45) // Increased speed
                break
            case "stop":
                GET_success = true
                maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.AllMotor, maqueenPlusV2.MyEnumDir.Forward, 0)
                break
            case "led_on":
                GET_success = true
                maqueenPlusV2.ledRainbow(300, 255) // Turn on the rainbow LEDs
                rainbow_led_status = true // Update the status
                break
            case "led_off":
                GET_success = true
                maqueenPlusV2.ledRainbow(300, 0) // Turn off the rainbow LEDs
                rainbow_led_status = false // Update the status
                break
            case "hoot":
                GET_success = true
                music.playTone(262, music.beat(BeatFraction.Whole))
                break
        }

        let HTML_str: string = getHTML(GET_success)
        sendAT("AT+CIPSEND=" + client_ID + "," + (HTML_str.length + 2))
        sendAT(HTML_str, 500)
        sendAT("AT+CIPCLOSE=" + client_ID)
        serial_str = ""
    }
}

function sendAT(command: string, waitTime: number = 100) {
    serial.writeString(command + "\u000D\u000A")
    basic.pause(waitTime)
}

function getHTML(normal: boolean): string {
    let LED_statusString: string = ""
    let LED_buttonString: string = ""
    let web_title: string = "ESP8266 (ESP-01) Wifi on BBC micro:bit"
    let html: string = ""
    html += "HTTP/1.1 200 OK\r\n"
    html += "Content-Type: text/html\r\n"
    html += "Connection: close\r\n\r\n"
    html += "<!DOCTYPE html>"
    html += "<html>"
    html += "<head>"
    html += "<link rel=\"icon\" href=\"data:,\">"
    html += "<title>" + web_title + "</title>"
    html += "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">"
    html += "</head>"
    html += "<body>"
    html += "<div style=\"text-align:center\">"
    html += "<h1>" + web_title + "</h1>"
    html += "<br>"
    if (normal) {
        if (LED_status) {
            LED_statusString = "ON"
            LED_buttonString = "TURN IT OFF"
        } else {
            LED_statusString = "OFF"
            LED_buttonString = "TURN IT ON"
        }
        html += "<h3>LED STATUS: " + LED_statusString + "</h3>"
        html += "<h3>Light Level STATUS: " + input.lightLevel().toString() + "</h3>"
        html += "<h3>Temp STATUS: " + input.temperature().toString() + "</h3>"
        html += "<br>"
        html += "<input type=\"button\" onClick=\"window.location.href='LED'\" value=\"" + LED_buttonString + "\">"
        html += "<br>"
    } else {
        html += "<h3>ERROR: REQUEST NOT FOUND</h3>"
    }
    html += "<br>"
    html += "<input type=\"button\" onClick=\"window.location.href='/'\" value=\"Home\">"
    html += "</div>"
    html += "</body>"
    html += "</html>"
    return html
}

function waitForResponse(str: string): boolean {
    let result: boolean = false
    let time: number = input.runningTime()
    while (true) {
        serial_str += serial.readString()
        if (serial_str.length > 200) {
            serial_str = serial_str.substr(serial_str.length - 200)
        }
        if (serial_str.includes(str)) {
            result = true
            break
        }
        if (input.runningTime() - time > 30000) break // Shorter timeout for quicker response
    }
    return result
}
