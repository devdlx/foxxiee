import React from 'react';
import PropTypes from 'prop-types';
// import {Row, Col, Card, Table} from 'antd';

import {Link} from 'react-router-dom';
import MediaQuery from 'react-responsive';

// Data API
import * as soundcloud from '../components/soundcloud/soundcloud';
// import * as eventbrite from '../components/eventbrite/eventbrite';
// import * as youtube from '../components/youtube/youtube';

// Components
// import {MediaCard} from '../components/card/card.jsx'

import './home.css'

// const dataSource = [
//   {
//     key: '1',
//     date: 'Jul 20',
//     title: 'Rooftop Party',
//     location: 'New York, NY'
//   }, {
//     key: '2',
//     date: 'Jul 26',
//     title: 'Park Street Presents',
//     location: 'Columbus, OH'
//   }
// ];
// const renderSoundCloud = (track) => {
//   // console.log(track);
//   return (
//     <Card title="Music" className="card" extra={< a href = "#" > More < /a>}>
//
//       <div className='soundcloud-cover' src={`${track.artwork_url}|| ${track.user.avatar_url}`}></div>
//     </Card>
//
//   )
// }

const eventsColumns = [
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date'
  }, {
    title: 'Title',
    dataIndex: 'title',
    key: 'title'
  },
  //  {
  //   title: 'Location',
  //   dataIndex: 'location',
  //   key: 'location'
  // }

  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span className='events-info-button'>
        <Link to={`/page/events/${text.key}`}>
          Info
        </Link>
      </span>
    )
  }

];

export default class Home extends React.Component {

  static propTypes = {};

  constructor(props) {
    super(props);

    this.state = {
      events: [
        {
          title: '',
          date: '',
          key: 1
        }
      ],
      soundcloud: [],
      youtube: []
    };
  }

  componentWillMount() {
    eventbrite.fetchEvents(5).then((events) => {
      // console.log('fetchEvents() ',events);
      this.setState({events})
    });

    soundcloud.fetchSoundcloud(4).then((soundcloud) => {
      // console.log('fetchSoundcloud() ', soundcloud);
      this.setState({soundcloud})
    });

    youtube.fetchYoutube(4).then((youtube) => {
      // console.log('fetchYoutube() ', youtube);
      this.setState({youtube})
    });

  }

  render() {
    // console.log('state.events ', this.state.events);

    return (
      <div className='page home-page'>
        <MediaQuery query='(max-width: 440px)'>
          <div className="headerMobile">
            <img src="https://i3.sndcdn.com/avatars-000300901237-63o5oa-t500x500.jpg" width="100%" alt="Ahkiki La Foxxiee’s avatar"/>
          </div>
        </MediaQuery>
        <MediaQuery query='(min-width: 441px)'>
          <div className="headerDesktop">
            <img src="https://i1.sndcdn.com/visuals-000294198895-EGDUvy-t2480x520.jpg" width="100%" alt="Ahkiki La Foxxiee’s avatar"/>
          </div>
        </MediaQuery>

        <Row className='sectionFirst' type="flex" justify="center">
          <Col sm={11} className='cardColum' xs={24}>
            <div className=''>
              <Row type="flex" justify="space-between" className='section-header'>
                <h2>Music</h2>
                <Link to="/page/music">
                  More
                </Link>
              </Row>

              {this.state.soundcloud.map((track, i) => <MediaCard key={track.id} itemId={track.id} title={track.title} linkTo={`/page/music/${track.id}`} pic={`${track.user.avatar_url}`}/>)}
            </div>
          </Col>
          <Col sm={11} className='cardColum' xs={24}>
            <div className=''>
              <Row type="flex" justify="space-between" className='section-header'>
                <h2>Videos</h2>
                <Link to="/page/media">
                  More
                </Link>
              </Row>

              {this.state.youtube.map((track, i) => <MediaCard key={track.videoId} itemId={track.videoId} title={track.title} linkTo={`/page/media/${track.videoId}`} pic={track.thumbnail}/>)}
            </div>
          </Col>
        </Row>

        <Row type="flex" justify="center">

          <Col sm={11} className='cardColum' xs={24}>
            <Card title="Events" extra={< Link to = "/page/events" > More < /Link>} className='cardFullBody' bordered={false}>
              <Table showHeader={false} pagination={false} dataSource={this.state.events} columns={eventsColumns}/>
            </Card>
          </Col>
        </Row>

      </div>
    );
  }

}

// height: 76px;
// background-image: url(https://i1.sndcdn.com/visuals-000294198895-EGDUvy-t2480x520.jpg);
// /* background-size: contain; */
// background-repeat: no-repeat;
// background-position: top left;
// background-size: auto 100%;
// margin: -16px -24px;
