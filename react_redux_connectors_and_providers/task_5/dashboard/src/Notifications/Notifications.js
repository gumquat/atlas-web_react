import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite';
import NotificationItem from './NotificationItem';
import { NotificationItemShape } from './NotificationItemShape';
import PropTypes from 'prop-types';
import { fetchNotifications, markAsRead } from './notificationActionCreators';
import { getUnreadNotifications } from '../selectors/notificationSelector';

// Animation object
const fadeInAnimation = {
  '0%': { opacity: 0.5 },
  '100%': { opacity: 1 },
};

// Animation object
const bounceAnimation = {
  '0%': { transform: 'translateY(0)' },
  '25%': { transform: 'translateY(-5px)' },
  '50%': { transform: 'translateY(0)' },
  '75%': { transform: 'translateY(5px)' },
  '100%': { transform: 'translateY(0)' },
};

//////////////////////////
// Aphrodite Stylesheet //
//////////////////////////
    const styles = StyleSheet.create({
      notifications: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        border: '4px solid black',
        marginRight: '.5rem',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1000,
        backgroundColor: 'white',
      },

      notificationsParagraph: {
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
        fontWeight: '400',
        padding: '1.5rem 0 .3rem .8rem',
        margin: '0',
        fontSize: '20px',
      },

      menuItem: {
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
        fontWeight: '400',
        fontSize: '0.8rem',
        marginRight: '1rem',
        animationName: [fadeInAnimation, bounceAnimation],
        animationDuration: '1s, 0.5s',
        animationIterationCount: 'infinite',
        cursor: 'pointer', // Add cursor pointer to indicate clickable
      },

      notificationsUnorderedList: {
        padding: '0',
        listStyle: 'none',
      },
    })

class Notifications extends Component {
  componentDidMount() {
    this.props.fetchNotifications(); // Call fetchNotifications on component mount
  }

  markAsRead(id) {
    console.log(`Notification ${id} has been marked as read`);
    this.props.markNotificationAsRead(id);
  }

  shouldComponentUpdate(nextProps) {
    return (
      nextProps.listNotifications.length > this.props.listNotifications.length ||
      nextProps.displayDrawer !== this.props.displayDrawer
    );
  }
  
  render() {
    const { displayDrawer, listNotifications, handleDisplayDrawer, handleHideDrawer } = this.props;
    const buttonStyle = {
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      padding: '0'
    };

    return (
      <>
        <div className={css(styles.menuItem)} data-testid="menuItem" onClick={handleDisplayDrawer}>
          <p>Your Notifications</p>
        </div>
        {displayDrawer && (
          <div className={css(styles.notifications)} data-testid="notifications">
            <div className="Notifications-content">
              {listNotifications.length > 0 && (
                <p className={css(styles.notificationsParagraph)}>
                  Here is the list of notifications
                </p>
              )}
              <ul className={css(styles.notificationsUnorderedList)}>
                {listNotifications.length === 0 ? (
                  <NotificationItem value='No new notification for now' />
                ) : (
                  listNotifications.valueSeq().map(notification => (
                    <NotificationItem
                      key={notification.get('id')}
                      id={notification.get('id')}
                      type={notification.get('type')}
                      value={notification.get('value')}
                      html={notification.get('html')}
                      markAsRead={() => this.markAsRead(notification.get('id'))}
                    />
                  ))
                )}
              </ul>
            </div>
            <button
              aria-label="Close"
              style={buttonStyle}
              onClick={handleHideDrawer} // call hide drawer when clicked
            >
              x
            </button>
          </div>
        )}
      </>
    );
  }
}

Notifications.propTypes = {
  displayDrawer: PropTypes.bool,
  listNotifications: PropTypes.arrayOf(NotificationItemShape),
  handleDisplayDrawer: PropTypes.func,
  handleHideDrawer: PropTypes.func,
  fetchNotifications: PropTypes.func.isRequired, // Add propType for fetchNotifications
};

Notifications.defaultProps = {
  displayDrawer: false,
  listNotifications: [],
  handleDisplayDrawer: () => {},
  handleHideDrawer: () => {},
  markNotificationAsRead: () => {},
};

const mapStateToProps = (state) => ({
  listNotifications: getUnreadNotifications(state),
});

const mapDispatchToProps = {
  fetchNotifications,
  markNotificationAsRead: markAsRead,
};


export default connect(mapStateToProps, mapDispatchToProps)(Notifications);