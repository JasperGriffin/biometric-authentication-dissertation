/*export class KeystrokesTemplate {
    'username': string = '';
    'keystrokes': string[] = [];
    'keydownLatency': number[] = []; //time between two key presses
    'keyupLatency': number[] = []; //time between two key releases
    'holdingDuration': number[] = [];  //time between keydown and subsequent keyup
    'releaseDuration': number[] = []; //time between keyup and subsequent keydown
    'mousemove': number = 0; 
}*/

export var KeystrokesTemplate = {
    username: '',
    mousemove: 0,
    keystrokes: new Array(),
    key: [
        {
            keydownLatency: new Array(),
            keyupLatency: new Array(),
            holdingDuration: new Array(),
            releaseDuration: new Array()
        },
        {
            keydownLatency: new Array(),
            keyupLatency: new Array(),
            holdingDuration: new Array(),
            releaseDuration: new Array()
        },
        {
            keydownLatency: new Array(),
            keyupLatency: new Array(),
            holdingDuration: new Array(),
            releaseDuration: new Array()
        }
    ]
}
