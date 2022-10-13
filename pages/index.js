import Head from 'next/head';
import { MongoClient } from "mongodb";
import { Fragment } from "react";

import MeetupList from "../components/meetups/MeetupList";
// our-domain.com

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React Meetup</title>
        <meta name='description' content='Browse a highly active React Meetups '/>
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   //fetch data from API
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export async function getStaticProps() {
  //fetch  data from API

  const client = await MongoClient.connect(
    "mongodb+srv://mahroos:Onetwo12@cluster0.3gp3ow6.mongodb.net/?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();
  client.close();
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
