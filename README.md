This project runs a simulation of two servers in tandem. 
Each server operates on a First in, First out (FIFO) basis. 

Customers arrive to Server 1 with interarrival times as Independent Identically Distributed (IID) exponential random variables with mean 1 minutes.

Server 1's service duration is an IID exponential random variable with a mean of 0.7 minutes. 
Server 2's service duration is an IID exponential random variable with a mean of 0.9 minutes.

The simulation runs until the last customer arrives before 1,000 minutes elapse.

To use, clone the git locally and run from the terminal.

## To View

npm will run from `localhost:3000`.

Visit the homepage `/` for the simulation table.
Visit the stats page `/stats` for the statistics table.

## To Run

In the project directory, run:

### `npm install`

Installs all the project dependencies and creates the node_modules package.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](#deployment) for more information.

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.