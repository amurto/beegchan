import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import Main from './Main';
import Sidebar from './Sidebar';
import Footer from './Footer';

const useStyles = makeStyles(theme => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));

const mainFeaturedPost = {
  title: 'Kisaan Yojna',
  description:
    `The following categories of beneficiaries of higher economic status shall not be eligible for benefit under the scheme.
    (a) All Institutional Land holders.
    (b) Farmer families in which one or more of its members belong to following categories`,
  image: 'https://images.wallpaperscraft.com/image/dark_black_and_white_abstract_black_background_76353_1280x720.jpg',
  imgText: 'main image description',
  linkText: 'Continue reading…',
};

const featuredPosts = [
  {
    title: 'Security',
    date: 'Nov 12',
    description:
      'Immutability is perhaps the most important benefit a blockchain provides. Cryptographically linked blocks provide a record immune from tampering.',
    image: 'https://source.unsplash.com/random',
    imageText: 'Image Text',
  },
  {
    title: 'Decentralization',
    date: 'Nov 11',
    description:
      'The final reason to use a blockchain is if you require decentralization. Perhaps the nature of your document means that you cannot reliably trust a third-party storage provider to not tamper with or delete the document.',
    image: 'https://png.pngtree.com/thumb_back/fw800/back_our/20190622/ourmid/pngtree-25d-internet-technology-blockchain-hd-background-image_211344.jpg',
    imageText: 'Image Text',
  },
];

const sidebar = {
  title: 'About',
  description:
    'The entire responsibility of identification of beneficiary farmer families rests with the State / UT Governments.',
  archives: [
    { title: 'March 2020', url: '#' },
    { title: 'February 2020', url: '#' },
    { title: 'January 2020', url: '#' },
    { title: 'November 1999', url: '#' },
    { title: 'October 1999', url: '#' },
    { title: 'September 1999', url: '#' },
    { title: 'August 1999', url: '#' },
    { title: 'July 1999', url: '#' },
    { title: 'June 1999', url: '#' },
    { title: 'May 1999', url: '#' },
    { title: 'April 1999', url: '#' },
  ],
  social: [
    { name: 'GitHub', icon: GitHubIcon },
    { name: 'Twitter', icon: TwitterIcon },
    { name: 'Facebook', icon: FacebookIcon },
  ],
};

export default function Blog() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <div style={{ height: '30px' }}></div>
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={4}>
            {featuredPosts.map(post => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
          <Grid container spacing={5} className={classes.mainGrid}>
            <Main /> 
            <Sidebar
              key={sidebar.title}
              title={sidebar.title}
              description={sidebar.description}
              archives={sidebar.archives}
              social={sidebar.social}
            />
          </Grid>
        </main>
      </Container>
      <Footer title="Footer" description="Something here to give the footer a purpose!" />
    </React.Fragment>
  );
}
