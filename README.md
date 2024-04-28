# Green Route

<img src="src/assets/banner.png" alt="banner"/>

`GreenRoute` is a revolutionary application that leverages `Google's Generative AI` to provide eco-conscious travelers with sustainable and environmentally friendly travel options. By analyzing transportation and accommodation choices, GreenRoute aims to minimize carbon footprints while offering enriching travel experiences.

<img style="width: 500px" src="src/assets/dashboard.png" alt="banner"/>

## Features
**Eco-friendly Route Planning**: Users can input their starting point, destination, and sustainability preferences. GreenRoute then generates eco-friendly routes and provides insightful descriptions on how to enjoy the journey sustainably.

<img style="width: 500px" src="src/assets/direction.png" alt="itinerary">

<img style="width: 500px" src="src/assets/description.png" alt="itinerary"/>

**Environmental Impact Tracking**: Users can monitor their overall carbon footprint and visualize how their travel choices contribute to emissions, empowering them to make informed decisions.

<img style="width: 500px" src="src/assets/carbone.png" alt="itinerary"/>

**Weather Forecast**: GreenRoute offers weather forecast for both the origin and destination, ensuring travelers are prepared for their journey.

<img style="width: 500px" src="src/assets/weather.png" alt="itinerary"/>

**History**: Users can view their past travel prompts, helping them track their sustainability progress and revisit memorable trips.

<img style="width: 500px" src="src/assets/history.png" alt="banner"/>

<img style="width: 500px" src="src/assets/history-view.png" alt="banner"/>

# Upcoming Features

**Virtual Assistant**: Introducing a virtual guide feature to assist travelers during their journeys, providing information and recommendations.

**Radio Stations Integration**: Users can enjoy music and stay informed while traveling by accessing integrated radio stations.

<img style="width: 500px" src="src/assets/radio.png" alt="banner"/>

**Business Plan**: A new business plan option will be available for users looking to upgrade their services at an affordable price.

<img style="width: 500px" src="src/assets/plan.png" alt="banner"/>

# Installation of this UI
To run the Green Route web application locally using React with Vite, follow these steps:

- ***Prerequisites***:
    - Node.js installed (recommend using Node.js 14+).
    - `npm` package manager installed (optional but recommended).
- ***Install Dependencies:***:
    - Install project dependencies
    <pre>npm install</pre>
- ***Set up environment variable:***:

    Create `.env` file containg this following variables:
    <pre>
        VITE_MAPS_API_KEY=dummy
        VITE_API_BASE_URL=dummy
        VITE_FIREBASE_API_KEY=dummu
        VITE_FIREBASE_AUTH_DOMAIN=dummy
        VITE_FIREBASE_PROJECT_ID=dummy
        VITE_FIREBASE_BUCKET=dummy
        VITE_FIREBASE_MESSAGE_ID=dummy
        VITE_FIREBASE_APP_ID=dummy
        VITE_FIREBASE_MEASUREMENT_ID=dummy
    </pre>
- ***Run the Application***:

    Start the Vite development server:
    <pre>npm run dev</pre>