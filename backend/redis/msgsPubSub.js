import dotenv from "dotenv"
dotenv.config()

import Redis from 'ioredis'

// Create a Redis instance for subscribing
const subscriber = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PWD,
  username: process.env.REDIS_USER,
  tls: {}
});


// Create a Redis instance for publishing
const publisher = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PWD,
  username: process.env.REDIS_USER,
  tls: {}
});

// When a message is published to a specific channel, 
// all subscribers that are listening to that channel 
// receive a copy of the message. 
// Channels provide a way to categorize messages and allow 
// subscribers to selectively listen for messages they are interested in.


export function subscribe(channel, callback) {
  subscriber.subscribe(channel, (err, count) => {
    if (err) {
      console.log('Error subscribing to channel:', err);
      return;
    } 
    console.log(`Subscribed to ${channel}`);
  });


  // When a message is received on any subscribed channel,
  // it checks if the channel matches the specified channel and
  // calls the provided callback function with the received message

  subscriber.on('message', (subscribedChannel, message) => {
    console.log('Subscriber ', subscribedChannel, ' has received msg ', message);
    if (subscribedChannel === channel) {
      callback(message);
    }
  });
}


// Function to unsubscribe from a Redis channel
export function unsubscribe(channel) {
  subscriber.unsubscribe(channel, (err, count) => {
    if (err) {
      console.error('Error unsubscribing from channel:', err);
      return;
    }
    console.log(`Unsubscribed from ${channel}`);
  });
}


// Function to publish a message to a Redis channel
export async function publish(channel, message) {
  try {
    await publisher.publish(channel, message);
    console.log(`Published message to ${channel}: ${message}`);
  } catch (error) {
    console.error('Error publishing message:', error);
  }
}
