'use strict';

const Event = use('Event');

Event.on('user::new', 'NewUserListener.registered');
Event.on('user::forgot-password', 'ForgotPasswordListener.notified');
