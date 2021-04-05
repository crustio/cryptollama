# Cryptollama AR app

## Setup

Took from this guide: https://docs.viromedia.com/docs/quick-start

```Bash

# install node
apt-get install node
apt-get install watchman


#install react native
npm install -g react-native-cli

# INstall ViroReact
npm install -g react-viro-cli

# Then go to project root and run following
yarn install
npm start
```

Then, download AR test App from App store:

IOS: https://itunes.apple.com/us/app/viro-media/id1163100576?mt=8

Android: https://play.google.com/store/apps/details?id=com.viromedia.viromedia

Install and open the above app, Tap on the menu icon in the top left and tap on "Enter Testbed".

Find your ngrok url (https://xxxxxx.ngrok.io) which is printed at the top of the terminal window where you ran npm start. Enter that into the empty text field on the Testbed screen (xxxxxx.ngrok.io) and press "Go".

You should see text saying "You just found a llama!" along with a cute llama in front of you.
