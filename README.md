P5 + TEACHABLE MACHINE INPUT ABOVE
ARDUINO CODE FOR SERVO


void setup() {
Serial.begin(115200);
}

void loop() {

if (Serial.available() > 0) { 
int val = Serial.parseInt();
analogWrite(11, val);
delay(15);

}
}
