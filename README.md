# The Cat API + React

A small React application that uses [The Cat API](https://documenter.getpostman.com/view/5578104/RWgqUxxh) to explore image management and user interactions.

## Features

Covers all requirements from the spec.
Some additional features have been added as I felt appropriate, I have marked these with "_(Extra)_"

### Image Management
- Upload cat images
- Delete uploaded images _(Extra)_
- List images associated with the API account
- List images uploaded by the "current user" _(Extra)_

### Discovery & Browsing
- Lists random cat images via the search endpoint _(Extra)_

### User Interactions
- Favourite cat images
- Upvote and downvote images
- Remove votes on voted images for the “current user” _(Extra)_
- Display vote scores for each image

### User Simulation
- Simulated login by setting a user ID to enable account-specific features _(Extra)_
- List images favourited by the “current user” _(Extra)_

## How to run

### Prerequisites

1. Install dependencies:
```
npm install
```

2. Create a `.env` file in the project root:

```
VITE_CAT_API_KEY=yourCatApiKeyGoesHere
```

### Running the App

```
npm run dev
```

### Build Commands

```
npm run build      # production build
npm run preview    # preview the production build
npm run lint       # run ESLint
```

## Technologies Used

### React + TypeScript + Vite

Initialised using `npm create vite@latest`
Framework: `React`
Variant: `TypeScript + React Compiler`

- Typescript is industry standard for type-safety and improved developer experience with 0 runtime overhead. 
- React compiler has proven out-of-the-box performance improvements so I would be inclined to use it for new projects like this one (and adding to older projects if possible)

### React Router

- The de-facto routing solution for multi-page SPA React Apps

### React Query (TanStack Query)

- One of the most popular and well documented libraries in the React ecosystem to handle data fetching and state management.
- Handles all API Fetching related state itself like isLoading, isErrored, isFetching etc
- Built-in caching reduces unnecessary API calls, particularly for frequently accessed data (e.g. image votes and favourites).
- API Abstraction Layer: Separates my API Logic from my components which makes it easier to follow, tweak and extend. 
- Wanted to try localStorage-backed caching to simulate a persistent feed experience across browser tabs (5 mins). React Query supports this basically out of the box.

### shadcn/ui + Radix UI

- Enables rapid development while the UI still 'looks professionally made'.
- No need to spend excessive time on low-level UI components like buttons, in a time-constrained project. (Needed finished in a couple of days.)
- I am familiar with using Radix, understand its implementation patterns and know it is pretty good at handling A11Y common patterns. This made it a more pragmatic choice.

### Tailwind

- Chosen pragmatically over other alternatives which I am more familiar with (e.g. vanilla CSS or Stitches, which is no longer actively maintained) due to how it integrates naturally with shadcn/ui, reducing styling friction.
- Supports rapid prototyping, providing a quick base of a design system.
- Improved productivity through strong tooling and editor/AI support. AI has been heavily trained on tailwind and my copilot was most effective with suggesting tailwind equivalent classNames.


## Other Choices

### 'Current User' Simulation

Features like voting on images would not show whether an image has been upvoted or downvoted and would allow for infinite voting per image. To make the app a bit more like a real app I decided to add a very basic 'user' feature.
Instead of implementing full authentication, the app simulates a user by setting a simple string to be used as what the API expects to be `sub_id`.

This allowed for:

- Closer functionality to a real app
- User separated favourites/votes/uploaded images
- While avoiding the complexity of auth flows that were out of scope

### Explore Listing

- Provided an immediate array of pictures to fetch from even before I implemented the upload feature.
- Honestly, I wanted to be working with a screen full of cute cat pictures. :)
