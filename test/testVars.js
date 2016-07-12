var URL = 'https://api.bugsnag.com';
var PROJECT_ID = process.env.BUGSNAG_PROJECT_ID;
var auth = {
  'Authorization': 'token ' + process.env.BUGSNAG_API_KEY
};

module.exports = {
  errorsOptions: {
    uri: URL + '/projects/' + PROJECT_ID + '/errors',
    headers: auth,
    json: true,
    qs: {}
  },

  eventsOptions: {
    uri: URL + '/projects/' + PROJECT_ID + '/events',
    headers: auth,
    json: true,
    qs: {}
  },

  errorsOutput: [
    {
      'id': '518031bcd775355c48a1cd4e',
      'class': 'NoMethodError',
      'last_message': 'undefined method "name" for nil:NilClass',
      'last_context': 'mailer#admin',
      'resolved': false,
      'occurrences': 12,
      'users_affected': 13,
      'contexts': {
        'mailer#admin': 12
      },
      'release_stages': {
        'production': 12
      },
      'app_versions': {
        '1.0.0': 20
      },
      'first_received': '2013-04-30T21:03:56Z',
      'last_received': '2013-07-29T10:42:05Z',
      'comments_url': 'https://api.bugsnag.com/errors/518031bcd775355c48a1cd4e/comments',
      'events_url': 'https://api.bugsnag.com/errors/518031bcd775355c48a1cd4e/events',
      'html_url': 'https://bugsnag.com/errors/518031bcd775355c48a1cd4e',
      'url': 'https://api.bugsnag.com/errors/518031bcd775355c48a1cd4e',
      'most_recent_event': {}
    }
  ],

  eventsOutput: [
    {
      'id': '51f5d152f002c6686d013a22',
      'exceptions': [
        {
          'class': 'ActionView::Template::Error',
          'message': 'source sequence is illegal/malformed utf-8',
          'stacktrace': [
            {
              'line': 285,
              'column': 20,
              'file': 'app/models/user.rb',
              'method': 'generate'
            }
          ]
        }
      ],
      'user_id': 'user@yoursite.com',
      'received_at': '2012-12-02T05:54:25Z',
      'severity': 'error',
      'context': 'events#show',
      'app_version': '1.0.1',
      'os_version': 'Windows Vista',
      'meta_data': {},
      'url': 'https://api.bugsnag.com/events/51f5d152f002c6686d013a22',
      'html_url': 'https://bugsnag.com/errors/51f5cbadcf4cfd7373c8cc2d/events/51f5d152f002c6686d013a22'
    }
  ]
};
