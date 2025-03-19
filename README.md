*Dawg*

Submitted by: **Anvesh Gupta**

This web app: **Dawg is a web application inspired by StumbleUpon, allowing users to discover random dog breeds using the Dog API. Users can click a button to fetch and display details about a new dog breed, including an image and attributes like breed name, origin, and temperament. A ban list feature lets users filter out breeds they don’t want to see again, ensuring a personalized discovery experience.**

Time spent: **10** hours spent in total 

## Required Features

The following **required** functionality is completed:

- [x] **Clicking a button creates a new API fetch request and displays at least three attributes from the returned JSON data**  
  *(The app fetches data from the Dog API and displays attributes like breed name, origin, and temperament.)*
- [x] **Only one item/API call is viewable at a time**  
  *(Only one dog breed is shown at a time, ensuring a focused user experience.)*
- [x] **API calls appear random to the user**  
  *(The Dog API’s random endpoint is used to fetch a new dog breed each time.)*
- [x] **At least one image is displayed per API call**  
  *(Each API call displays an image of the dog breed.)*
- [x] **Clicking on a displayed value for one attribute adds it to a displayed ban list**  
- [x] **Attributes on the ban list prevent further images/API results with that attribute from being displayed**  

The following **optional** features are implemented:

- [x] Multiple types of attributes can be added to the ban list  
  *(Currently, only the breed name can be banned. Adding support for other attributes like origin or temperament is a future improvement.)*
- [x] Users can see a stored history of their previously viewed items from their session  
  *(A history feature was not implemented but is planned for future development.)*

The following **additional** features are implemented:

- [x] Added basic error handling to display a message if the API call fails (e.g., due to network issues).  
- [x] Styled the app with CSS to improve the user interface, including a clean layout for the dog breed details and ban list.

## Video Walkthrough

Here's a walkthrough of implemented user stories:

https://imgur.com/a/IGSdQy1



## Notes

- **Parsing the Dog API Data**: The Dog API returned data in a format that required careful parsing to extract the desired attributes (e.g., breed name, image URL). I used `console.log()` to inspect the JSON response and adjusted my code to handle nested objects.
- **Implementing the Ban List**: Filtering out banned attributes while ensuring random API calls was tricky. I initially struggled with re-fetching data when a banned attribute was encountered, but I solved this by implementing a loop to keep fetching until a non-banned result was found.
- **Styling the UI**: Aligning the image and attributes in a visually appealing way took some trial and error with CSS Flexbox, but I eventually achieved a clean layout.

## License

    Copyright 2025 Anvesh Gupta

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.

---
