## Setup & Running

### Hosted Online

https://anaesthesia-toolkit.vercel.app/

open site on mobile phone to ensure best experience of using this medical app

### Prerequisites

Make sure you have the following installed:

- Node.js (LTS recommended)
- Git
- Expo Go on an iOS or Android device

### 1. Clone the repository

```bash
git clone https://github.com/FatimahZahra30/med-app.git
cd med-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the Expo development server

```bash
npx expo start
```

A QR code will appear in the terminal.

### 4. Open the app

**iOS:**

- Open the Camera app on your iPhone.
- Scan the QR code.
- Select **Open in Expo Go**.

**Android:**

- Open the Expo Go app.
- Scan the QR code from the Expo development server.

If the device cannot connect to the development server, try starting Expo using a tunnel:

```bash
npx expo start --tunnel
```

Then scan the new QR code.

### 5. Testing the application

Once the application is running, the main workflows to test are:

- **Cardiac Arrest:** Start a cardiac arrest session and interact with the algorithm to record events.
- **Session Logs:** Complete a session and view the recorded session in the logs.
- **Session Details:** Open a saved session to view its timeline, summary, and outcome.
- **PDF Export:** From a completed session, select **Download as PDF** to export the session record.

### Notes

The application uses local device storage for session logs, so data is stored locally on the device running the application.

For the most reliable experience, testing on a physical device through Expo Go is recommended.
