export class KeystrokesTemplate {
    'username': string = '';
    'keystrokes': string[] = [];
    'keydownLatency': number[] = []; //time between two key presses
    //keyupLatency: number[] = []; //time between two key releases
    'holdingDuration': number[] = [];  //time between keydown and subsequent keyup
    //releaseDuration: number[] = []; //time between keyup and subsequent keydown
}