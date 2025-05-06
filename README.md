This repo will show you an accessibility bug in React Navigation (stack) on web/Electron.

Install all dependencies by running `yarn` in your terminal.

If you want to test this on web, pick a browser that can inspect the accessibility tree (Chrome).
To run it on web run `yarn web` in your terminal, open a browser and enter `localhost:8081`.

To run it on Electron, run `yarn desktop` in your terminal, an Electron window and devtools will open up.

Make sure devtools is opened and open the accessibility tree.
It should look something like this:
<img width="499" alt="image" src="https://github.com/user-attachments/assets/ae390cd9-a15a-4fbe-bfec-ddabf6492411" />

Click `Go to Details Screen` button.
The accessibility tree should look something like this.
<img width="507" alt="image" src="https://github.com/user-attachments/assets/b8209897-f86f-4478-9632-f6576d5e045d" />

It should not contain anything from the previous screen (Home Screen).

Click the switch that enables animation between screens.

Expected result should still be the same as above but instead the accessibility tree looks like this:
<img width="517" alt="image" src="https://github.com/user-attachments/assets/bc687f42-d6b6-4888-a3c4-14517b28d669" />

This means that when using a screen reader it will find the content from Home Screen.
It also means that if you use your tab key, the button on the Home Screen will be focusable which is not a wanted behaviour.

Also we get a warning in the console related to this:
<img width="1264" alt="image" src="https://github.com/user-attachments/assets/d5a11ca2-dff1-4213-b929-64f4cf4ff95a" />

If you instead run `yarn add @react-navigation/stack@7.2.0` and restart the app, you won't see this issue.
The version that this issue starts on is `7.2.1`, not sure that the console warning is there on that version but it is on version `7.3.1`.

The behaviour is the same on web and Electron, but I can't reproduce it on Expo Snack.
https://snack.expo.dev/@fyranollfyra/accessibility-bug


















