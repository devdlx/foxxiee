{
  soundcloud.tracks.map((gridItem, i) => (
    <li to={gridItem.linkTo} className="mdc-grid-tile" key={gridItem.key}>
      <div className="mdc-grid-tile__innerWrapper">
        <div className="mdc-grid-tile__primary">
          <img className="mdc-grid-tile__primary-content" src={gridItem.cover}/>
          <button className="mdc-fab material-icons media-button" aria-label="Favorite">
            <span className="mdc-fab__icon">
              play_arrow
            </span>
          </button>
        </div>
        <span className="mdc-grid-tile__secondary">
          <span className="mdc-grid-tile__title">{gridItem.title}</span>
          <span className="mdc-grid-tile__support-text">{gridItem.subtitle}</span>
        </span>
      </div>
    </li>
  ))
}


{!soundcloud.tracks.length && <h1>No Items</h1>}
