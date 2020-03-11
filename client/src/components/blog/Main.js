import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

export default function Main() {
  return (
    <Grid item xs={12} md={8}>
      <Typography variant="h6" gutterBottom>
        Document Sharing
      </Typography>
      <Divider />
      <div style={{ paddingTop: '10px', fontSize: '18px' }}>
      Throughout 2017, there was a huge amount of hype around the applications of blockchain technology and cryptocurrencies.

These expectations were often focused on projects with grand promises and little proof of concept. As a result, the reality did not match the hype, and many of them have yet to attract users to their products.
In contrast, document storage is a much drier and less exciting application. However, it is deliverable, with multiple improvements over existing document storage systems.

The final reason to use a blockchain is if you require decentralization. Perhaps the nature of your document means that you cannot reliably trust a third-party storage provider to not tamper with or delete the document.

One such instance would be politically sensitive files, which malicious parties could target, if published. By uploading the document or its hash to a public blockchain you would have peace of mind that it is safe from state or corporate censorship. Of course, choosing the correct blockchain is very important here. Blockchains are not all made alike.

Using a public blockchain is a great way to make your document accessible to the public. Of course, you need to be absolutely confident that you want to make it fully visible. Once you store the document or its hash on the blockchain, it will be there permanently. There is no way to change data once you include it in a block.
A blockchain is certainly not the only way to do this. However, given its level of security and tamper-resistance, you can be confident of permanent visibility.
      </div>
    </Grid>
  );
}

Main.propTypes = {
  posts: PropTypes.array,
  title: PropTypes.string,
};
