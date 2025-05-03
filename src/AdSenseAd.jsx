import React, { Component } from 'react';

class AdSenseAd extends Component {
  componentDidMount() {
    // Push ad to AdSense when component mounts
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }

  render() {
    return (
      <div>
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-XXXXXXXXXXXXXXX"
          data-ad-slot="YYYYYYYYYY"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </div>
    );
  }
}

export default AdSenseAd;
