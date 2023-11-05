# DevConnect - A Platform for Developers

## Problem Statement

In a world with nearly 27 million developers, there is a surprising lack of platforms that offer a comprehensive solution to discover developers, learn from their projects and experiences, and collaborate effectively. DevConnect is here to bridge this gap.

## Current Solutions in the Market

While platforms like Commudle provide a way to search for developers based on their tech stack, they fall short in terms of helping you identify potential collaborators when you're unsure about who to work with. Commudle lacks a recommendation system that can intelligently suggest developers based on both your and their profiles.

## Our Solution

DevConnect is a straightforward yet powerful solution designed to address this very issue. Our platform allows you to create a detailed profile, including information about your tech stack, location, skills, personality traits, goals, and availability. Using this information, DevConnect offers personalized recommendations for developers you can collaborate with, just a click away.

## Approach

Our approach to building DevConnect was comprehensive and well-thought-out:

1. **UI Design:** We began by creating user-friendly interface designs using Figma templates.

2. **Front End Development:** We implemented the UI using a combination of HTML, CSS, and JavaScript to ensure a smooth user experience.

3. **Back End Development:** We used Express and Node.js to develop the web routes.

4. **Database:** We established a functional NoSQL MongoDB database to store posts and user data, making it accessible for use in the recommendation system.

5. **Recommendation System:** Our recommendation system primarily relies on the TfidfVectorizer and Cosine Similarity libraries in Python, supplemented by data analysis tools like sklearn and pandas.

6. **GitHub Profile Analysis:** To analyze GitHub profiles, we leveraged the official GitHub API to extract data and applied a Language Model (LLM) to generate insights using Prompt Engineering.

## Current Features

DevConnect boasts the following tried and tested features:

- **User-Friendly Interface:** We've ensured that the platform offers an intuitive and engaging user experience.

- **JWT Authentication:** Security is a priority, and we've implemented JWT authentication to safeguard user data.

- **Project Posting:** You can share your projects with the world through the platform.

- **Profile Analysis:** Our system analyzes user profiles based on responses to specific questions and recommends profiles that are similar or complementary.

- **GitHub Profile Analyzer:** This feature summarizes a user's GitHub activities, including consistency, contributions, and most active repositories, offering valuable insights.

- **End-to-End Routing:** We provide endpoints to view posts and user details, all stored in a NoSQL MongoDB database.

## Future Works

We have ambitious plans for the future of DevConnect:

- **GitHub Integration:** We aim to enable users to import projects directly from GitHub by logging in with their GitHub accounts.

- **Platform Optimization:** We're working towards making the platform more robust and suitable for a full-scale launch.

- **Community Recommendation System:** Similar to our Profile Recommendation System, we intend to implement a Community Recommendation System to connect users with like-minded communities.

- **Enhanced GitHub Profile Analysis:** We plan to refine the GitHub Profile Analyzer to provide more in-depth and quantitative insights.

Thank you for considering DevConnect as your platform for connecting with fellow developers and enhancing your collaboration experience.
