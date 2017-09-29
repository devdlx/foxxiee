/* eslint-disable */
// red #d60000
// gold #FBC02D

import React, {PureComponent} from 'react';
import {Link} from 'react-router-dom'

import MediaQuery from 'react-responsive';

import {observer} from "mobx-react";

import './feed.css'

const CardCover = (props, context) => (
  <div className="mdc-card mdc-card--theme-dark" sytle={{
    backgroundImage: "url(" + props.track.artwork_url || props.track.user.avatar_url + ")"
  }}>
    <section className="mdc-card__primary">
      <h1 className="mdc-card__title mdc-card__title--large">{props.track.title}</h1>
      <h2 className="mdc-card__subtitle">{props.track.user.username}</h2>
    </section>
    <section className="mdc-card__actions">
      <button className="mdc-button mdc-button--compact mdc-button--theme-dark mdc-card__action">Action 1</button>
      <button className="mdc-button mdc-button--compact mdc-button--theme-dark mdc-card__action">Action 2</button>
    </section>
  </div>
);

const CardFull = (props, type) => (
  <div className={`mdc-card demo-card demo-card--with-avatar mdc-card--theme-dark ${props.type}`}>
    <section className="mdc-card__primary">
      <div className="mdc-card__avatar__icon"><i className="material-icons">{props.avatarIcon}</i></div>
      <div>
      <h1 className="mdc-card__title">{props.title}</h1>
      <h2 className="mdc-card__subtitle">{props.type}</h2>
      </div>

    </section>
    {props.wide && <section className="mdc-card__media demo-card__16-9-media"></section>
}

    <img src={props.cover} className="card-image"/> {props.description && <section className="mdc-card__supporting-text">
      {props.description}
    </section>}
    {props.actions && <section className="mdc-card__actions">
      <button className="mdc-button mdc-button--compact mdc-card__action">Action 1</button>
      <button className="mdc-button mdc-button--compact mdc-card__action">Action 2</button>
    </section>
}
  </div>
);

const PostCard = observer(class PostCard extends PureComponent {

  render() {
    const {posts} = this.props.store
    const {waiting} = posts
    // const page = pages.page('cover')
    // console.log(this.props.postKey);
    return (
      <div>
        {!waiting && this.renderPostCard()}
      </div>
    )
  }

  renderPostCard() {
    // console.log(this.props.store.posts.post(this.props.postKey));

    const item = this.props.store.posts.post(this.props.postKey)
    // console.log(item);
    // const page = this.props.store.pages.post(this.props.key)
    // const postsKeys = page.posts
    return (<CardFull type="soundcloud" cover={item.cover} title={item.title} avatarIcon="whatshot" />)
  }
})

const Feed = observer(class Feed extends PureComponent {
  state = {
    events: [],
    soundcloud: [],
    youtube: []
  }

  componentWillMount() {
    // eventbrite.fetchEvents(5).then((events) => {
    //   // console.log('fetchEvents() ',events);
    //   this.setState({events})
    // });

    //     Soundcloud.fetchTracksByUser(4).then((soundcloud) => {
    //       console.log('fetchSoundcloud() ', soundcloud);
    //       this.setState({soundcloud})
    //     });

    // youtube.fetchYoutube(6).then((youtube) => {
    //   console.log('fetchYoutube() ', youtube);
    //   this.setState({youtube})
    // });

      console.log(this);


    console.log(this.props);

  }

  renderHeading() {

    return (
      <div>
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
      </div>
    );
  }

  render() {
    const {pages} = this.props.store
    const pagesWaiting = pages.waiting
    // const page = pages.page('cover')
    // const {post} = this.props.store.posts(this.props)

    return (
      <div>
        {!pagesWaiting && this.renderFeed()}
      </div>
    )
  }

  renderFeed() {
    // Get Page info
    const page = this.props.store.pages.page(this.props.match.params.page || 'cover')
    const postsKeys = page.posts
    console.log(postsKeys);
    // Get Post for the page

    // const {post} = this.props.store.posts.post(this.props)


    return (
      <div className="page page-feed page-toolbar">

        {this.renderHeading()}
        <div className="feed">
        {postsKeys.map((postKey, i) => (<PostCard key={postKey} {...this.props} postKey={postKey} />))}
        </div>

      </div>
    )
  }
})
// {pagesWaiting && <div>Loading</div>}

// const FeedPage = observer(Feed)
// export default FeedPage
export default Feed
// {this.state.youtube.map((video, i) => (<CardFull key={video.videoId} type="youtube" cover={video.thumbnails.high.url} title={video.title}/>))}
// {postsKeys.map((postKey, i) => (<PostCard key={postKey} {...this.props}/>))}
