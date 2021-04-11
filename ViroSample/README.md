# Cryptollama AR app

## Setup for Mac/Linux

Please follow this guide until step 3: https://docs.viromedia.com/docs/quick-start

Ignore step 4 and do the following instead:

```Bash

# Clone the repo
git clone git@github.com:hashx101/cryptollama.git

# Then go to ViroSample folder
cd ViroSample

# Install packages and start dev server
yarn
yarn start
```

Once react native dev serve is running, download AR test App from App store:

IOS: https://itunes.apple.com/us/app/viro-media/id1163100576?mt=8

Android: https://play.google.com/store/apps/details?id=com.viromedia.viromedia

Install and open the above app, Tap on the menu icon in the top left and tap on "Enter Testbed".

Find your ngrok url (https://xxxxxx.ngrok.io) which is printed at the top of the terminal window where you ran npm start. Enter that into the empty text field on the Testbed screen (xxxxxx.ngrok.io) and press "Go". THen click on the "AR" button.

Now you should be in the AR app, now look around you should be able to see a cute Llama. YOu should be able to click it to view the NFT.
